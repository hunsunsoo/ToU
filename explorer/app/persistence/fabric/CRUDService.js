"use strict";
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
exports.CRUDService = void 0;
const helper_1 = require("../../common/helper");
const logger = helper_1.helper.getLogger('CRUDService');
/**
 *
 *
 * @class CRUDService
 */
class CRUDService {
    constructor(sql) {
        this.sql = sql;
    }
    /**
     * Get transactions count by block number
     *
     * @param {*} channel_genesis_hash
     * @param {*} blockNum
     * @returns
     * @memberof CRUDService
     */
    getTxCountByBlockNum(network_name, channel_genesis_hash, blockNum) {
        return this.sql.getRowByPkOne('select blocknum ,txcount from blocks where channel_genesis_hash=$1 and blocknum=$2 and network_name = $3', [channel_genesis_hash, blockNum, network_name]);
    }
    /**
     * Get transaction by ID
     *
     * @param {*} channel_genesis_hash
     * @param {*} txhash
     * @returns
     * @memberof CRUDService
     */
    getTransactionByID(network_name, channel_genesis_hash, txhash) {
        const sqlTxById = ` select t.txhash,t.validation_code,t.payload_proposal_hash,t.creator_msp_id,t.endorser_msp_id,t.chaincodename,t.type,t.createdt,t.read_set,
				t.write_set,channel.name as channelName from TRANSACTIONS as t inner join channel on t.channel_genesis_hash=channel.channel_genesis_hash and t.network_name=channel.network_name
				where t.txhash = $1 and t.network_name = $2 `;
        return this.sql.getRowByPkOne(sqlTxById, [txhash, network_name]);
    }
    /**
     * Returns the latest 'n' blocks by channel
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof CRUDService
     */
    getBlockActivityList(network_name, channel_genesis_hash) {
        const sqlBlockActivityList = `select blocks.blocknum,blocks.txcount ,blocks.datahash ,blocks.blockhash ,blocks.prehash,blocks.createdt, (
      SELECT  array_agg(txhash) as txhash FROM transactions where blockid = blocks.blocknum and
       channel_genesis_hash = $1 and network_name = $2 group by transactions.blockid ),
      channel.name as channelname  from blocks inner join channel on blocks.channel_genesis_hash = channel.channel_genesis_hash  where
       blocks.channel_genesis_hash = $1 and blocknum >= 0 and blocks.network_name = $2
       order by blocks.blocknum desc limit 3`;
        return this.sql.getRowsBySQlQuery(sqlBlockActivityList, [
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     * Returns the list of transactions by channel, organization, date range and greater than a block and transaction id.
     *
     * @param {*} channel_genesis_hash
     * @param {*} blockNum
     * @param {*} txid
     * @param {*} from
     * @param {*} to
     * @param {*} page
     * @param {*} size
     * @param {*} orgs
     * @returns
     * @memberof CRUDService
     */
    getTxList(network_name, channel_genesis_hash, blockNum, txid, from, to, orgs, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            var countOfTxns;
            let sqlTxList = ` select t.creator_msp_id,t.txhash,t.type,t.chaincodename,t.createdt,channel.name as channelName from transactions as t
       inner join channel on t.channel_genesis_hash=channel.channel_genesis_hash and t.network_name = channel.network_name where  t.blockid >= $1 and t.id >= $2 and
							t.channel_genesis_hash = $3 and t.network_name = $4 and t.createdt between $5 and $6 `;
            const values = [blockNum, txid, channel_genesis_hash, network_name, from, to, page, size];
            if (page == 1) {
                let sqlTxCount;
                const filterValues = [blockNum, txid, channel_genesis_hash, network_name, from, to];
                sqlTxCount = ` select count(*) from transactions as t inner join channel on t.channel_genesis_hash=channel.channel_genesis_hash and t.network_name = channel.network_name
			where t.blockid >= $1 and t.id >= $2 and t.channel_genesis_hash = $3 and t.network_name = $4 and t.createdt between $5 and $6 `;
                if (orgs && orgs.length > 0) {
                    sqlTxCount += ' and t.creator_msp_id = ANY($7)';
                    filterValues.push(orgs);
                }
                countOfTxns = yield this.sql.getRowsCountBySQlQuery(sqlTxCount, filterValues);
            }
            if (orgs && orgs.length > 0) {
                sqlTxList += ' and t.creator_msp_id = ANY($9)';
                values.push(orgs);
            }
            sqlTxList += ' order by t.createdt desc LIMIT $8 OFFSET (($7 - 1) * $8)';
            let txnsData = yield this.sql.getRowsBySQlQuery(sqlTxList, values);
            let response = {
                txnsData: txnsData,
                noOfpages: Math.ceil(countOfTxns / size)
            };
            return response;
        });
    }
    /**
     *
     * Returns the list of blocks and transactions by channel, organization, date range.
     *
     * @param {*} channel_genesis_hash
     * @param {*} blockNum
     * @param {*} txid
     * @param {*} from
     * @param {*} to
     * @param {*} page
     * @param {*} size
     * @param {*} orgs
     * @returns
     * @memberof CRUDService
     */
    getBlockAndTxList(network_name, channel_genesis_hash, blockNum, from, to, orgs, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            var countOfBlocks;
            let byOrgs = ' ';
            const values = [channel_genesis_hash, network_name, from, to, page, size];
            if (orgs && orgs.length > 0) {
                values.push(orgs);
                byOrgs = ' and creator_msp_id = ANY($7)';
            }
            let sqlBlockTxList;
            if (orgs == null || orgs.length == 0) {
                sqlBlockTxList = `SELECT a.* FROM  (
								SELECT (SELECT c.name FROM channel c WHERE c.channel_genesis_hash =$1 AND c.network_name = $2) 
									as channelname, blocks.blocknum,blocks.txcount ,blocks.datahash ,blocks.blockhash ,blocks.prehash,blocks.createdt, blocks.blksize, (
								SELECT array_agg(txhash) as txhash FROM transactions WHERE blockid = blocks.blocknum ${byOrgs} AND 
									channel_genesis_hash = $1 AND network_name = $2 AND createdt between $3 AND $4) FROM blocks WHERE
									blocks.channel_genesis_hash =$1 AND blocks.network_name = $2 AND blocknum >= 0 AND blocks.createdt between $3 AND $4
								ORDER BY blocks.blocknum desc) a WHERE a.txhash IS NOT NULL LIMIT $6 OFFSET (($5 - 1) * $6)`;
            }
            else {
                sqlBlockTxList = `SELECT a.* FROM  (
								SELECT (SELECT c.name FROM channel c WHERE c.channel_genesis_hash =$1 AND c.network_name = $2) 
									as channelname, blocks.blocknum,blocks.txcount ,blocks.datahash ,blocks.blockhash ,blocks.prehash,blocks.createdt, blocks.blksize, (
								SELECT array_agg(txhash) as txhash FROM transactions WHERE blockid = blocks.blocknum ${byOrgs}
									AND transactions.creator_msp_id IS NOT NULL  
									AND	channel_genesis_hash = $1 AND network_name = $2 AND createdt between $3 AND $4) FROM blocks WHERE
									blocks.channel_genesis_hash =$1 AND blocks.network_name = $2 AND blocknum >= 0 AND blocks.createdt between $3 AND $4
								ORDER BY blocks.blocknum desc) a WHERE a.txhash IS NOT NULL LIMIT $6 OFFSET (($5 - 1) * $6)`;
            }
            if (page == 1) {
                let sqlBlockTxCount;
                let byOrgs = ' ';
                const filterValues = [channel_genesis_hash, network_name, from, to];
                if (orgs && orgs.length > 0) {
                    filterValues.push(orgs);
                    byOrgs = ' and creator_msp_id = ANY($5)';
                }
                if (orgs == null || orgs.length == 0) {
                    sqlBlockTxCount = `SELECT COUNT(DISTINCT blocks.blocknum) FROM blocks
										JOIN transactions ON blocks.blocknum = transactions.blockid 
										WHERE blockid = blocks.blocknum ${byOrgs} AND 
										blocknum >= 0 AND blocks.channel_genesis_hash = $1 AND blocks.network_name = $2 AND 
										blocks.createdt between $3 AND $4`;
                }
                else {
                    sqlBlockTxCount = `SELECT COUNT(DISTINCT blocks.blocknum) FROM blocks
										JOIN transactions ON blocks.blocknum = transactions.blockid 
										WHERE blockid = blocks.blocknum ${byOrgs}  
										AND blocks.channel_genesis_hash = $1 and blocks.network_name = $2 AND blocks.createdt between $3 AND $4
										AND transactions.creator_msp_id IS NOT NULL AND transactions.creator_msp_id != ' ' AND length(creator_msp_id) > 0`;
                }
                countOfBlocks = yield this.sql.getRowsCountBySQlQuery(sqlBlockTxCount, filterValues);
            }
            let blocksData = yield this.sql.getRowsBySQlQuery(sqlBlockTxList, values);
            let noOfpages = Math.ceil(countOfBlocks / size);
            let response = {
                blocksData: blocksData,
                noOfpages: noOfpages
            };
            return response;
        });
    }
    /**
     * Returns channel configuration
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof CRUDService
     */
    getChannelConfig(network_name, channel_genesis_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const channelConfig = yield this.sql.getRowsBySQlCase(' select * from channel where channel_genesis_hash =$1 and network_name = $2 ', [channel_genesis_hash, network_name]);
            return channelConfig;
        });
    }
    /**
     * Returns channel by name, and channel genesis hash
     *
     * @param {*} channelname
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof CRUDService
     */
    getChannel(network_name, channelname, channel_genesis_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.sql.getRowsBySQlCase(' select * from channel where name=$1 and channel_genesis_hash=$2 and network_name = $3 ', [channelname, channel_genesis_hash, network_name]);
            return channel;
        });
    }
    /**
     *
     * @param {*} channelname
     * @returns
     * @memberof CRUDService
     */
    existChannel(network_name, channelname) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.sql.getRowsBySQlCase(' select count(1) from channel where name=$1 and network_name = $2 ', [channelname, network_name]);
            return channel;
        });
    }
    /**
     *
     *
     * @param {*} block
     * @returns
     * @memberof CRUDService
     */
    /* eslint-disable */
    saveBlock(network_name, block) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.sql.getRowByPkOne(`select count(1) as c from blocks where blocknum=$1 and txcount=$2
		and channel_genesis_hash=$3 and network_name =$4 and prehash=$5 and datahash=$6 `, [
                block.blocknum,
                block.txcount,
                block.channel_genesis_hash,
                network_name,
                block.prehash,
                block.datahash
            ]);
            if (isValidRow(c)) {
                block.network_name = network_name;
                yield this.sql.saveRow('blocks', block);
                yield this.sql.updateBySql(`update channel set blocks =blocks+1 where channel_genesis_hash=$1 and network_name = $2 `, [block.channel_genesis_hash, network_name]);
                return true;
            }
            return false;
        });
    }
    /* eslint-enable */
    /**
     *
     *
     * @param {*} transaction
     * @returns
     * @memberof CRUDService
     */
    saveTransaction(network_name, transaction, chaincodeversion) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.sql.getRowByPkOne('select count(1) as c from transactions where blockid=$1 and txhash=$2 and channel_genesis_hash=$3 and network_name = $4 ', [
                transaction.blockid,
                transaction.txhash,
                transaction.channel_genesis_hash,
                network_name
            ]);
            if (isValidRow(c)) {
                transaction.network_name = network_name;
                yield this.sql.saveRow('transactions', transaction);
                yield this.sql.updateBySql('update chaincodes set txcount =txcount+1 where channel_genesis_hash=$1 and network_name = $2 and name=$3 and version=$4', [transaction.channel_genesis_hash, network_name, transaction.chaincodename, chaincodeversion]);
                yield this.sql.updateBySql('update channel set trans =trans+1 where channel_genesis_hash=$1 and network_name = $2 ', [transaction.channel_genesis_hash, network_name]);
                return true;
            }
            return false;
        });
    }
    /**
     * Returns latest block from blocks table
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof CRUDService
     */
    getCurBlockNum(network_name, channel_genesis_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            let curBlockNum;
            try {
                const row = yield this.sql.getRowsBySQlCase('select max(blocknum) as blocknum from blocks  where channel_genesis_hash=$1 and network_name = $2 ', [channel_genesis_hash, network_name]);
                if (row && row.blocknum) {
                    curBlockNum = parseInt(row.blocknum);
                }
                else {
                    curBlockNum = -1;
                }
            }
            catch (err) {
                logger.error(err);
                return -1;
            }
            return curBlockNum;
        });
    }
    /* eslint-disable */
    /**
     *
     *
     * @param {*} chaincode
     * @memberof CRUDService
     */
    saveChaincode(network_name, chaincode) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.sql.getRowByPkOne(`select count(1) as c from chaincodes where name=$1 and 
		channel_genesis_hash=$2 and network_name = $3 and version=$4 and path=$5`, [
                chaincode.name,
                chaincode.channel_genesis_hash,
                network_name,
                chaincode.version,
                chaincode.path
            ]);
            if (isValidRow(c)) {
                chaincode.network_name = network_name;
                yield this.sql.saveRow('chaincodes', chaincode);
            }
        });
    }
    /* eslint-enable */
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof CRUDService
     */
    getChannelByGenesisBlockHash(network_name, channel_genesis_hash) {
        return this.sql.getRowByPkOne('select name from channel where channel_genesis_hash=$1 and network_name = $2 ', [channel_genesis_hash, network_name]);
    }
    /**
     *
     *
     * @param {*} peers_ref_chaincode
     * @memberof CRUDService
     */
    saveChaincodPeerRef(network_name, peers_ref_chaincode) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.sql.getRowByPkOne('select count(1) as c from peer_ref_chaincode prc where prc.peerid=$1 and prc.chaincodeid=$2 and cc_version=$3 and channelid=$4 and network_name = $5 ', [
                peers_ref_chaincode.peerid,
                peers_ref_chaincode.chaincodeid,
                peers_ref_chaincode.cc_version,
                peers_ref_chaincode.channelid,
                network_name
            ]);
            if (isValidRow(c)) {
                peers_ref_chaincode.network_name = network_name;
                yield this.sql.saveRow('peer_ref_chaincode', peers_ref_chaincode);
            }
        });
    }
    /**
     *
     *
     * @param {*} channel
     * @memberof CRUDService
     */
    saveChannel(network_name, channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.sql.getRowByPkOne('select count(1) as c from channel where name=$1 and channel_genesis_hash=$2 and network_name = $3 ', [channel.name, channel.channel_genesis_hash, network_name]);
            if (isValidRow(c)) {
                yield this.sql.saveRow('channel', {
                    name: channel.name,
                    createdt: channel.createdt,
                    blocks: channel.blocks,
                    trans: channel.trans,
                    channel_hash: channel.channel_hash,
                    channel_genesis_hash: channel.channel_genesis_hash,
                    network_name: network_name
                });
            }
            else {
                yield this.sql.updateBySql('update channel set blocks=$1,trans=$2,channel_hash=$3 where name=$4 and channel_genesis_hash=$5 and network_name = $6 ', [
                    channel.blocks,
                    channel.trans,
                    channel.channel_hash,
                    channel.name,
                    channel.channel_genesis_hash,
                    network_name
                ]);
            }
        });
    }
    /**
     *
     *
     * @param {*} peer
     * @memberof CRUDService
     */
    savePeer(network_name, peer) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.sql.getRowByPkOne('select count(1) as c from peer where channel_genesis_hash=$1 and network_name = $2 and server_hostname=$3 ', [peer.channel_genesis_hash, network_name, peer.server_hostname]);
            if (isValidRow(c)) {
                peer.network_name = network_name;
                yield this.sql.saveRow('peer', peer);
            }
        });
    }
    /**
     *
     *
     * @param {*} peers_ref_Channel
     * @memberof CRUDService
     */
    savePeerChannelRef(network_name, peers_ref_Channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.sql.getRowByPkOne('select count(1) as c from peer_ref_channel prc where prc.peerid = $1 and network_name = $2 and prc.channelid=$3 ', [peers_ref_Channel.peerid, network_name, peers_ref_Channel.channelid]);
            if (isValidRow(c)) {
                peers_ref_Channel.network_name = network_name;
                yield this.sql.saveRow('peer_ref_channel', peers_ref_Channel);
            }
        });
    }
    /**
     *
     *
     * @param {*} peerid
     * @returns
     * @memberof CRUDService
     */
    getChannelsInfo(network_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const channels = yield this.sql.getRowsBySQlNoCondition(` select c.id as id,c.name as channelName,c.blocks as blocks ,c.channel_genesis_hash as channel_genesis_hash,c.trans as transactions,c.createdt as createdat,c.channel_hash as channel_hash from channel c,
		peer_ref_channel pc where c.channel_genesis_hash = pc.channelid and c.network_name = $1 group by c.id ,c.name ,c.blocks  ,c.trans ,c.createdt ,c.channel_hash,c.channel_genesis_hash order by c.name `, [network_name]);
            return channels;
        });
    }
    // Orderer BE-303
    /**
     *
     *
     * @param {*} orderer
     * @memberof CRUDService
     */
    saveOrderer(network_name, orderer) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.sql.getRowByPkOne('select count(1) as c from orderer where requests=$1 and network_name = $2 ', [orderer.requests, network_name]);
            if (isValidRow(c)) {
                orderer.network_name = network_name;
                yield this.sql.saveRow('orderer', orderer);
            }
        });
    }
    // Orderer BE-303
    /**
     *
     * Returns the block by block number.
     *
     * @param {*} channel_genesis_hash
     * @param {*} blockNo
     * @returns
     * @memberof CRUDService
     */
    getBlockByBlocknum(network_name, channel_genesis_hash, blockNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlBlockTxList = `select a.* from  (
				select (select c.name from channel c where c.channel_genesis_hash =$1 and c.network_name = $2) 
					as channelname, blocks.blocknum,blocks.txcount ,blocks.datahash ,blocks.blockhash ,blocks.prehash,blocks.createdt, blocks.blksize, (
				  SELECT  array_agg(txhash) as txhash FROM transactions where blockid = $3 and 
				   channel_genesis_hash = $1 and network_name = $2) from blocks where
				   blocks.channel_genesis_hash =$1 and blocks.network_name = $2 and blocknum = $3)  a where  a.txhash IS NOT NULL`;
            const row = yield this.sql.getRowsBySQlCase(sqlBlockTxList, [channel_genesis_hash, network_name, blockNo]);
            return row;
        });
    }
}
exports.CRUDService = CRUDService;
/**
 *
 *
 * @param {*} rowResult
 * @returns
 */
function isValidRow(rowResult) {
    if (rowResult) {
        const val = rowResult.c;
        if (val === 0 || val === '0') {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=CRUDService.js.map