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
exports.ExplorerListener = void 0;
/*
 * SPDX-License-Identifier: Apache-2.0
 */
const ExplorerConst_1 = require("../../common/ExplorerConst");
const ForkListenerHandler_1 = require("./ForkListenerHandler");
/**
 *
 *
 * @class ExplorerListener
 */
class ExplorerListener {
    /**
     * Creates an instance of ExplorerListener.
     * @param {*} platform
     * @param {*} syncconfig
     * @memberof ExplorerListener
     */
    constructor(platform, syncconfig) {
        this.platform = platform;
        this.syncType = syncconfig.type;
        this.syncListenerHandler = null;
    }
    /**
     *
     *
     * @param {*} args
     * @memberof ExplorerListener
     */
    initialize(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.syncType && this.syncType === ExplorerConst_1.explorerConst.SYNC_TYPE_LOCAL) {
                this.syncListenerHandler = new ForkListenerHandler_1.ForkListenerHandler(this.platform);
            }
            if (this.syncListenerHandler) {
                this.syncListenerHandler.initialize(args);
            }
        });
    }
    /**
     *
     *
     * @param {*} message
     * @memberof ExplorerListener
     */
    send(message) {
        if (this.syncListenerHandler) {
            this.syncListenerHandler.send({
                message
            });
        }
    }
    /**
     *
     */
    close() {
        if (this.syncListenerHandler) {
            this.syncListenerHandler.close();
        }
    }
}
exports.ExplorerListener = ExplorerListener;
//# sourceMappingURL=ExplorerListener.js.map