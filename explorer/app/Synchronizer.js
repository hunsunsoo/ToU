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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Synchronizer = void 0;
/*
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable import/extensions */
const helper_1 = require("./common/helper");
const ExplorerConst_1 = require("./common/ExplorerConst");
const ExplorerMessage_1 = require("./common/ExplorerMessage");
const ExplorerError_1 = require("./common/ExplorerError");
const explorerconfig_json_1 = __importDefault(require("./explorerconfig.json"));
const SyncBuilder_1 = require("./sync/SyncBuilder");
const PersistenceFactory_1 = require("./persistence/PersistenceFactory");
const ExplorerSender_1 = require("./sync/sender/ExplorerSender");
/* eslint-enable import/extensions */
const logger = helper_1.helper.getLogger('Synchronizer');
/**
 *
 *
 * @class Synchronizer
 */
class Synchronizer {
    /**
     * Creates an instance of Synchronizer.
     * @param {*} args
     * @memberof Synchronizer
     */
    constructor(args) {
        this.args = args;
        this.persistence = null;
        this.platform = null;
    }
    /**
     *
     *
     * @memberof Synchronizer
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!explorerconfig_json_1.default[ExplorerConst_1.explorerConst.PERSISTENCE]) {
                throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_1001);
            }
            if (!explorerconfig_json_1.default[explorerconfig_json_1.default[ExplorerConst_1.explorerConst.PERSISTENCE]]) {
                throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_1002, explorerconfig_json_1.default[ExplorerConst_1.explorerConst.PERSISTENCE]);
            }
            let pltfrm;
            if (explorerconfig_json_1.default && explorerconfig_json_1.default.sync && explorerconfig_json_1.default.sync.platform) {
                pltfrm = explorerconfig_json_1.default.sync.platform;
            }
            else {
                throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_1006);
            }
            this.persistence = yield PersistenceFactory_1.PersistenceFactory.create(explorerconfig_json_1.default[ExplorerConst_1.explorerConst.PERSISTENCE], explorerconfig_json_1.default[explorerconfig_json_1.default[ExplorerConst_1.explorerConst.PERSISTENCE]]);
            const sender = new ExplorerSender_1.ExplorerSender(explorerconfig_json_1.default.sync);
            sender.initialize();
            logger.debug(' Synchronizer initialized');
            this.platform = yield SyncBuilder_1.SyncBuilder.build(pltfrm, this.persistence, sender);
            this.platform.setPersistenceService();
            // For overriding sync interval(min) via environment variable(sec)
            const syncIntervalSec = process.env.EXPLORER_SYNC_BLOCKSYNCTIME_SEC
                ? parseInt(process.env.EXPLORER_SYNC_BLOCKSYNCTIME_SEC, 10)
                : parseInt(explorerconfig_json_1.default.sync.blocksSyncTime, 10) * 60;
            this.platform.setBlocksSyncTime(syncIntervalSec);
            logger.info('initialize :', syncIntervalSec);
            yield this.platform.initialize(this.args);
        });
    }
    /**
     *
     *
     * @memberof Synchronizer
     */
    close() {
        if (this.persistence) {
            this.persistence.closeconnection();
        }
        if (this.platform) {
            this.platform.destroy();
        }
    }
}
exports.Synchronizer = Synchronizer;
//# sourceMappingURL=Synchronizer.js.map