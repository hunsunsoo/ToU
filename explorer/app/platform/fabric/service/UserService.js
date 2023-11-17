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
exports.UserService = void 0;
/* eslint-disable quotes */
/* eslint-disable no-extra-parens */
const bcrypt = __importStar(require("bcrypt"));
const helper_1 = require("../../../common/helper");
const UserMeta = __importStar(require("../../../model/User"));
const logger = helper_1.helper.getLogger('UserService');
/**
 *
 *
 * @class UserService
 */
class UserService {
    /**
     *Creates an instance of UserService.
     * @param {*} platform
     * @memberof UserService
     */
    constructor(platform) {
        this.platform = platform;
        this.userDataService = platform.getPersistence().getUserDataService();
        this.userDataService.initialize(UserMeta.attributes, UserMeta.options);
    }
    /**
     *
     *
     * @param {*} user
     * @returns
     * @memberof UserService
     */
    authenticate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let enableAuth = false;
            if (!user.user || !user.password || !user.network) {
                logger.error('Invalid parameters');
                return false;
            }
            logger.info('user.network ', user.network);
            const clientObj = this.platform.getNetworks().get(user.network);
            if (!clientObj) {
                logger.error(`Failed to get client object for ${user.network}`);
                return false;
            }
            const client = clientObj.instance;
            const fabricConfig = client.fabricGateway.fabricConfig;
            enableAuth = fabricConfig.getEnableAuthentication();
            // Skip authentication, if set to false in connection profile, key: enableAuthentication
            if (!enableAuth) {
                logger.info('Skip authentication');
                return true;
            }
            logger.info(`Network: ${user.network} enableAuthentication ${enableAuth}`);
            return this.userDataService
                .findUser(user.user, user.network)
                .then(userEntry => {
                if (userEntry == null) {
                    logger.error(`Incorrect credential : ${user.user} in ${user.network}`);
                    return false;
                }
                const hashedPassword = bcrypt.hashSync(user.password, userEntry.salt);
                if (userEntry.password === hashedPassword) {
                    return true;
                }
                logger.error(`Incorrect credential : ${user.user} in ${user.network}`);
                return false;
            });
        });
    }
    /**
     *
     *
     * @param {User} userObj
     * @returns
     * @memberof UserService
     */
    getAdminUser(userObj) {
        const clientObj = this.platform.getNetworks().get(userObj.network);
        if (!clientObj) {
            throw new Error(`Failed to get client object for ${userObj.network}`);
        }
        const client = clientObj.instance;
        const fabricConfig = client.fabricGateway.fabricConfig;
        return fabricConfig.getAdminUser();
    }
    /**
     *
     *
     * @param {User} userObj
     * @returns {boolean} Return true if specified user has admin privilege
     * @memberof UserService
     */
    isAdminRole(userObj) {
        if (!userObj.requestUserId) {
            // That means it's requested internally
            return true;
        }
        logger.info('isAdminRole:', userObj);
        return this.userDataService
            .findUser(userObj.requestUserId, userObj.network)
            .then(userEntry => {
            if (userEntry === null) {
                throw new Error(`User who requests doesn't exist : ${userObj.requestUserId}`);
            }
            return userEntry.roles === 'admin';
        });
    }
    /**
     *
     *
     * @param {*} user
     * @returns
     * @memberof UserService
     */
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!user.user || !user.password || !user.network) {
                    throw new Error('Invalid parameters');
                }
                if (!(yield this.isAdminRole(user))) {
                    throw new Error("Permission error : can't register user");
                }
                yield this.userDataService
                    .findUser(user.user, user.network)
                    .then((userEntry) => __awaiter(this, void 0, void 0, function* () {
                    if (userEntry != null) {
                        throw new Error('already exists');
                    }
                    const salt = bcrypt.genSaltSync(10);
                    const hashedPassword = bcrypt.hashSync(user.password, salt);
                    const newUser = {
                        username: user.user,
                        salt: salt,
                        password: hashedPassword,
                        networkName: user.network,
                        firstName: user.firstname,
                        lastName: user.lastname,
                        email: user.email ? user.email : null,
                        roles: user.roles
                    };
                    yield this.userDataService
                        .registerUser(newUser)
                        .then(() => {
                        return true;
                    })
                        .catch(error => {
                        throw new Error(`Failed to register user : ${user.user} : ${error}`);
                    });
                }));
            }
            catch (error) {
                return {
                    status: 400,
                    message: error.toString()
                };
            }
            return {
                status: 200
            };
        });
    }
    /**
     *
     *
     * @param {*} user
     * @returns
     * @memberof UserService
     */
    unregister(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!user.user || !user.network) {
                    throw new Error('Invalid parameters');
                }
                if (!(yield this.isAdminRole(user))) {
                    throw new Error("Permission error : can't unregister user");
                }
                if (user.user === user.requestUserId) {
                    throw new Error("Permission error : can't unregister by yourself");
                }
                if (user.user === this.getAdminUser(user)) {
                    throw new Error("Permission error : can't unregister root admin user");
                }
                yield this.userDataService
                    .findUser(user.user, user.network)
                    .then((userEntry) => __awaiter(this, void 0, void 0, function* () {
                    if (userEntry == null) {
                        throw new Error(`${user.user} does not exists`);
                    }
                    yield this.userDataService
                        .unregisterUser(user.user, user.network)
                        .then(() => {
                        return true;
                    })
                        .catch(error => {
                        throw new Error(`Failed to unRegister user : ${user.user} : ${error}`);
                    });
                }));
            }
            catch (error) {
                return {
                    status: 400,
                    message: error.toString()
                };
            }
            return {
                status: 200,
                message: 'Unregistered successfully!'
            };
        });
    }
    /**
     *
     *
     * @param {*} user
     * @returns {Object} Object including status and array of user entry
     * @memberof UserService
     */
    userlist(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let userList = [];
            try {
                userList = yield this.userDataService.getUserlist(user.network);
            }
            catch (error) {
                return {
                    status: 400,
                    message: error.toString()
                };
            }
            return {
                status: 200,
                message: userList
            };
        });
    }
    /**
     *
     *
     * @param {string} user
     * @param {string} network
     * @returns {boolean} Return true if specified user has already existed in the specified network
     * @memberof UserService
     */
    isExist(user, network) {
        return this.userDataService.findUser(user, network).then(userEntry => {
            if (userEntry !== null) {
                return true;
            }
            return false;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map