"use strict";
/**
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
exports.Platform = void 0;
const path = __importStar(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const helper_1 = require("../../common/helper");
const User_1 = require("./models/User");
const MetricService_1 = require("../../persistence/fabric/MetricService");
const CRUDService_1 = require("../../persistence/fabric/CRUDService");
const UserDataService_1 = require("../../persistence/fabric/UserDataService");
const Proxy_1 = require("./Proxy");
const ExplorerError_1 = require("../../common/ExplorerError");
const ExplorerListener_1 = require("../../sync/listener/ExplorerListener");
const ExplorerMessage_1 = require("../../common/ExplorerMessage");
const FabricConfig_1 = require("./FabricConfig");
const UserService_1 = require("./service/UserService");
const FabricUtils = __importStar(require("./utils/FabricUtils"));
const FabricConst = __importStar(require("./utils/FabricConst"));
const logger = helper_1.helper.getLogger('Platform');
const fabric_const = FabricConst.fabric.const;
const config_path = path.resolve(__dirname, './config.json');
/**
 *
 *
 * @class Platform
 */
class Platform {
    /**
     * Creates an instance of Platform.
     * @param {*} persistence
     * @param {*} broadcaster
     * @memberof Platform
     */
    constructor(persistence, broadcaster) {
        this.persistence = persistence;
        this.broadcaster = broadcaster;
        this.networks = new Map();
        this.userService = null;
        this.proxy = null;
        this.defaultNetwork = null;
        this.network_configs = null;
        this.syncType = null;
        this.explorerListeners = [];
    }
    /**
     *
     *
     * @memberof Platform
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            /* eslint-disable */
            const _self = this;
            /* eslint-enable */
            // Loading the config.json
            const all_config = JSON.parse(fs_extra_1.default.readFileSync(config_path, 'utf8'));
            const network_configs = all_config[fabric_const.NETWORK_CONFIGS];
            this.syncType = all_config.syncType;
            this.userService = new UserService_1.UserService(this);
            this.proxy = new Proxy_1.Proxy(this, this.userService);
            // Build client context
            logger.debug('******* Initialization started for hyperledger fabric platform ******');
            logger.debug('******* Initialization started for hyperledger fabric platform ******,', network_configs);
            yield this.buildClients(network_configs);
            if (this.networks.size === 0) {
                logger.error('************* There is no client found for Hyperledger fabric platform *************');
                throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_2008);
            }
        });
    }
    /**
     *
     *
     * @param {*} network_configs
     * @memberof Platform
     */
    buildClients(network_configs) {
        return __awaiter(this, void 0, void 0, function* () {
            /* eslint-disable */
            const _self = this;
            /* eslint-enable */
            // Setting organization enrolment files
            logger.debug('Setting admin organization enrolment files');
            this.network_configs = network_configs;
            for (const network_id in this.network_configs) {
                const network_config = this.network_configs[network_id];
                if (!this.defaultNetwork) {
                    this.defaultNetwork = network_id;
                }
                /*
                 * Create fabric explorer client for each
                 * Each client is connected to only a single peer and monitor that particular peer only
                 */
                logger.info(' network_config.id ', network_id, ' network_config.profile ', network_config.profile);
                // Create client instance
                logger.debug('Creating network client [%s] >> ', network_id, network_config);
                const config = new FabricConfig_1.FabricConfig();
                config.initialize(network_id, network_config);
                const signupResult = yield this.registerAdmin(config);
                if (!signupResult) {
                    logger.error(`Failed to register admin user : ${network_id}`);
                    continue;
                }
                const client = yield FabricUtils.createFabricClient(config, this.persistence);
                if (client) {
                    // Set client into clients map
                    const clientObj = { name: network_config.name, instance: client };
                    this.networks.set(network_id, clientObj);
                }
                //  }
            }
        });
    }
    registerAdmin(config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!config.getEnableAuthentication()) {
                logger.info('Disabled authentication');
                return true;
            }
            const user = config.getAdminUser();
            const password = config.getAdminPassword();
            if (!user || !password) {
                logger.error('Invalid credentials');
                return false;
            }
            const network_id = config.getNetworkId();
            const reqUser = yield User_1.User.createInstanceWithParam(user, password, network_id, 'admin').asJson();
            if (yield this.userService.isExist(user, network_id)) {
                logger.info('Already registered : admin');
                return true;
            }
            const resp = yield this.userService.register(reqUser);
            if (resp.status !== 200) {
                logger.error('Failed to register admin user: ', resp.message);
                return false;
            }
            return true;
        });
    }
    /**
     *
     *
     * @param {*} syncconfig
     * @memberof Platform
     */
    initializeListener(syncconfig) {
        /* eslint-disable */
        for (const [network_id, clientObj] of this.networks.entries()) {
            const network_name = clientObj.name;
            const network_client = clientObj.instance;
            logger.info('initializeListener, network_id, network_client ', network_id, network_client.getNetworkConfig());
            if (network_client.getStatus()) {
                const explorerListener = new ExplorerListener_1.ExplorerListener(this, syncconfig);
                explorerListener.initialize([network_id, network_name, '1']);
                explorerListener.send('Successfully send a message to child process');
                this.explorerListeners.push(explorerListener);
            }
        }
        /* eslint-enable */
    }
    /**
     *
     *
     * @memberof Platform
     */
    setPersistenceService() {
        // Setting platform specific CRUDService and MetricService
        this.persistence.setMetricService(new MetricService_1.MetricService(this.persistence.getPGService()));
        this.persistence.setCrudService(new CRUDService_1.CRUDService(this.persistence.getPGService()));
        this.persistence.setUserDataService(new UserDataService_1.UserDataService(this.persistence.getPGService()));
    }
    /**
     *
     *
     * @returns
     * @memberof Platform
     */
    getNetworks() {
        return this.networks;
    }
    /**
     *
     *
     * @param {*} network_id
     * @returns
     * @memberof Platform
     */
    getClient(network_id) {
        logger.info(`getClient (id:${network_id})`);
        const clientObj = this.networks.get(network_id || this.defaultNetwork);
        return clientObj.instance;
    }
    /**
     *
     *
     * @returns
     * @memberof Platform
     */
    getPersistence() {
        return this.persistence;
    }
    /**
     *
     *
     * @returns
     * @memberof Platform
     */
    getBroadcaster() {
        return this.broadcaster;
    }
    /**
     *
     *
     * @returns
     * @memberof Platform
     */
    getProxy() {
        return this.proxy;
    }
    /**
     *
     *
     * @memberof Platform
     */
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('<<<<<<<<<<<<<<<<<<<<<<<<<< Closing explorer  >>>>>>>>>>>>>>>>>>>>>');
            for (const explorerListener of this.explorerListeners) {
                explorerListener.close();
            }
        });
    }
}
exports.Platform = Platform;
//# sourceMappingURL=Platform.js.map