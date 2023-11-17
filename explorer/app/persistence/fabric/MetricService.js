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
exports.MetricService = void 0;
const helper_1 = require("../../common/helper");
const logger = helper_1.helper.getLogger('MetricService');
/**
 *
 *
 * @class MetricService
 */
class MetricService {
    constructor(sql) {
        this.sql = sql;
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof MetricService
     */
    getChaincodeCount(network_name, channel_genesis_hash) {
        return this.sql.getRowsBySQlCase('select count(DISTINCT name) c from chaincodes where channel_genesis_hash=$1 and network_name=$2 ', [channel_genesis_hash, network_name]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof MetricService
     */
    getPeerlistCount(network_name, channel_genesis_hash) {
        /* eslint-disable quotes */
        return this.sql.getRowsBySQlCase("select count(1) c from peer where channel_genesis_hash=$1 and peer_type='PEER' and network_name=$2 ", [channel_genesis_hash, network_name]);
        /* eslint-enable quotes */
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof MetricService
     */
    getTxCount(network_name, channel_genesis_hash) {
        return this.sql.getRowsBySQlCase('select count(1) c from transactions where channel_genesis_hash=$1 and network_name=$2 ', [channel_genesis_hash, network_name]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof MetricService
     */
    getBlockCount(network_name, channel_genesis_hash) {
        return this.sql.getRowsBySQlCase('select count(1) c from blocks where channel_genesis_hash=$1 and network_name=$2 ', [channel_genesis_hash, network_name]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof MetricService
     */
    getPeerData(network_name, channel_genesis_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const peerArray = [];
            const c1 = yield this.sql.getRowsBySQlNoCondition(`select channel.name as channelName,c.requests as requests,c.channel_genesis_hash as channel_genesis_hash ,
    c.server_hostname as server_hostname, c.mspid as mspid, c.peer_type as peer_type  from peer as c inner join  channel on
	c.channel_genesis_hash=channel.channel_genesis_hash and c.network_name=channel.network_name where c.channel_genesis_hash=$1 and c.network_name=$2 `, [channel_genesis_hash, network_name]);
            for (let i = 0, len = c1.length; i < len; i++) {
                const item = c1[i];
                peerArray.push({
                    name: item.channelName,
                    requests: item.requests,
                    server_hostname: item.server_hostname,
                    channel_genesis_hash: item.channel_genesis_hash,
                    mspid: item.mspid,
                    peer_type: item.peer_type
                });
            }
            return peerArray;
        });
    }
    /**
     *
     *
     * @returns
     * @memberof MetricService
     */
    getOrdererData(network_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const ordererArray = [];
            const c1 = yield this.sql.getRowsBySQlNoCondition('select c.requests as requests,c.server_hostname as server_hostname,c.channel_genesis_hash as channel_genesis_hash from orderer c where network_name=$1 ', [network_name]);
            for (let i = 0, len = c1.length; i < len; i++) {
                const item = c1[i];
                ordererArray.push({
                    requests: item.requests,
                    server_hostname: item.server_hostname,
                    channel_genesis_hash: item.channel_genesis_hash
                });
            }
            return ordererArray;
        });
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof MetricService
     */
    getTxPerChaincodeGenerate(network_name, channel_genesis_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const txArray = [];
            const c = yield this.sql.getRowsBySQlNoCondition(`select  c.name as chaincodename,channel.name as channelname ,c.version as version,c.channel_genesis_hash
	   as channel_genesis_hash,c.path as path ,txcount  as c from chaincodes as c inner join channel on c.channel_genesis_hash=channel.channel_genesis_hash and c.network_name=channel.network_name where  c.channel_genesis_hash=$1 and  c.network_name=$2 `, [channel_genesis_hash, network_name]);
            if (c) {
                c.forEach((item) => {
                    logger.debug(' item ------------> ', item);
                    txArray.push({
                        chaincodename: item.chaincodename,
                        channelName: item.channelname,
                        path: item.path,
                        version: item.version,
                        txCount: item.c,
                        channel_genesis_hash: item.channel_genesis_hash
                    });
                });
            }
            return txArray;
        });
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof MetricService
     */
    getOrgsData(network_name, channel_genesis_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const orgs = [];
            const rows = yield this.sql.getRowsBySQlNoCondition('select distinct on (mspid) mspid from peer  where channel_genesis_hash=$1 and network_name=$2', [channel_genesis_hash, network_name]);
            for (let i = 0, len = rows.length; i < len; i++) {
                orgs.push(rows[i].mspid);
            }
            return orgs;
        });
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} cb
     * @returns
     * @memberof MetricService
     */
    getTxPerChaincode(network_name, channel_genesis_hash, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const txArray = yield this.getTxPerChaincodeGenerate(network_name, channel_genesis_hash);
                return cb(txArray);
            }
            catch (err) {
                logger.error(err);
                return cb([]);
            }
        });
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof MetricService
     */
    getStatusGenerate(network_name, channel_genesis_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            let chaincodeCount = yield this.getChaincodeCount(network_name, channel_genesis_hash);
            if (!chaincodeCount) {
                chaincodeCount = 0;
            }
            let txCount = yield this.getTxCount(network_name, channel_genesis_hash);
            if (!txCount) {
                txCount = 0;
            }
            txCount.c = txCount.c ? txCount.c : 0;
            let blockCount = yield this.getBlockCount(network_name, channel_genesis_hash);
            if (!blockCount) {
                blockCount = 0;
            }
            blockCount.c = blockCount.c ? blockCount.c : 0;
            let peerCount = yield this.getPeerlistCount(network_name, channel_genesis_hash);
            if (!peerCount) {
                peerCount = 0;
            }
            peerCount.c = peerCount.c ? peerCount.c : 0;
            return {
                chaincodeCount: chaincodeCount.c,
                txCount: txCount.c,
                latestBlock: blockCount.c,
                peerCount: peerCount.c
            };
        });
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} cb
     * @returns
     * @memberof MetricService
     */
    getStatus(network_name, channel_genesis_hash, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.getStatusGenerate(network_name, channel_genesis_hash);
                return cb(data);
            }
            catch (err) {
                logger.error(err);
                return cb([]);
            }
        });
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} cb
     * @returns
     * @memberof MetricService
     */
    getPeerList(network_name, channel_genesis_hash, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const peerArray = yield this.getPeerData(network_name, channel_genesis_hash);
                if (cb) {
                    return cb(peerArray);
                }
                return peerArray;
            }
            catch (err) {
                logger.error(err);
                return cb([]);
            }
        });
    }
    /**
     *
     *
     * @param {*} cb
     * @returns
     * @memberof MetricService
     */
    getOrdererList(network_name, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ordererArray = yield this.getOrdererData(network_name);
                return cb(ordererArray);
            }
            catch (err) {
                logger.error(err);
                return cb([]);
            }
        });
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} hours
     * @returns
     * @memberof MetricService
     */
    getTxByMinute(network_name, channel_genesis_hash, hours) {
        const sqlPerMinute = ` with minutes as (
            select generate_series(
              date_trunc('min', now()) - '${hours} hour'::interval,
              date_trunc('min', now()),
              '1 min'::interval
            ) as datetime
          )
          select
            minutes.datetime,
            count(createdt)
          from minutes
          left join TRANSACTIONS on date_trunc('min', TRANSACTIONS.createdt) = minutes.datetime and channel_genesis_hash =$1 and network_name=$2
          group by 1
          order by 1 `;
        return this.sql.getRowsBySQlQuery(sqlPerMinute, [
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} day
     * @returns
     * @memberof MetricService
     */
    getTxByHour(network_name, channel_genesis_hash, day) {
        const sqlPerHour = ` with hours as (
            select generate_series(
              date_trunc('hour', now()) - interval '1 day' * $1,
              date_trunc('hour', now()),
              '1 hour'::interval
            ) as datetime
          )
          select
            hours.datetime,
            count(createdt)
          from hours
          left join TRANSACTIONS on date_trunc('hour', TRANSACTIONS.createdt) = hours.datetime and channel_genesis_hash=$2 and network_name=$3
          group by 1
          order by 1 `;
        return this.sql.getRowsBySQlQuery(sqlPerHour, [
            day,
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} days
     * @returns
     * @memberof MetricService
     */
    getTxByDay(network_name, channel_genesis_hash, days) {
        const sqlPerDay = ` with days as (
            select generate_series(
              date_trunc('day', now()) - interval '1 day' * $1,
              date_trunc('day', now()),
              '1 day'::interval
            ) as datetime
          )
          select
            days.datetime,
            count(createdt)
          from days
          left join TRANSACTIONS on date_trunc('day', TRANSACTIONS.createdt) =days.datetime and channel_genesis_hash=$2 and network_name=$3
          group by 1
          order by 1 `;
        return this.sql.getRowsBySQlQuery(sqlPerDay, [
            days,
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} weeks
     * @returns
     * @memberof MetricService
     */
    getTxByWeek(network_name, channel_genesis_hash, weeks) {
        const sqlPerWeek = ` with weeks as (
            select generate_series(
              date_trunc('week', now()) - '$1 week'::interval,
              date_trunc('week', now()),
              '1 week'::interval
            ) as datetime
          )
          select
            weeks.datetime,
            count(createdt)
          from weeks
          left join TRANSACTIONS on date_trunc('week', TRANSACTIONS.createdt) =weeks.datetime and channel_genesis_hash=$2 and network_name=$3
          group by 1
          order by 1 `;
        return this.sql.getRowsBySQlQuery(sqlPerWeek, [
            weeks,
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} months
     * @returns
     * @memberof MetricService
     */
    getTxByMonth(network_name, channel_genesis_hash, months) {
        const sqlPerMonth = ` with months as (
            select generate_series(
              date_trunc('month', now()) - '$1 month'::interval,
              date_trunc('month', now()),
              '1 month'::interval
            ) as datetime
          )

          select
            months.datetime,
            count(createdt)
          from months
          left join TRANSACTIONS on date_trunc('month', TRANSACTIONS.createdt) =months.datetime and channel_genesis_hash=$2 and network_name=$3
          group by 1
          order by 1 `;
        return this.sql.getRowsBySQlQuery(sqlPerMonth, [
            months,
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} years
     * @returns
     * @memberof MetricService
     */
    getTxByYear(network_name, channel_genesis_hash, years) {
        const sqlPerYear = ` with years as (
            select generate_series(
              date_trunc('year', now()) - '$1 year'::interval,
              date_trunc('year', now()),
              '1 year'::interval
            ) as year
          )
          select
            years.year,
            count(createdt)
          from years
          left join TRANSACTIONS on date_trunc('year', TRANSACTIONS.createdt) =years.year and channel_genesis_hash=$2 and network_name=$3
          group by 1
          order by 1 `;
        return this.sql.getRowsBySQlQuery(sqlPerYear, [
            years,
            channel_genesis_hash,
            network_name
        ]);
    }
    // Block metrics API
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} hours
     * @returns
     * @memberof MetricService
     */
    getBlocksByMinute(network_name, channel_genesis_hash, hours) {
        const sqlPerMinute = ` with minutes as (
            select generate_series(
              date_trunc('min', now()) - interval '1 hour' * $1,
              date_trunc('min', now()),
              '1 min'::interval
            ) as datetime
          )
          select
            minutes.datetime,
            count(createdt)
          from minutes
          left join BLOCKS on date_trunc('min', BLOCKS.createdt) = minutes.datetime and channel_genesis_hash=$2 and network_name=$3
          group by 1
          order by 1  `;
        return this.sql.getRowsBySQlQuery(sqlPerMinute, [
            hours,
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} days
     * @returns
     * @memberof MetricService
     */
    getBlocksByHour(network_name, channel_genesis_hash, days) {
        const sqlPerHour = ` with hours as (
            select generate_series(
              date_trunc('hour', now()) - interval '1 day' * $1,
              date_trunc('hour', now()),
              '1 hour'::interval
            ) as datetime
          )
          select
            hours.datetime,
            count(createdt)
          from hours
          left join BLOCKS on date_trunc('hour', BLOCKS.createdt) = hours.datetime and channel_genesis_hash=$2 and network_name=$3
          group by 1
          order by 1 `;
        return this.sql.getRowsBySQlQuery(sqlPerHour, [
            days,
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} days
     * @returns
     * @memberof MetricService
     */
    getBlocksByDay(network_name, channel_genesis_hash, days) {
        const sqlPerDay = `  with days as (
            select generate_series(
              date_trunc('day', now()) - '${days}day'::interval,
              date_trunc('day', now()),
              '1 day'::interval
            ) as datetime
          )
          select
            days.datetime,
            count(createdt)
          from days
          left join BLOCKS on date_trunc('day', BLOCKS.createdt) =days.datetime and channel_genesis_hash=$2 and network_name=$3
          group by 1
          order by 1 `;
        return this.sql.getRowsBySQlQuery(sqlPerDay, [
            days,
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} weeks
     * @returns
     * @memberof MetricService
     */
    getBlocksByWeek(network_name, channel_genesis_hash, weeks) {
        const sqlPerWeek = ` with weeks as (
            select generate_series(
              date_trunc('week', now()) - '$1 week'::interval,
              date_trunc('week', now()),
              '1 week'::interval
            ) as datetime
          )
          select
            weeks.datetime,
            count(createdt)
          from weeks
          left join BLOCKS on date_trunc('week', BLOCKS.createdt) =weeks.datetime and channel_genesis_hash=$2 and network_name=$3
          group by 1
          order by 1 `;
        return this.sql.getRowsBySQlQuery(sqlPerWeek, [
            weeks,
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} months
     * @returns
     * @memberof MetricService
     */
    getBlocksByMonth(network_name, channel_genesis_hash, months) {
        const sqlPerMonth = `  with months as (
            select generate_series(
              date_trunc('month', now()) - '$1 month'::interval,
              date_trunc('month', now()),
              '1 month'::interval
            ) as datetime
          )
          select
            months.datetime,
            count(createdt)
          from months
          left join BLOCKS on date_trunc('month', BLOCKS.createdt) =months.datetime and channel_genesis_hash=$2 and network_name=$3
          group by 1
          order by 1 `;
        return this.sql.getRowsBySQlQuery(sqlPerMonth, [
            months,
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} years
     * @returns
     * @memberof MetricService
     */
    getBlocksByYear(network_name, channel_genesis_hash, years) {
        const sqlPerYear = ` with years as (
            select generate_series(
              date_trunc('year', now()) - '${years}year'::interval,
              date_trunc('year', now()),
              '1 year'::interval
            ) as year
          )
          select
            years.year,
            count(createdt)
          from years
          left join BLOCKS on date_trunc('year', BLOCKS.createdt) =years.year and channel_genesis_hash=$2 and network_name=$3
          group by 1
          order by 1 `;
        return this.sql.getRowsBySQlQuery(sqlPerYear, [
            years,
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @returns
     * @memberof MetricService
     */
    getTxByOrgs(network_name, channel_genesis_hash) {
        const sqlPerOrg = ` select count(creator_msp_id), creator_msp_id
      from transactions
      where Trim(creator_msp_id) > '' and channel_genesis_hash =$1 and network_name=$2
      group by  creator_msp_id`;
        return this.sql.getRowsBySQlQuery(sqlPerOrg, [
            channel_genesis_hash,
            network_name
        ]);
    }
    /**
     *
     *
     * @param {*} channel_genesis_hash
     * @param {*} maxHeight
     * @returns
     * @memberof MetricService
     */
    findMissingBlockNumber(network_name, channel_genesis_hash, maxHeight) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `SELECT s.id AS missing_id
    FROM generate_series(0, $1) s(id) WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE blocknum = s.id and channel_genesis_hash=$2 and network_name=$3 )`;
            return this.sql.getRowsBySQlQuery(sqlQuery, [
                maxHeight,
                channel_genesis_hash,
                network_name
            ]);
        });
    }
}
exports.MetricService = MetricService;
//# sourceMappingURL=MetricService.js.map