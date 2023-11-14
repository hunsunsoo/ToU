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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForkListenerHandler = void 0;
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
/**
 *
 *
 * @class ForkListenerHandler
 */
class ForkListenerHandler {
    /**
     * Creates an instance of ForkListenerHandler.
     * @param {*} platform
     * @memberof ForkListenerHandler
     */
    constructor(platform) {
        this.platform = platform;
        this.syncProcessor = null;
    }
    /**
     *
     *
     * @param {*} args
     * @memberof ForkListenerHandler
     */
    initialize(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.syncProcessor = (0, child_process_1.fork)(path_1.default.resolve(__dirname, '../../sync.js'), args, {
                env: Object.assign(Object.assign({}, process.env), { 
                    // Mark forked process explicitly for logging using TCP server
                    FORK: '1' })
            });
            this.syncProcessor.on('message', msg => {
                this.platform.getProxy().processSyncMessage(msg);
            });
        });
    }
    /**
     *
     * @param {*} message
     */
    send(message) {
        this.syncProcessor.send({
            message
        });
    }
    /**
     *
     *
     * @memberof ForkListenerHandler
     */
    close() {
        if (this.syncProcessor) {
            this.syncProcessor.kill('SIGINT');
        }
    }
}
exports.ForkListenerHandler = ForkListenerHandler;
//# sourceMappingURL=ForkListenerHandler.js.map