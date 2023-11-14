"use strict";
/*
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheckMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const explorerconfig_json_1 = __importDefault(require("../explorerconfig.json"));
/**
 *  The Auth Checker middleware function.
 */
const authCheckMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }
    // Get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];
    // Decode the token using a secret key-phrase
    return jwt.verify(token, explorerconfig_json_1.default.jwt.secret, (err, decoded) => {
        // The 401 code is for unauthorized status
        if (err) {
            return res.status(401).end();
        }
        const requestUserId = decoded.user;
        req.requestUserId = requestUserId;
        req.network = decoded.network;
        // TODO: check if a user exists, otherwise error
        return next();
    });
};
exports.authCheckMiddleware = authCheckMiddleware;
//# sourceMappingURL=auth-check.js.map