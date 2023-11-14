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
exports.ForkSenderHandler = void 0;
const helper_1 = require("../../common/helper");
const logger = helper_1.helper.getLogger('ForkSenderHandler');
/**
 *
 *
 * @class ForkSenderHandler
 */
class ForkSenderHandler {
    /**
     * Creates an instance of ForkSenderHandler.
     * @memberof ForkSenderHandler
     */
    /*eslint-disable */
    constructor() { }
    /* eslint-enable */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            process.on('message', msg => {
                logger.debug('Message from parent: %j', msg);
            });
        });
    }
    /**
     *
     *
     * @param {*} message
     * @memberof ForkSenderHandler
     */
    send(message) {
        if (process.send) {
            process.send(message);
        }
    }
    /**
     *
     *
     * @memberof ForkSenderHandler
     */
    close() {
        // TODO
    }
}
exports.ForkSenderHandler = ForkSenderHandler;
//# sourceMappingURL=ForkSenderHandler.js.map