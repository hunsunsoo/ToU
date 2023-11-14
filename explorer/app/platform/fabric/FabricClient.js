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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricClient = void 0;
const lodash_1 = require("lodash");
const helper_1 = require("../../common/helper");
const ExplorerError_1 = require("../../common/ExplorerError");
const ExplorerMessage_1 = require("../../common/ExplorerMessage");
const FabricGateway_1 = require("../../platform/fabric/gateway/FabricGateway");
const FabricUtils = __importStar(require("./utils/FabricUtils"));
const logger = helper_1.helper.getLogger('FabricClient');
/**
 *
 *
 * @class FabricClient
 */
class FabricClient {
    /**
     * Creates an instance of FabricClient.
     * @param {FabricConfig} config
     * @memberof FabricClient
     */
    constructor(config) {
        this.network_id = config.getNetworkId();
        this.fabricGateway = null;
        this.channelsGenHash = new Map();
        this.config = config;
        this.status = false;
        this.channels = [];
    }
    /**
     *
     *
     * @param {*} persistence
     * @memberof FabricClient
     */
    initialize(persistence) {
        return __awaiter(this, void 0, void 0, function* () {
            // Before initializing a channel
            // Loading client from network configuration file
            logger.debug('Client configuration [%s]  ...', this.config.getNetworkId());
            try {
                // Use Gateway to connect to fabric network
                this.fabricGateway = new FabricGateway_1.FabricGateway(this.config);
                yield this.fabricGateway.initialize();
            }
            catch (error) {
                // TODO in case of the failure, should terminate explorer?
                logger.error(error);
                throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_1009);
            }
            // Getting channels from queryChannels
            let channels;
            try {
                channels = yield this.fabricGateway.queryChannels();
            }
            catch (e) {
                logger.error(e);
            }
            if (channels) {
                this.status = true;
                logger.debug('Client channels >> %j', channels.channels);
                // Initialize channel network information from Discover
                for (const channel of channels.channels) {
                    logger.debug('Initializing channel ', channel.channel_id);
                    try {
                        yield this.initializeNewChannel(channel.channel_id);
                        logger.debug('Initialized channel >> %s', channel.channel_id);
                    }
                    catch (error) {
                        logger.error('Failed to initialize new channel: ', channel.channel_id);
                    }
                }
            }
            else if (persistence) {
                logger.info('********* call to initializeDetachClient **********');
                this.initializeDetachClient(persistence);
            }
            else {
                logger.error('Not found any channels');
            }
        });
    }
    /**
     *
     *
     * @param {*} persistence
     * @memberof FabricClient
     */
    initializeDetachClient(persistence) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug('initializeDetachClient', this.config.getNetworkId());
            const network_config = this.config.getConfig();
            const peers = this.config.getPeersConfig();
            logger.info('initializeDetachClient, network config) ', network_config);
            logger.info('************************************* initializeDetachClient *************************************************');
            logger.info('Error :', ExplorerMessage_1.explorerError.ERROR_1009);
            logger.info('Info : ', ExplorerMessage_1.explorerError.MESSAGE_1001);
            logger.info('************************************** initializeDetachClient ************************************************');
            const channels = yield persistence
                .getCrudService()
                .getChannelsInfo(this.network_id);
            if (channels.length === 0) {
                throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_2003);
            }
            for (const channel of channels) {
                this.setChannelGenHash(channel.channelname, channel.channel_genesis_hash);
                const nodes = yield persistence
                    .getMetricService()
                    .getPeerList(this.network_id, channel.channel_genesis_hash);
                for (const node of nodes) {
                    const peer_config = peers[node.server_hostname];
                    let pem;
                    try {
                        if (peer_config && peer_config.tlsCACerts) {
                            pem = FabricUtils.getPEMfromConfig(peer_config.tlsCACerts);
                            const msps = {
                                [node.mspid]: {
                                    tls_root_certs: pem
                                }
                            };
                            logger.debug('msps ', msps);
                        }
                    }
                    catch (e) {
                        logger.error(e);
                    }
                }
            }
        });
    }
    /**
     *
     *
     * @param {*} channel_name
     * @memberof FabricClient
     */
    initializeNewChannel(channel_name) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get genesis block for the channel
            const block = yield this.getGenesisBlock(channel_name);
            logger.debug('Genesis Block for client [%s]', this.network_id);
            const channel_genesis_hash = yield FabricUtils.generateBlockHash(block.header);
            // Setting channel_genesis_hash to map
            this.setChannelGenHash(channel_name, channel_genesis_hash);
            this.addChannel(channel_name);
            logger.debug(`Channel genesis hash for channel [${channel_name}] >> ${channel_genesis_hash}`);
        });
    }
    /**
     *
     *
     * @param {*} channel_name
     * @returns
     * @memberof FabricClient
     */
    initializeChannelFromDiscover(channel_name) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug('initializeChannelFromDiscover ', channel_name);
            if (!(0, lodash_1.includes)(this.getChannels(), channel_name)) {
                yield this.initializeNewChannel(channel_name);
            }
            const discover_results = yield this.fabricGateway.getDiscoveryResult(channel_name);
            if (discover_results && 'peers_by_org' in discover_results) {
                for (const org in discover_results.peers_by_org) {
                    logger.info('Discovered', org, discover_results.peers_by_org[org].peers);
                }
            }
            return discover_results;
        });
    }
    /**
     *
     *
     * @param {*} channel
     * @returns
     * @memberof FabricClient
     */
    getGenesisBlock(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const genesisBlock = yield this.fabricGateway.queryBlock(channel, 0);
            if (!genesisBlock) {
                logger.error('Failed to get genesis block');
                return null;
            }
            return genesisBlock;
        });
    }
    /**
     *
     *
     * @returns
     * @memberof FabricClient
     */
    getChannelNames() {
        return Array.from(this.channelsGenHash.keys());
    }
    /**
     *
     *
     *
     * @returns
     * @memberof FabricClient
     */
    getChannels() {
        return this.channels; // Return Array
    }
    /**
     *
     *
     * @param {*} channelName
     * @memberof FabricClient
     */
    addChannel(channelName) {
        this.channels.push(channelName);
    }
    /**
     *
     *
     * @param {*} channel_name
     * @returns
     * @memberof FabricClient
     */
    getChannelGenHash(channel_name) {
        return this.channelsGenHash.get(channel_name);
    }
    /**
     *
     *
     * @param {*} name
     * @param {*} channel_genesis_hash
     * @memberof FabricClient
     */
    setChannelGenHash(name, channel_genesis_hash) {
        this.channelsGenHash.set(name, channel_genesis_hash);
    }
    /**
     *
     *
     * @returns
     * @memberof FabricClient
     */
    getNetworkId() {
        return this.network_id;
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof FabricClient
     */
    getChannelNameByHash(channel_genesis_hash) {
        for (const [channel_name, hash_name] of this.channelsGenHash.entries()) {
            if (channel_genesis_hash === hash_name) {
                return channel_name;
            }
        }
    }
    /**
     *
     *
     * @returns
     * @memberof FabricClient
     */
    getStatus() {
        return this.status;
    }
    /**
     *
     *
     * @returns
     * @memberof FabricClient
     */
    getNetworkConfig() {
        return this.config.getConfig();
    }
}
exports.FabricClient = FabricClient;
//# sourceMappingURL=FabricClient.js.map