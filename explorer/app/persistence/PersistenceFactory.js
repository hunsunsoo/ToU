"use strict";
/*
 *SPDX-License-Identifier: Apache-2.0
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
exports.PersistenceFactory = void 0;
const ExplorerConst_1 = require("../common/ExplorerConst");
const ExplorerMessage_1 = require("../common/ExplorerMessage");
const ExplorerError_1 = require("../common/ExplorerError");
const Persist_1 = require("./postgreSQL/Persist");
/**
 *
 *
 * @class PersistenceFactory
 */
class PersistenceFactory {
    /**
     *
     *
     * @static
     * @param {*} db
     * @param {*} dbconfig
     * @returns
     * @memberof PersistenceFactory
     */
    static create(db, dbconfig) {
        return __awaiter(this, void 0, void 0, function* () {
            if (db === ExplorerConst_1.explorerConst.PERSISTENCE_POSTGRESQL) {
                // Avoid to load all db Persist module
                const persistence = new Persist_1.Persist(dbconfig);
                yield persistence.getPGService().handleDisconnect();
                return persistence;
            }
            throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_1003, db);
        });
    }
}
exports.PersistenceFactory = PersistenceFactory;
//# sourceMappingURL=PersistenceFactory.js.map