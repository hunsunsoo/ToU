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
exports.SyncBuilder = void 0;
/*
 *SPDX-License-Identifier: Apache-2.0
 */
const ExplorerConst_1 = require("../common/ExplorerConst");
const ExplorerMessage_1 = require("../common/ExplorerMessage");
const ExplorerError_1 = require("../common/ExplorerError");
const SyncPlatform_1 = require("../platform/fabric/sync/SyncPlatform");
/**
 *
 *
 * @class SyncBuilder
 */
class SyncBuilder {
    /**
     *
     *
     * @static
     * @param {*} pltfrm
     * @param {*} persistence
     * @param {*} sender
     * @returns
     * @memberof SyncBuilder
     */
    static build(pltfrm, persistence, sender) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pltfrm === ExplorerConst_1.explorerConst.PLATFORM_FABRIC) {
                const platform = new SyncPlatform_1.SyncPlatform(persistence, sender);
                return platform;
            }
            throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_1005, pltfrm);
        });
    }
}
exports.SyncBuilder = SyncBuilder;
//# sourceMappingURL=SyncBuilder.js.map