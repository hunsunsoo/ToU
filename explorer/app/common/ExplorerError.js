"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplorerError = void 0;
const util_1 = __importDefault(require("util"));
/**
 *
 * @param {*} args {
 * %s - String.
 * %d - Number (both integer and float).
 * %j - JSON.
 * %% - single percent sign ('%'). This does not consume an argument.
 * }
 */
function ExplorerError(...args) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = util_1.default.format(args);
}
exports.ExplorerError = ExplorerError;
//# sourceMappingURL=ExplorerError.js.map