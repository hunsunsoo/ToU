"use strict";
/*
 * SPDX-License-Identifier= Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorerError = void 0;
/**
 * Generic, and Fabric Error messages
 */
/* eslint-disable no-shadow */
var explorerError;
(function (explorerError) {
    explorerError["ERROR_1001"] = "Missing persistence type property [persistence] in explorerconfig.json";
    explorerError["ERROR_1002"] = "Missing database configuration property [%s] in explorerconfig.json";
    explorerError["ERROR_1003"] = "Persistence implementation is not found for %s";
    explorerError["ERROR_1004"] = "Platform implementation is not found for %s";
    explorerError["ERROR_1005"] = "Platform implementation is not found for synch process %s";
    explorerError["ERROR_1006"] = "Platform type is not found in syncconfig or argument";
    explorerError["ERROR_1007"] = "Missing network_name and client_name , Please run as > sync.js network_name client_name";
    explorerError["ERROR_1008"] = "Sync type is set as [local] hence independent sync process cannot be started. Please change the sync type to [host] and restart explorer";
    explorerError["ERROR_1009"] = "Failed to connect client peer, please check the configuration and peer status";
    explorerError["ERROR_1010"] = "Failed to create wallet, please check the configuration, and valid file paths";
    // Fabric Error message
    explorerError["ERROR_2001"] = "Default defined channel %s is not found for the client %s peer";
    explorerError["ERROR_2002"] = "There are no orderers defined on this channel in the network configuration";
    explorerError["ERROR_2003"] = "Default client peer is down and no channel details available database";
    explorerError["ERROR_2004"] = "Default channel is not available in database";
    explorerError["ERROR_2005"] = "Default peer is not available in database";
    explorerError["ERROR_2006"] = "Default peer is not added in the client %s";
    explorerError["ERROR_2007"] = "No TLS cert information available";
    explorerError["ERROR_2008"] = "There is no client found for Hyperledger fabric platform";
    explorerError["ERROR_2009"] = "Explorer is closing due to channel name [%s] is already exist in DB";
    explorerError["ERROR_2010"] = "Client Processor Error >> %s";
    explorerError["ERROR_2011"] = "There is no client found for Hyperledger fabric scanner";
    explorerError["ERROR_2013"] = "Channel name [%s] already exist in DB , Kindly re-run the DB scripts to proceed";
    explorerError["ERROR_2014"] = "Invalid platform configuration, Please check the log";
    explorerError["ERROR_2015"] = "Invalid network configuration, Please check the log";
    // Generic Message
    explorerError["MESSAGE_1001"] = "Explorer will continue working with only DB data";
    explorerError["MESSAGE_1002"] = "Sync process is started for the network = [%s] and client = [%s]";
    // Fabric Message
})(explorerError = exports.explorerError || (exports.explorerError = {}));
//# sourceMappingURL=ExplorerMessage.js.map