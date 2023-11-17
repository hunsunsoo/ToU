"use strict";
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
exports.dbroutes = void 0;
/**
 *    SPDX-License-Identifier: Apache-2.0
 */
const requtil = __importStar(require("./requestutils"));
/**
 *
 *
 * @param {*} router
 * @param {*} platform
 */
function dbroutes(router, platform) {
    const dbStatusMetrics = platform.getPersistence().getMetricService();
    const dbCrudService = platform.getPersistence().getCrudService();
    router.get('/status/:channel_genesis_hash', (req, res) => {
        const channel_genesis_hash = req.params.channel_genesis_hash;
        if (channel_genesis_hash) {
            const extReq = req;
            dbStatusMetrics.getStatus(extReq.network, channel_genesis_hash, data => {
                if (data && data.chaincodeCount && data.txCount && data.peerCount) {
                    return res.send(data);
                }
                return requtil.notFound(req, res);
            });
        }
        else {
            return requtil.invalidRequest(req, res);
        }
    });
    /**
     * Transaction count
     * GET /block/get -> /block/transactions/
     * curl -i 'http://<host>:<port>/block/transactions/<channel_genesis_hash>/<number>'
     * Response:
     * {
     * 'number': 2,
     * 'txCount': 1
     * }
     */
    router.get('/block/transactions/:channel_genesis_hash/:number', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const number = parseInt(req.params.number);
        const channel_genesis_hash = req.params.channel_genesis_hash;
        if (!isNaN(number) && channel_genesis_hash) {
            const extReq = req;
            const row = yield dbCrudService.getTxCountByBlockNum(extReq.network, channel_genesis_hash, number);
            if (row) {
                return res.send({
                    status: 200,
                    number: row.blocknum,
                    txCount: row.txcount
                });
            }
            return requtil.notFound(req, res);
        }
        return requtil.invalidRequest(req, res);
    }));
    /**
     * *
     * Transaction Information
     * GET /tx/getinfo -> /transaction/<txid>
     * curl -i 'http://<host>:<port>/transaction/<channel_genesis_hash>/<txid>'
     * Response:
     * {
     * 'tx_id': 'header.channel_header.tx_id',
     * 'timestamp': 'header.channel_header.timestamp',
     * 'channel_id': 'header.channel_header.channel_id',
     * 'type': 'header.channel_header.type'
     * }
     */
    router.get('/transaction/:channel_genesis_hash/:txid', (req, res) => {
        const txid = req.params.txid;
        const channel_genesis_hash = req.params.channel_genesis_hash;
        if (txid && txid !== '0' && channel_genesis_hash) {
            const extReq = req;
            dbCrudService
                .getTransactionByID(extReq.network, channel_genesis_hash, txid)
                .then((row) => {
                if (row) {
                    row.createdt = new Date(row.createdt).toISOString();
                    return res.send({ status: 200, row });
                }
            });
        }
        else {
            return requtil.invalidRequest(req, res);
        }
    });
    router.get('/blockActivity/:channel_genesis_hash', (req, res) => {
        const channel_genesis_hash = req.params.channel_genesis_hash;
        if (channel_genesis_hash) {
            const extReq = req;
            dbCrudService
                .getBlockActivityList(extReq.network, channel_genesis_hash)
                .then((row) => {
                if (row) {
                    return res.send({ status: 200, row });
                }
            });
        }
        else {
            return requtil.invalidRequest(req, res);
        }
    });
    /**
     * *
     * Transaction list
     * GET /txList/
     * curl -i 'http://<host>:<port>/txList/<channel_genesis_hash>/<blocknum>/<txid>/<limitrows>/<offset>'
     * Response:
     * {'rows':{"txnsData": [{'id':56,'channelname':'mychannel','blockid':24,
     * 'txhash':'c42c4346f44259628e70d52c672d6717d36971a383f18f83b118aaff7f4349b8',
     * 'createdt':'2018-03-09T19:40:59.000Z','chaincodename':'mycc'}], "noOfpages": 1}
     */
    router.get('/txList/:channel_genesis_hash/:blocknum/:txid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const channel_genesis_hash = req.params.channel_genesis_hash;
        const blockNum = parseInt(req.params.blocknum);
        let txid = parseInt(req.params.txid);
        const orgs = requtil.parseOrgsArray(req.query);
        const { from, to } = requtil.queryDatevalidator(req.query.from, req.query.to);
        const { page, size } = req.query;
        if (isNaN(txid)) {
            txid = 0;
        }
        if (channel_genesis_hash) {
            const extReq = req;
            let data = yield dbCrudService
                .getTxList(extReq.network, channel_genesis_hash, blockNum, txid, from, to, orgs, page, size);
            if (data) {
                return res.send({
                    status: 200,
                    rows: data
                });
            }
            return requtil.notFound(req, res);
        }
        else {
            return requtil.invalidRequest(req, res);
        }
    }));
    /**
     * Chaincode list
     * GET /chaincodelist -> /chaincode
     * curl -i 'http://<host>:<port>/chaincode/<channel>'
     * Response:
     * [
     * {
     * 'channelName': 'mychannel',
     * 'chaincodename': 'mycc',
     * 'path': 'github.com/hyperledger/fabric/examples/chaincode/go/chaincode_example02',
     * 'version': '1.0',
     * 'txCount': 0
     * }
     * ]
     */
    router.get('/chaincode/:channel', (req, res) => {
        const channelName = req.params.channel;
        if (channelName) {
            const extReq = req;
            dbStatusMetrics.getTxPerChaincode(extReq.network, channelName, (data) => __awaiter(this, void 0, void 0, function* () {
                res.send({
                    status: 200,
                    chaincode: data
                });
            }));
        }
        else {
            return requtil.invalidRequest(req, res);
        }
    });
    /**
     * *Peer List
     * GET /peerlist -> /peers
     * curl -i 'http://<host>:<port>/peers/<channel_genesis_hash>'
     * Response:
     * [
     * {
     * 'requests': 'grpcs://127.0.0.1:7051',
     * 'server_hostname': 'peer0.org1.example.com'
     * }
     * ]
     */
    router.get('/peers/:channel_genesis_hash', (req, res) => {
        const channel_genesis_hash = req.params.channel_genesis_hash;
        if (channel_genesis_hash) {
            const extReq = req;
            dbStatusMetrics.getPeerList(extReq.network, channel_genesis_hash, (data) => {
                res.send({ status: 200, peers: data });
            });
        }
        else {
            return requtil.invalidRequest(req, res);
        }
    });
    /**
     * *
     * List of blocks and transactions
     * GET /blockAndTxList
     * curl -i 'http://<host>:<port>/blockAndTxList/channel_genesis_hash/<blockNum>/<limitrows>/<offset>'
     * Response:
     * {'rows': { "blocksData":[{'id':51,'blocknum':50,'datahash':'374cceda1c795e95fc31af8f137feec8ab6527b5d6c85017dd8088a456a68dee',
     * 'prehash':'16e76ca38975df7a44d2668091e0d3f05758d6fbd0aab76af39f45ad48a9c295','channelname':'mychannel','txcount':1,
     * 'createdt':'2018-03-13T15:58:45.000Z','txhash':['6740fb70ed58d5f9c851550e092d08b5e7319b526b5980a984b16bd4934b87ac']}], "noOfpages": 1}
     */
    router.get('/blockAndTxList/:channel_genesis_hash/:blocknum', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const channel_genesis_hash = req.params.channel_genesis_hash;
        const blockNum = parseInt(req.params.blocknum);
        const orgs = requtil.parseOrgsArray(req.query);
        const { from, to } = requtil.queryDatevalidator(req.query.from, req.query.to);
        const { page, size } = req.query;
        if (channel_genesis_hash) {
            const extReq = req;
            let data = yield dbCrudService.getBlockAndTxList(extReq.network, channel_genesis_hash, blockNum, from, to, orgs, page, size);
            if (data) {
                return res.send({
                    status: 200,
                    rows: data
                });
            }
            return requtil.notFound(req, res);
        }
        else {
            return requtil.invalidRequest(req, res);
        }
    }));
    /**
     * *
     * Transactions per minute with hour interval
     * GET /txByMinute
     * curl -i 'http://<host>:<port>/txByMinute/<channel_genesis_hash>/<hours>'
     * Response:
     * {'rows':[{'datetime':'2018-03-13T17:46:00.000Z','count':'0'},{'datetime':'2018-03-13T17:47:00.000Z','count':'0'},
     * {'datetime':'2018-03-13T17:48:00.000Z','count':'0'},{'datetime':'2018-03-13T17:49:00.000Z','count':'0'},
     * {'datetime':'2018-03-13T17:50:00.000Z','count':'0'},{'datetime':'2018-03-13T17:51:00.000Z','count':'0'},
     * {'datetime':'2018-03-13T17:52:00.000Z','count':'0'},{'datetime':'2018-03-13T17:53:00.000Z','count':'0'}]}
     */
    router.get('/txByMinute/:channel_genesis_hash/:hours', (req, res) => {
        const channel_genesis_hash = req.params.channel_genesis_hash;
        const hours = parseInt(req.params.hours);
        if (channel_genesis_hash && !isNaN(hours)) {
            const extReq = req;
            return dbStatusMetrics
                .getTxByMinute(extReq.network, channel_genesis_hash, hours)
                .then(handleResult(req, res));
        }
        return requtil.invalidRequest(req, res);
    });
    /**
     * *
     * Transactions per hour(s) with day interval
     * GET /txByHour
     * curl -i 'http://<host>:<port>/txByHour/<channel_genesis_hash>/<days>'
     * Response:
     * {'rows':[{'datetime':'2018-03-12T19:00:00.000Z','count':'0'},
     * {'datetime':'2018-03-12T20:00:00.000Z','count':'0'}]}
     */
    router.get('/txByHour/:channel_genesis_hash/:days', (req, res) => {
        const channel_genesis_hash = req.params.channel_genesis_hash;
        const days = parseInt(req.params.days);
        if (channel_genesis_hash && !isNaN(days)) {
            const extReq = req;
            return dbStatusMetrics
                .getTxByHour(extReq.network, channel_genesis_hash, days)
                .then(handleResult(req, res));
        }
        return requtil.invalidRequest(req, res);
    });
    /**
     * *
     * Blocks per minute with hour interval
     * GET /blocksByMinute
     * curl -i 'http://<host>:<port>/blocksByMinute/<channel_genesis_hash>/<hours>'
     * Response:
     * {'rows':[{'datetime':'2018-03-13T19:59:00.000Z','count':'0'}]}
     */
    router.get('/blocksByMinute/:channel_genesis_hash/:hours', (req, res) => {
        const channel_genesis_hash = req.params.channel_genesis_hash;
        const hours = parseInt(req.params.hours);
        if (channel_genesis_hash && !isNaN(hours)) {
            const extReq = req;
            return dbStatusMetrics
                .getBlocksByMinute(extReq.network, channel_genesis_hash, hours)
                .then(handleResult(req, res));
        }
        return requtil.invalidRequest(req, res);
    });
    function handleResult(req, res) {
        return function (rows) {
            if (rows) {
                return res.send({ status: 200, rows });
            }
            return requtil.notFound(req, res);
        };
    }
    /**
     * *
     * Blocks per hour(s) with day interval
     * GET /blocksByHour
     * curl -i 'http://<host>:<port>/blocksByHour/<channel_genesis_hash>/<days>'
     * Response:
     * {'rows':[{'datetime':'2018-03-13T20:00:00.000Z','count':'0'}]}
     */
    router.get('/blocksByHour/:channel_genesis_hash/:days', (req, res) => {
        const channel_genesis_hash = req.params.channel_genesis_hash;
        const days = parseInt(req.params.days);
        if (channel_genesis_hash && !isNaN(days)) {
            const extReq = req;
            return dbStatusMetrics
                .getBlocksByHour(extReq.network, channel_genesis_hash, days)
                .then(handleResult(req, res));
        }
        return requtil.invalidRequest(req, res);
    });
} // End dbroutes()
exports.dbroutes = dbroutes;
//# sourceMappingURL=dbroutes.js.map