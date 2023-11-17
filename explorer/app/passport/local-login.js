"use strict";
// @ts-check
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
exports.localLoginStrategy = void 0;
/*
 * SPDX-License-Identifier: Apache-2.0
 */
const util_1 = require("util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_local_1 = require("passport-local");
const User_1 = require("../platform/fabric/models/User");
const explorerconfig_json_1 = __importDefault(require("../explorerconfig.json"));
const jwtSignAsync = (0, util_1.promisify)(jsonwebtoken_1.default.sign);
const localLoginStrategy = function (platform) {
    const proxy = platform.getProxy();
    return new passport_local_1.Strategy({
        usernameField: 'user',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, (req, user, password, done) => __awaiter(this, void 0, void 0, function* () {
        const userData = {
            user: user.trim(),
            password: password.trim()
        };
        const reqUser = yield new User_1.User(req.body).asJson();
        const authResult = yield proxy.authenticate(reqUser);
        if (!authResult) {
            return done(null, false, { message: 'Incorrect credentials' });
        }
        const payload = {
            user: reqUser.user,
            network: reqUser.network
        };
        const token = yield jwtSignAsync(payload, explorerconfig_json_1.default.jwt.secret, {
            expiresIn: explorerconfig_json_1.default.jwt.expiresIn
        });
        const data = {
            message: 'logged in',
            name: userData.user
        };
        return done(null, token, data);
    }));
};
exports.localLoginStrategy = localLoginStrategy;
//# sourceMappingURL=local-login.js.map