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
/**
 *    SPDX-License-Identifier: Apache-2.0
 */
const helper_1 = require("./common/helper");
const ExplorerError_1 = require("./common/ExplorerError");
const Synchronizer_1 = require("./Synchronizer");
const logger = helper_1.helper.getLogger('Sync');
const args = process.argv.slice(2);
let synchronizer;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug('Start synchronizer');
        synchronizer = new Synchronizer_1.Synchronizer(args);
        yield synchronizer.initialize();
        logger.info(`Synchronizer pid is ${process.pid}`);
    });
}
start();
/*
 * This function is called when you want the server to die gracefully
 * i.e. wait for existing connections
 */
const shutDown = function () {
    logger.info('<<<<<<<<<<<<<<<<<<<<<<<<<< Closing client processor >>>>>>>>>>>>>>>>>>>>>');
    if (synchronizer) {
        synchronizer.close();
    }
    setTimeout(() => {
        process.exit(0);
        setTimeout(() => {
            logger.error('Could not close child connections in time, forcefully shutting down');
            if (synchronizer) {
                synchronizer.close();
            }
            process.exit(1);
        }, 5000);
    }, 2000);
};
process.on('unhandledRejection', (up) => {
    logger.error('<<<<<<<<<<<<<<<<<<<<<<<<<< Synchronizer Error >>>>>>>>>>>>>>>>>>>>>');
    if (up instanceof ExplorerError_1.ExplorerError) {
        logger.error('Error : ', up.message);
    }
    else {
        logger.error(up);
    }
    // prevent timeout error from calling shutdown
    if (!up.message.includes('REQUEST TIMEOUT') && !up.message.includes('ETIMEOUT')) {
        shutDown();
    }
});
process.on('uncaughtException', up => {
    logger.error('<<<<<<<<<<<<<<<<<<<<<<<<<< Synchronizer Error >>>>>>>>>>>>>>>>>>>>>');
    if (up instanceof ExplorerError_1.ExplorerError) {
        logger.error('Error : ', up.message);
    }
    else {
        logger.error(up);
    }
    shutDown();
});
// Listen for TERM signal .e.g. kill
process.on('SIGTERM', shutDown);
// Listen for INT signal e.g. Ctrl-C
process.on('SIGINT', shutDown);
//# sourceMappingURL=sync.js.map