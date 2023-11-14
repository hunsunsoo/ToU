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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authroutes = void 0;
/**
 *    SPDX-License-Identifier: Apache-2.0
 */
const passport_1 = __importDefault(require("passport"));
const helper_1 = require("../common/helper");
const requestutils_1 = require("./requestutils");
const logger = helper_1.helper.getLogger('Auth');
/**
 *
 *
 * @param {*} router
 * @param {*} platform
 */
function authroutes(router, platform) {
    return __awaiter(this, void 0, void 0, function* () {
        const proxy = platform.getProxy();
        /**
         * *
         * Network list
         * GET /networklist -> /login
         * curl -i 'http://<host>:<port>/networklist'
         */
        router.get('/networklist', (0, requestutils_1.responder)((req) => __awaiter(this, void 0, void 0, function* () {
            const networkList = yield proxy.networkList(req);
            return { networkList };
        })));
        /**
         * *
         * Login
         * POST /login -> /login
         * curl -X POST -H 'Content-Type: application/json' -d '{ 'user': '<user>', 'password': '<password>', 'network': '<network>' }' -i 'http://<host>:<port>/login'
         */
        router.post('/login', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            logger.debug('req.body', req.body);
            return passport_1.default.authenticate('local-login', (err, token, userData) => {
                if (!token) {
                    return res.status(400).json({
                        success: false,
                        message: userData.message
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'You have successfully logged in!',
                    token,
                    user: userData
                });
            })(req, res, next);
        }));
        router.post('/logout', (req, res) => __awaiter(this, void 0, void 0, function* () {
            logger.debug('req.body', req.body);
            req.logout();
            res.send();
        }));
    });
}
exports.authroutes = authroutes;
//# sourceMappingURL=authroutes.js.map