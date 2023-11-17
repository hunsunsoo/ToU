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
exports.SyncPlatform = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const helper_1 = require("../../../common/helper");
const MetricService_1 = require("../../../persistence/fabric/MetricService");
const CRUDService_1 = require("../../../persistence/fabric/CRUDService");
const SyncService_1 = require("../sync/SyncService");
const FabricEvent_1 = require("./FabricEvent");
const FabricConfig_1 = require("../FabricConfig");
const ExplorerError_1 = require("../../../common/ExplorerError");
const ExplorerMessage_1 = require("../../../common/ExplorerMessage");
const FabricConst = __importStar(require("../utils/FabricConst"));
const FabricUtils = __importStar(require("../utils/FabricUtils"));
const logger = helper_1.helper.getLogger('SyncPlatform');
const fabric_const = FabricConst.fabric.const;
const config_path = path.resolve(__dirname, '../config.json');
/**
 *
 *
 * @class SyncPlatform
 */
class SyncPlatform {
    /**
     * Creates an instance of SyncPlatform.
     * @param {*} persistence
     * @param {*} sender
     * @memberof SyncPlatform
     */
    constructor(persistence, sender) {
        this.network_id = null;
        this.network_name = null;
        this.client = null;
        this.eventHub = null;
        this.sender = sender;
        this.persistence = persistence;
        this.syncService = new SyncService_1.SyncServices(this, this.persistence);
        this.blocksSyncTime = 60000;
        this.network_config = null;
    }
    /**
     *
     *
     * @param {*} args
     * @returns
     * @memberof SyncPlatform
     */
    initialize(args) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug('******* Initialization started for child client process ******', args);
            // Loading the config.json
            const all_config = JSON.parse(fs.readFileSync(config_path, 'utf8'));
            const network_configs = all_config[fabric_const.NETWORK_CONFIGS];
            if (args.length === 0) {
                // Get the first network and first client
                this.network_id = Object.keys(network_configs)[0];
                this.network_name = network_configs[this.network_id].name;
            }
            else if (args.length === 1) {
                // Get the first client with respect to the passed network name
                this.network_id = args[0];
                this.network_name = Object.keys(network_configs[this.network_id].clients)[0];
            }
            else {
                this.network_id = args[0];
                this.network_name = args[1];
            }
            logger.info(ExplorerMessage_1.explorerError.MESSAGE_1002, this.network_id, this.network_name);
            logger.debug('Blocks synch interval time >> %s', this.blocksSyncTime);
            this.network_config = network_configs[this.network_id];
            const config = new FabricConfig_1.FabricConfig();
            config.initialize(this.network_id, this.network_config);
            this.client = yield FabricUtils.createFabricClient(config);
            if (!this.client) {
                throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_2011);
            }
            // Updating the client network and other details to DB
            yield (function updateNetworkConfig(sync) {
                return __awaiter(this, void 0, void 0, function* () {
                    logger.info('Updating the client network and other details to DB');
                    const res = yield sync.syncService.synchNetworkConfigToDB(sync.client);
                    if (!res) {
                        logger.error('Failed to update network config to DB');
                    }
                    setTimeout(updateNetworkConfig, 30000, sync);
                });
            })(this);
            // Start event
            this.eventHub = new FabricEvent_1.FabricEvent(this.client, this.syncService);
            yield this.eventHub.initialize();
            /*
             * Setting interval for validating any missing block from the current client ledger
             * Set blocksSyncTime property in platform config.json in minutes
             */
            // During initial sync-up phase, disable discovery request
            (function validateMissingBlocks(sync, noDiscovery) {
                sync.isChannelEventHubConnected(noDiscovery);
                setTimeout(validateMissingBlocks, sync.blocksSyncTime, sync, false);
            })(this, true);
            logger.debug('******* Initialization end for child client process %s ******', this.network_id);
        });
    }
    /**
     *
     *
     * @memberof SyncPlatform
     */
    isChannelEventHubConnected(noDiscovery) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const channel_name of this.client.getChannels()) {
                // Validate channel event is connected
                const status = this.eventHub.isChannelEventHubConnected(channel_name);
                if (status) {
                    yield this.syncService.syncBlocks(this.client, channel_name, noDiscovery);
                }
                else {
                    // Channel client is not connected then it will reconnect
                    this.eventHub.connectChannelEventHub(channel_name);
                }
            }
        });
    }
    setBlocksSyncTime(blocksSyncTime) {
        if (!isNaN(blocksSyncTime)) {
            this.blocksSyncTime = blocksSyncTime * 1000;
        }
    }
    /**
     *
     *
     * @memberof SyncPlatform
     */
    setPersistenceService() {
        // Setting platform specific CRUDService and MetricService
        this.persistence.setMetricService(new MetricService_1.MetricService(this.persistence.getPGService()));
        this.persistence.setCrudService(new CRUDService_1.CRUDService(this.persistence.getPGService()));
    }
    /**
     *
     *
     * @param {*} notify
     * @memberof SyncPlatform
     */
    send(notify) {
        if (this.sender) {
            this.sender.send(notify);
        }
    }
    /**
     *
     *
     * @memberof SyncPlatform
     */
    destroy() {
        if (this.eventHub) {
            this.eventHub.disconnectEventHubs();
        }
    }
}
exports.SyncPlatform = SyncPlatform;
//# sourceMappingURL=SyncPlatform.js.map