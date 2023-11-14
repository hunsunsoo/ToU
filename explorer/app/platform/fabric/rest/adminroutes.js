"use strict";
/**
 *    SPDX-License-Identifier: Apache-2.0
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
exports.adminroutes = void 0;
const User_1 = require("../models/User");
const requestutils_1 = require("../../../rest/requestutils");
/**
 *
 *
 * @param {*} router
 * @param {*} platform
 */
function adminroutes(router, platform) {
    return __awaiter(this, void 0, void 0, function* () {
        const proxy = platform.getProxy();
        /*
         * Register
         * curl 'http://<host>:<port>/api/register'  -H 'Accept: application/json'
         * -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.8iTytz6wkPMVJzgD3jIGTQ2s2UZLO8nzvJQJGR0rs_0'
         * -H 'Content-Type: application/json'
         * --data-binary '{ "user": "user@gmail.com", "password": "adminpw", "affiliation": "department1", "roles": "client" }' --compressed
         *
         * "affiliation": "department1" see fabric-ca server configuration, https://hyperledger-fabric-ca.readthedocs.io/en/latest/serverconfig.html
         */
        router.post('/register', (0, requestutils_1.responder)((req) => __awaiter(this, void 0, void 0, function* () {
            const reqUser = yield new User_1.User(req.body).asJson();
            reqUser.network = req.network;
            reqUser.requestUserId = req.requestUserId;
            return yield proxy.register(reqUser);
        })));
        /*
         * Userlist
         * curl 'http://<host>:<port>/api/userlist' -H 'Accept: application/json' \
         * -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.8iTytz6wkPMVJzgD3jIGTQ2s2UZLO8nzvJQJGR0rs_0'
         *
         */
        router.get('/userlist', (0, requestutils_1.responder)((req) => __awaiter(this, void 0, void 0, function* () {
            return yield proxy.userlist({ network: req.network });
        })));
        /*
         * UnRegister
         * curl 'http://<host>:<port>/api/unregister' -H 'Accept: application/json
         * -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.8iTytz6wkPMVJzgD3jIGTQ2s2UZLO8nzvJQJGR0rs_0'
         * -H 'Content-Type: application/json'
         * --data-binary { "user": "user1" } --compressed
         *
         */
        router.post('/unregister', (0, requestutils_1.responder)((req) => __awaiter(this, void 0, void 0, function* () {
            const reqUser = yield new User_1.User(req.body).asJson();
            reqUser.network = req.network;
            reqUser.requestUserId = req.requestUserId;
            return yield proxy.unregister(reqUser);
        })));
    });
}
exports.adminroutes = adminroutes;
//# sourceMappingURL=adminroutes.js.map