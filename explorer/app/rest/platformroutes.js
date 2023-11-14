"use strict";
/**
 *    SPDX-License-Identifier: Apache-2.0
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
exports.platformroutes = void 0;
const requtil = __importStar(require("./requestutils"));
/**
 *
 *
 * @param {*} router
 * @param {*} platform
 */
function platformroutes(router, platform) {
    return __awaiter(this, void 0, void 0, function* () {
        const proxy = platform.getProxy();
        /**
         * Transactions by Organization(s)
         * GET /txByOrg
         * curl -i 'http://<host>:<port>/txByOrg/<channel_genesis_hash>'
         * Response:
         * {'rows':[{'count':'4','creator_msp_id':'Org1'}]}
         */
        router.get('/txByOrg/:channel_genesis_hash', (req, res) => {
            const channel_genesis_hash = req.params.channel_genesis_hash;
            if (channel_genesis_hash) {
                proxy
                    .getTxByOrgs(req.network, channel_genesis_hash)
                    .then((rows) => res.send({ status: 200, rows }));
            }
            else {
                return requtil.invalidRequest(req, res);
            }
        });
        /**
         * Channels
         * GET /channels -> /channels/info
         * curl -i 'http://<host>:<port>/channels/<info>'
         * Response:
         * [
         * {
         * 'channelName': 'mychannel',
         * 'channel_hash': '',
         * 'craetedat': '1/1/2018'
         * }
         * ]
         */
        router.get('/channels/info', (req, res) => {
            proxy
                .getChannelsInfo(req.network)
                .then((data) => {
                data.forEach((element) => {
                    element.createdat = new Date(element.createdat).toISOString();
                });
                res.send({ status: 200, channels: data });
            })
                .catch((err) => res.send({ status: 500, error: err }));
        });
        /**
         * *Peer Status List
         * GET /peerlist -> /peersStatus
         * curl -i 'http://<host>:<port>/peersStatus/<channel>'
         * Response:
         * [
         * {
         * 'requests': 'grpcs://127.0.0.1:7051',
         * 'server_hostname': 'peer0.org1.example.com'
         * }
         * ]
         */
        router.get('/peersStatus/:channel', (req, res) => {
            const channelName = req.params.channel;
            if (channelName) {
                proxy.getPeersStatus(req.network, channelName).then((data) => {
                    res.send({ status: 200, peers: data });
                });
            }
            else {
                return requtil.invalidRequest(req, res);
            }
        });
        /**
         * *
         * Block by number
         * GET /block/getinfo -> /block
         * curl -i 'http://<host>:<port>/block/<channel>/<number>'
         */
        router.get('/block/:channel_genesis_hash/:number', (req, res) => {
            const number = parseInt(req.params.number);
            const channel_genesis_hash = req.params.channel_genesis_hash;
            if (!isNaN(number) && channel_genesis_hash) {
                proxy.getBlockByNumber(req.network, channel_genesis_hash, number).then((block) => {
                    if (typeof block === 'string') {
                        res.send({ status: 500, error: block });
                    }
                    else {
                        res.send({
                            status: 200,
                            number: block.header.number.toString(),
                            previous_hash: block.header.previous_hash.toString('hex'),
                            data_hash: block.header.data_hash.toString('hex'),
                            transactions: block.data.data
                        });
                    }
                });
            }
            else {
                return requtil.invalidRequest(req, res);
            }
        });
        /**
         * Return list of channels
         * GET /channellist -> /channels
         * curl -i http://<host>:<port>/channels
         * Response:
         * {
         * 'channels': [
         * {
         * 'channel_id': 'mychannel'
         * }
         * ]
         * }
         */
        router.get('/channels', (req, res) => {
            proxy.getChannels(req.network).then((channels) => {
                const response = {
                    status: 200,
                    channels: channels
                };
                res.send(response);
            });
        });
        /**
         * Return current channel
         * GET /curChannel
         * curl -i 'http://<host>:<port>/curChannel'
         */
        router.get('/curChannel', (req, res) => {
            proxy.getCurrentChannel(req.network).then((data) => {
                res.send(data);
            });
        });
        /**
         * Return change channel
         * POST /changeChannel
         * curl -i 'http://<host>:<port>/curChannel'
         */
        router.get('/changeChannel/:channel_genesis_hash', (req, res) => {
            const channel_genesis_hash = req.params.channel_genesis_hash;
            proxy.changeChannel(req.network, channel_genesis_hash).then((data) => {
                res.send({
                    currentChannel: data
                });
            });
        });
        /**
         * *
         * Block by block number
         * GET /fetchDataByBlockNo
         * curl -i 'http://<host>:<port>/fetchDataByBlockNo/<channel_genesis_hash>/<blockNo>'
         */
        router.get('/fetchDataByBlockNo/:channel_genesis_hash/:blockNo', (req, res) => {
            const blockNo = parseInt(req.params.blockNo);
            const channel_genesis_hash = req.params.channel_genesis_hash;
            if (!isNaN(blockNo) && channel_genesis_hash) {
                proxy.fetchDataByBlockNo(req.network, channel_genesis_hash, blockNo).then((data) => {
                    if (data != "response_payloads is null") {
                        res.send({ status: 200, data: data });
                    }
                    else {
                        res.send({ status: 404, data: "Block not found" });
                    }
                });
            }
            else {
                return requtil.invalidRequest(req, res);
            }
        });
        /**
         * *
         * Blocks by block range
         * GET /fetchDataByBlockRange
         * curl -i 'http://<host>:<port>/fetchDataByBlockRange/<channel_genesis_hash>/<startBlockNo>/<endBlockNo>'
         */
        router.get('/fetchDataByBlockRange/:channel_genesis_hash/:startBlockNo/:endBlockNo', (req, res) => {
            const startBlockNo = parseInt(req.params.startBlockNo);
            const endBlockNo = parseInt(req.params.endBlockNo);
            const channel_genesis_hash = req.params.channel_genesis_hash;
            if (startBlockNo <= endBlockNo &&
                startBlockNo >= 0 &&
                endBlockNo >= 0 &&
                !isNaN(startBlockNo) &&
                !isNaN(endBlockNo) &&
                channel_genesis_hash) {
                proxy.fetchDataByBlockRange(req.network, channel_genesis_hash, startBlockNo, endBlockNo).then((data) => {
                    if (data != "response_payloads is null") {
                        res.send({ status: 200, data: data });
                    }
                    else {
                        res.send({ status: 404, data: "Block(s) not found" });
                    }
                });
            }
            else {
                return requtil.invalidRequest(req, res);
            }
        });
        /**
         * *
         * Transaction by txn id
         * GET /fetchDataByTxnId
         * curl -i 'http://<host>:<port>/fetchDataByTxnId/<channel_genesis_hash>/<txnId>'
         */
        router.get('/fetchDataByTxnId/:channel_genesis_hash/:txnId', (req, res) => {
            const txnId = req.params.txnId;
            const channel_genesis_hash = req.params.channel_genesis_hash;
            proxy.fetchDataByTxnId(req.network, channel_genesis_hash, txnId).then((data) => {
                if (data != null) {
                    res.send({ status: 200, data: data });
                }
                else {
                    res.send({ status: 404, data: "Transaction not found" });
                }
            });
        });
        /**
         * Return channel metadata
         * GET /metadata
         * curl -i 'http://<host>:<port>/metadata/<chaincode>'
         */
        router.get('/metadata/:channel_genesis_hash/:chaincode', (req, res) => {
            const chaincode = req.params.chaincode;
            const channel_genesis_hash = req.params.channel_genesis_hash;
            if (chaincode && channel_genesis_hash) {
                proxy.getContractMetadata(req.network, chaincode, channel_genesis_hash).then((data) => {
                    res.send({ status: 200, data: data });
                });
            }
            else {
                return requtil.invalidRequest(req, res);
            }
        });
    });
} // End platformroutes()
exports.platformroutes = platformroutes;
//# sourceMappingURL=platformroutes.js.map