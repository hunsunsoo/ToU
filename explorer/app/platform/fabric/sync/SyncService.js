"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonObjSize = exports.convertValidationCode = exports.SyncServices = void 0;
const fabric_protos_1 = __importDefault(require("fabric-protos"));
const includes_1 = __importDefault(require("lodash/includes"));
const sha = __importStar(require("js-sha256"));
const helper_1 = require("../../../common/helper");
const ExplorerError_1 = require("../../../common/ExplorerError");
const ExplorerMessage_1 = require("../../../common/ExplorerMessage");
const FabricConst = __importStar(require("../../../platform/fabric/utils/FabricConst"));
const FabricUtils = __importStar(require("../../../platform/fabric/utils/FabricUtils"));
const logger = helper_1.helper.getLogger('SyncServices');
const fabric_const = FabricConst.fabric.const;
// Transaction validation code
const _validation_codes = {};
for (const key in fabric_protos_1.default.protos.TxValidationCode) {
    const new_key = fabric_protos_1.default.protos.TxValidationCode[key];
    _validation_codes[new_key] = key;
}
/**
 *
 *
 * @class SyncServices
 */
class SyncServices {
    /**
     * Creates an instance of SyncServices.
     * @param {*} platform
     * @param {*} persistence
     * @memberof SyncServices
     */
    constructor(platform, persistence) {
        this.platform = platform;
        this.persistence = persistence;
        this.synchInProcess = [];
        this.blocksInProcess = [];
    }
    /**
     *
     *
     * @memberof SyncServices
     */
    /*eslint-disable */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /* eslint-enable */
    /**
     *
     *
     * @param {*} client
     * @returns
     * @memberof SyncServices
     */
    synchNetworkConfigToDB(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const channels = client.getChannels();
            const channels_query = yield client.fabricGateway.queryChannels();
            if (!channels_query) {
                logger.error('Not found any channels');
                return false;
            }
            for (const channel of channels_query.channels) {
                const channel_name = channel.channel_id;
                if (!(0, includes_1.default)(channels, channel_name)) {
                    yield client.initializeNewChannel(channel_name);
                }
            }
            for (const channel_name of channels) {
                logger.info('SyncServices.synchNetworkConfigToDB client ', client.getNetworkId(), ' channel_name ', channel_name);
                const block = yield client.getGenesisBlock(channel_name);
                const channel_genesis_hash = yield FabricUtils.generateBlockHash(block.header);
                client.setChannelGenHash(channel_name, channel_genesis_hash);
                const res = yield this.insertNewChannel(client, channel_name, block, channel_genesis_hash);
                if (res) {
                    yield this.insertFromDiscoveryResults(client, channel_name, channel_genesis_hash);
                }
                else {
                    return false;
                }
                // Need that chaincode table is synced up to existing chaincode at this moment
                yield this.insertNewChannelChaincode(client, channel_genesis_hash, null);
            }
            return true;
        });
    }
    // Insert new channel to DB
    /**
     *
     *
     * @param {*} client
     * @param {*} channel
     * @param {*} block
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof SyncServices
     */
    insertNewChannel(client, channel_name, block, channel_genesis_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const network_id = client.getNetworkId();
            const channelInfo = yield this.persistence
                .getCrudService()
                .getChannel(network_id, channel_name, channel_genesis_hash);
            if (!channelInfo) {
                const count = yield this.persistence
                    .getCrudService()
                    .existChannel(network_id, channel_name);
                if (count.count === '0') {
                    if (block.data && block.data.data.length > 0 && block.data.data[0]) {
                        const createdt = yield FabricUtils.getBlockTimeStamp(block.data.data[0].payload.header.channel_header.timestamp);
                        const channel_row = {
                            name: channel_name,
                            createdt,
                            blocks: 0,
                            trans: 0,
                            channel_hash: '',
                            channel_version: block.data.data[0].payload.header.channel_header.version,
                            channel_genesis_hash
                        };
                        yield this.persistence
                            .getCrudService()
                            .saveChannel(network_id, channel_row);
                    }
                }
                else {
                    const notify = {
                        notify_type: fabric_const.NOTITY_TYPE_EXISTCHANNEL,
                        network_id: network_id,
                        channel_name
                    };
                    this.platform.send(notify);
                    throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_2013, channel_name);
                    //	Return false;
                }
            }
            return true;
        });
    }
    /**
     *
     *
     * @param {*} client
     * @param {*} channel
     * @param {*} channel_genesis_hash
     * @memberof SyncServices
     */
    insertFromDiscoveryResults(client, channel_name, channel_genesis_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const discoveryResults = yield client.initializeChannelFromDiscover(channel_name);
            // Insert peer
            if (discoveryResults && discoveryResults.peers_by_org) {
                for (const org_name in discoveryResults.peers_by_org) {
                    const org = discoveryResults.peers_by_org[org_name];
                    for (const peer of org.peers) {
                        yield this.insertNewPeer(peer, channel_genesis_hash, client);
                    }
                }
            }
            // Insert orderer
            if (discoveryResults && discoveryResults.orderers) {
                for (const org_name in discoveryResults.orderers) {
                    const org = discoveryResults.orderers[org_name];
                    for (const orderer of org.endpoints) {
                        orderer.org_name = org_name;
                        yield this.insertNewOrderers(orderer, channel_genesis_hash, client);
                    }
                }
            }
            // Insert chaincode
            if (discoveryResults) {
                yield this.insertNewChannelChaincode(client, channel_genesis_hash, discoveryResults);
            }
        });
    }
    /**
     *
     *
     * @param {*} peer
     * @param {*} channel_genesis_hash
     * @param {*} client
     * @memberof SyncServices
     */
    insertNewPeer(peer, channel_genesis_hash, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const network_id = client.getNetworkId();
            const peer_row = {
                mspid: peer.mspid,
                requests: peer.endpoint,
                server_hostname: peer.endpoint,
                channel_genesis_hash,
                peer_type: 'PEER'
            };
            yield this.persistence.getCrudService().savePeer(network_id, peer_row);
            const channel_peer_row = {
                peerid: peer.endpoint,
                channelid: channel_genesis_hash
            };
            yield this.persistence
                .getCrudService()
                .savePeerChannelRef(network_id, channel_peer_row);
        });
    }
    /**
     *
     *
     * @param {*} orderer
     * @param {*} channel_genesis_hash
     * @param {*} client
     * @memberof SyncServices
     */
    insertNewOrderers(orderer, channel_genesis_hash, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const network_id = client.getNetworkId();
            const discoveryProtocol = client.fabricGateway.getDiscoveryProtocol();
            const requesturl = `${orderer.host}:${orderer.port}`;
            logger.debug('insertNewOrderers discoveryProtocol ', discoveryProtocol, ' requesturl ', requesturl);
            const orderer_row = {
                mspid: orderer.org_name,
                requests: requesturl,
                server_hostname: requesturl,
                channel_genesis_hash,
                peer_type: 'ORDERER'
            };
            yield this.persistence.getCrudService().savePeer(network_id, orderer_row);
            const channel_orderer_row = {
                peerid: orderer.host,
                channelid: channel_genesis_hash
            };
            yield this.persistence
                .getCrudService()
                .savePeerChannelRef(network_id, channel_orderer_row);
        });
    }
    /**
     *
     *
     * @param {*} client
     * @param {*} channel
     * @param {*} channel_genesis_hash
     * @param {*} discoveryResults
     * @memberof SyncServices
     */
    insertNewChannelChaincode(client, channel_genesis_hash, discoveryResults) {
        return __awaiter(this, void 0, void 0, function* () {
            const network_id = client.getNetworkId();
            const channel_name = client.getChannelNameByHash(channel_genesis_hash);
            const chaincodes = yield client.fabricGateway.queryInstantiatedChaincodes(channel_name);
            for (const chaincode of chaincodes.chaincodes) {
                let path = '-';
                if (chaincode.path !== undefined) {
                    path = chaincode.path;
                }
                const chaincode_row = {
                    name: chaincode.name,
                    version: chaincode.version,
                    path: path,
                    txcount: 0,
                    createdt: new Date(),
                    channel_genesis_hash
                };
                yield this.persistence
                    .getCrudService()
                    .saveChaincode(network_id, chaincode_row);
                if (discoveryResults === null || discoveryResults === void 0 ? void 0 : discoveryResults.peers_by_org) {
                    for (const org_name in discoveryResults.peers_by_org) {
                        const org = discoveryResults.peers_by_org[org_name];
                        for (const peer of org.peers) {
                            for (const c_code of peer.chaincodes) {
                                if (c_code.name === chaincode.name &&
                                    c_code.version === chaincode.version) {
                                    yield this.insertNewChaincodePeerRef(client, c_code, peer.endpoint, channel_genesis_hash);
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    /**
     *
     *
     * @param {*} chaincode
     * @param {*} endpoint
     * @param {*} channel_genesis_hash
     * @memberof SyncServices
     */
    insertNewChaincodePeerRef(client, chaincode, endpoint, channel_genesis_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const network_id = client.getNetworkId();
            const chaincode_peer_row = {
                chaincodeid: chaincode.name,
                cc_version: chaincode.version,
                peerid: endpoint,
                channelid: channel_genesis_hash
            };
            yield this.persistence
                .getCrudService()
                .saveChaincodPeerRef(network_id, chaincode_peer_row);
        });
    }
    syncBlocks(client, channel_name, noDiscovery) {
        return __awaiter(this, void 0, void 0, function* () {
            const network_id = client.getNetworkId();
            // Get channel information from ledger
            const channelInfo = yield client.fabricGateway.queryChainInfo(channel_name);
            if (!channelInfo) {
                logger.info(`syncBlocks: Failed to retrieve channelInfo >> ${channel_name}`);
                return;
            }
            const synch_key = `${network_id}_${channel_name}`;
            logger.info(`syncBlocks: Start >> ${synch_key}`);
            if (this.synchInProcess.includes(synch_key)) {
                logger.info(`syncBlocks: Block sync in process for >> ${synch_key}`);
                return;
            }
            this.synchInProcess.push(synch_key);
            const channel_genesis_hash = client.getChannelGenHash(channel_name);
            const blockHeight = parseInt(channelInfo.height.low) - 1;
            // Query missing blocks from DB
            const results = yield this.persistence
                .getMetricService()
                .findMissingBlockNumber(network_id, channel_genesis_hash, blockHeight);
            if (results) {
                for (const result of results) {
                    // Get block by number
                    try {
                        const block = yield client.fabricGateway.queryBlock(channel_name, result.missing_id);
                        if (block) {
                            yield this.processBlockEvent(client, block, noDiscovery);
                        }
                    }
                    catch (_a) {
                        logger.error(`Failed to process Block # ${result.missing_id}`);
                    }
                }
            }
            else {
                logger.debug('Missing blocks not found for %s', channel_name);
            }
            const index = this.synchInProcess.indexOf(synch_key);
            this.synchInProcess.splice(index, 1);
            logger.info(`syncBlocks: Finish >> ${synch_key}`);
        });
    }
    updateDiscoveredChannel(client, channel_name, channel_genesis_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const network_id = client.getNetworkId();
            // get discovery and insert new peer, orders details to db
            yield this.insertFromDiscoveryResults(client, channel_name, channel_genesis_hash);
            const notify = {
                notify_type: fabric_const.NOTITY_TYPE_UPDATECHANNEL,
                network_id,
                channel_name
            };
            this.platform.send(notify);
        });
    }
    insertDiscoveredChannel(client, channel_name, block) {
        return __awaiter(this, void 0, void 0, function* () {
            const network_id = client.getNetworkId();
            yield client.initializeNewChannel(channel_name);
            const channel_genesis_hash = client.getChannelGenHash(channel_name);
            // inserting new channel details to DB
            yield this.insertNewChannel(client, channel_name, block, channel_genesis_hash);
            yield this.insertFromDiscoveryResults(client, channel_name, channel_genesis_hash);
            const notify = {
                notify_type: fabric_const.NOTITY_TYPE_NEWCHANNEL,
                network_id,
                channel_name
            };
            this.platform.send(notify);
        });
    }
    /**
     *
     *
     * @param {*} client
     * @param {*} block
     * @returns
     * @memberof SyncServices
     */
    processBlockEvent(client, block, noDiscovery) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const network_id = client.getNetworkId();
            // Get the first transaction
            const first_tx = block.data.data[0];
            // The 'header' object contains metadata of the transaction
            const header = first_tx.payload.header;
            const channel_name = header.channel_header.channel_id;
            const blockPro_key = `${channel_name}_${block.header.number.toString()}`;
            logger.debug('New Block  >>>>>>> %j', block.header.number);
            const channel_genesis_hash = client.getChannelGenHash(channel_name);
            // Checking block is channel CONFIG block
            /* eslint-disable */
            if (!channel_genesis_hash) {
                // get discovery and insert channel details to db and create new channel object in client context
                setTimeout((cli, chName, blk) => __awaiter(this, void 0, void 0, function* () {
                    yield this.insertDiscoveredChannel(cli, chName, blk);
                }), 10000, client, channel_name, block);
                logger.warn('Insert discovered new channel', channel_name);
                throw new ExplorerError_1.ExplorerError(`${channel_name} has not been inserted yet`);
            }
            if (this.blocksInProcess.includes(blockPro_key)) {
                throw new ExplorerError_1.ExplorerError('Block already in processing');
            }
            this.blocksInProcess.push(blockPro_key);
            if (!noDiscovery &&
                header.channel_header.typeString === fabric_const.BLOCK_TYPE_CONFIG) {
                setTimeout((cli, chName, chGenHash) => __awaiter(this, void 0, void 0, function* () {
                    yield this.updateDiscoveredChannel(cli, chName, chGenHash);
                }), 10000, client, channel_name, channel_genesis_hash);
            }
            const createdt = yield FabricUtils.getBlockTimeStamp(header.channel_header.timestamp);
            const blockhash = yield FabricUtils.generateBlockHash(block.header);
            const block_row = {
                blocknum: block.header.number.toString(),
                datahash: block.header.data_hash.toString('hex'),
                prehash: block.header.previous_hash.toString('hex'),
                txcount: block.data.data.length,
                createdt,
                prev_blockhash: '',
                blockhash,
                channel_genesis_hash,
                blksize: jsonObjSize(block)
            };
            const txLen = block.data.data.length;
            for (let txIndex = 0; txIndex < txLen; txIndex++) {
                const txObj = block.data.data[txIndex];
                const txStr = JSON.stringify(txObj);
                const size = Buffer.byteLength(txStr);
                let txid = txObj.payload.header.channel_header.tx_id;
                let validation_code = '';
                let endorser_signature = '';
                let payload_proposal_hash = '';
                let endorser_id_bytes = '';
                let chaincode_proposal_input = '';
                let chaincode = '';
                let rwset;
                let readSet;
                let writeSet;
                let chaincodeID;
                let status;
                let mspId = [];
                let chaincodeversion;
                this.convertFormatOfValue('value', client.fabricGateway.fabricConfig.getRWSetEncoding(), txObj);
                if (txid && txid !== '') {
                    const validation_codes = block.metadata.metadata[fabric_protos_1.default.common.BlockMetadataIndex.TRANSACTIONS_FILTER];
                    const val_code = validation_codes[txIndex];
                    validation_code = convertValidationCode(val_code);
                }
                let envelope_signature = txObj.signature;
                if (envelope_signature !== undefined) {
                    envelope_signature = Buffer.from(JSON.stringify(envelope_signature)).toString('hex');
                }
                let payload_extension = txObj.payload.header.channel_header.extension;
                if (payload_extension !== undefined) {
                    payload_extension = Buffer.from(JSON.stringify(payload_extension)).toString('hex');
                }
                let creator_nonce = txObj.payload.header.signature_header.nonce;
                if (creator_nonce !== undefined) {
                    creator_nonce = Buffer.from(JSON.stringify(creator_nonce)).toString('hex');
                }
                /* eslint-disable */
                const creator_id_bytes = txObj.payload.header.signature_header.creator.id_bytes;
                if (txObj.payload.data.actions !== undefined) {
                    chaincode =
                        txObj.payload.data.actions[0].payload.action.proposal_response_payload
                            .extension.chaincode_id.name;
                    chaincodeID = new Uint8Array(txObj.payload.data.actions[0].payload.action.proposal_response_payload.extension);
                    chaincodeversion =
                        txObj.payload.data.actions[0].payload.action.proposal_response_payload
                            .extension.chaincode_id.version;
                    status =
                        txObj.payload.data.actions[0].payload.action.proposal_response_payload
                            .extension.response.status;
                    mspId = txObj.payload.data.actions[0].payload.action.endorsements.map(endorsement => endorsement.endorser.mspid);
                    rwset =
                        txObj.payload.data.actions[0].payload.action.proposal_response_payload
                            .extension.results.ns_rwset;
                    readSet = rwset.map(rw => ({
                        chaincode: rw.namespace,
                        set: rw.rwset.reads
                    }));
                    writeSet = rwset.map(rw => ({
                        chaincode: rw.namespace,
                        set: rw.rwset.writes
                    }));
                    chaincode_proposal_input =
                        txObj.payload.data.actions[0].payload.chaincode_proposal_payload.input
                            .chaincode_spec.input.args;
                    if (chaincode_proposal_input !== undefined) {
                        let inputs = '';
                        for (const input of chaincode_proposal_input) {
                            inputs =
                                (inputs === '' ? inputs : `${inputs},`) +
                                    Buffer.from(JSON.stringify(input)).toString('hex');
                        }
                        chaincode_proposal_input = inputs;
                    }
                    endorser_signature =
                        txObj.payload.data.actions[0].payload.action.endorsements[0].signature;
                    if (endorser_signature !== undefined) {
                        endorser_signature = Buffer.from(JSON.stringify(endorser_signature)).toString('hex');
                    }
                    payload_proposal_hash = txObj.payload.data.actions[0].payload.action.proposal_response_payload.proposal_hash.toString('hex');
                    endorser_id_bytes =
                        txObj.payload.data.actions[0].payload.action.endorsements[0].endorser
                            .IdBytes;
                }
                if (txObj.payload.header.channel_header.typeString === 'CONFIG') {
                    txid = sha.sha256(txStr);
                    readSet =
                        (_a = txObj.payload.data.last_update.payload) === null || _a === void 0 ? void 0 : _a.data.config_update.read_set;
                    writeSet =
                        (_b = txObj.payload.data.last_update.payload) === null || _b === void 0 ? void 0 : _b.data.config_update.write_set;
                }
                const read_set = JSON.stringify(readSet, null, 2);
                const write_set = JSON.stringify(writeSet, null, 2);
                const chaincode_id = String.fromCharCode.apply(null, chaincodeID);
                // checking new chaincode is deployed
                if (!noDiscovery &&
                    header.channel_header.typeString ===
                        fabric_const.BLOCK_TYPE_ENDORSER_TRANSACTION &&
                    (chaincode === fabric_const.CHAINCODE_LSCC ||
                        chaincode === fabric_const.CHAINCODE_LIFECYCLE)) {
                    setTimeout((cli, chName, chGenHash) => __awaiter(this, void 0, void 0, function* () {
                        // get discovery and insert chaincode details to db
                        yield this.insertFromDiscoveryResults(cli, chName, chGenHash);
                        const notify = {
                            notify_type: fabric_const.NOTITY_TYPE_CHAINCODE,
                            network_id,
                            channel_name: chName
                        };
                        this.platform.send(notify);
                    }), 10000, client, channel_name, channel_genesis_hash);
                }
                /* eslint-enable */
                const transaction_row = {
                    blockid: block.header.number.toString(),
                    txhash: txid,
                    createdt: txObj.payload.header.channel_header.timestamp,
                    chaincodename: chaincode,
                    chaincode_id,
                    status,
                    creator_msp_id: txObj.payload.header.signature_header.creator.mspid,
                    endorser_msp_id: mspId,
                    type: txObj.payload.header.channel_header.typeString,
                    read_set,
                    write_set,
                    channel_genesis_hash,
                    validation_code,
                    envelope_signature,
                    payload_extension,
                    creator_nonce,
                    chaincode_proposal_input,
                    endorser_signature,
                    creator_id_bytes,
                    payload_proposal_hash,
                    endorser_id_bytes
                };
                // Insert transaction
                const res = yield this.persistence
                    .getCrudService()
                    .saveTransaction(network_id, transaction_row, chaincodeversion);
                logger.debug('saveTransaction ', res);
            }
            // Insert block
            logger.info('block_row.blocknum ', block_row.blocknum);
            const successSaveBlock = yield this.persistence
                .getCrudService()
                .saveBlock(network_id, block_row);
            logger.debug('result of SaveBlock ', successSaveBlock);
            if (successSaveBlock) {
                // Push last block
                const notify = {
                    notify_type: fabric_const.NOTITY_TYPE_BLOCK,
                    network_id,
                    channel_name,
                    title: `Block ${block.header.number.toString()} added to Channel: ${channel_name}`,
                    type: 'block',
                    message: `Block ${block.header.number.toString()} established with ${block.data.data.length} tx`,
                    time: createdt,
                    txcount: block.data.data.length,
                    datahash: block.header.data_hash.toString('hex'),
                    blksize: block_row.blksize
                };
                this.platform.send(notify);
            }
            const index = this.blocksInProcess.indexOf(blockPro_key);
            this.blocksInProcess.splice(index, 1);
            return true;
        });
    }
    convertFormatOfValue(prop, encoding, obj) {
        if (Array.isArray(obj)) {
            for (let idx = 0; idx < obj.length; idx++) {
                this.convertFormatOfValue(prop, encoding, obj[idx]);
            }
        }
        else if (!Buffer.isBuffer(obj) && typeof obj === 'object') {
            // Each element of array of Buffer is excluded by the 1st condition
            Object.keys(obj).forEach(key => {
                if (key === prop && Buffer.isBuffer(obj[key])) {
                    obj[key] = obj[key].toString(encoding);
                }
                else if (obj[key]) {
                    this.convertFormatOfValue(prop, encoding, obj[key]);
                }
            });
        }
    }
    /**
     *
     *
     *
     * @returns
     * @memberof SyncServices
     */
    getPlatform() {
        return this.platform;
    }
    /**
     *
     *
     * @returns
     * @memberof SyncServices
     */
    getPersistence() {
        return this.persistence;
    }
}
exports.SyncServices = SyncServices;
// Transaction validation code
function convertValidationCode(code) {
    if (typeof code === 'string') {
        return code;
    }
    return _validation_codes[code];
}
exports.convertValidationCode = convertValidationCode;
// Calculate data size of json object
function jsonObjSize(json) {
    let bytes = 0;
    function sizeOf(obj) {
        if (obj !== null && obj !== undefined) {
            switch (typeof obj) {
                case 'number': {
                    bytes += 8;
                    break;
                }
                case 'string': {
                    bytes += obj.length;
                    break;
                }
                case 'boolean': {
                    bytes += 4;
                    break;
                }
                case 'object': {
                    const objClass = Object.prototype.toString.call(obj).slice(8, -1);
                    if (objClass === 'Object' || objClass === 'Array') {
                        for (const key in obj) {
                            if (!Object.prototype.hasOwnProperty.call(obj, key))
                                continue;
                            sizeOf(obj[key]);
                        }
                    }
                    else {
                        bytes += obj.length;
                    }
                    break;
                }
                default:
                    logger.debug(typeof obj);
                    break;
            }
        }
        return bytes;
    }
    function formatByteSize(rawByte) {
        return (rawByte / 1024).toFixed(0);
    }
    return formatByteSize(sizeOf(json));
}
exports.jsonObjSize = jsonObjSize;
//# sourceMappingURL=SyncService.js.map