"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
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
exports.ExplorerSender = void 0;
const ExplorerConst_1 = require("../../common/ExplorerConst");
const ForkSenderHandler_1 = require("./ForkSenderHandler");
/**
 *
 *
 * @class ExplorerSender
 */
class ExplorerSender {
    /**
     * Creates an instance of ExplorerSender.
     * @param {*} syncconfig
     * @memberof ExplorerSender
     */
    constructor(syncconfig) {
        this.syncType = syncconfig.type;
        this.syncSenderHandler = null;
    }
    /**
     *
     *
     * @memberof ExplorerSender
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.syncType && this.syncType === ExplorerConst_1.explorerConst.SYNC_TYPE_LOCAL) {
                this.syncSenderHandler = new ForkSenderHandler_1.ForkSenderHandler();
            }
            if (this.syncSenderHandler) {
                this.syncSenderHandler.initialize();
            }
        });
    }
    /**
     *
     *
     * @param {*} message
     * @memberof ExplorerSender
     */
    send(message) {
        if (this.syncSenderHandler) {
            this.syncSenderHandler.send(message);
        }
    }
}
exports.ExplorerSender = ExplorerSender;
//# sourceMappingURL=ExplorerSender.js.map