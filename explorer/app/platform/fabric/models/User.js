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
exports.User = void 0;
const helper_1 = require("../../../common/helper");
const logger = helper_1.helper.getLogger('User');
/**
 *
 *
 * @class User
 */
class User {
    /**
     * Creates an instance of User.
     * @param {*} user
     * @memberof User
     */
    constructor(user) {
        // Put the user request in user object
        this.userJson = {};
        logger.debug(`User : ${user.user}`);
        Object.keys(user).forEach(key => {
            const value = user[key];
            this.userJson[key] = value;
        });
    }
    /**
     *
     * Create and return the User object by specifying minimum parameters
     * @param {string} user
     * @param {string} password
     * @param {string} network
     * @param {string} roles
     * @returns {User} Newly defined User object
     * @memberof User
     */
    static createInstanceWithParam(user, password, network, roles) {
        return new User({
            user,
            password,
            network,
            roles
        });
    }
    /**
     *
     *
     * @returns
     * @memberof User
     */
    asJson() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userJson;
        });
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map