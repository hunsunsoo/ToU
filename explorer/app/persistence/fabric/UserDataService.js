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
exports.UserDataService = void 0;
/**
 *
 *
 * @class UserDataService
 */
class UserDataService {
    /**
     * Creates an instance of UserDataService.
     * @param {*} sql
     * @memberof UserDataService
     */
    constructor(sql) {
        this.sql = sql;
    }
    /**
     *
     *
     * @param {*} attributes
     * @param {*} options
     * @memberof UserDataService
     */
    initialize(attributes, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userModel = this.sql.getUserModel(attributes, options);
        });
    }
    /**
     *
     *
     * @param {string} username
     * @param {string} networkName
     * @returns {*} User model
     * @memberof UserDataService
     */
    findUser(username, networkName) {
        return this.userModel.findOne({
            where: {
                username,
                networkName
            }
        });
    }
    /**
     *
     *
     * @param {User} newUserObj
     * @returns {Promise} Promise of User model
     * @memberof UserDataService
     */
    registerUser(newUserObj) {
        return this.userModel.create(newUserObj);
    }
    /**
     *
     *
     * @param {User} username
     * @param {User} networkName
     * @returns {Promise} Promise of the number of destroyed users
     * @memberof UserDataService
     */
    unregisterUser(username, networkName) {
        const unregisterUser = {
            where: {
                username,
                networkName
            }
        };
        return this.userModel.destroy(unregisterUser);
    }
    /**
     *
     *
     * @param {User} networkName
     * @returns {Promise} Promise of the list of users belonging to specified network
     * @memberof UserDataService
     */
    getUserlist(networkName) {
        return this.userModel
            .findAll({
            where: {
                networkName
            }
        })
            .then((users) => {
            return users.map((user) => ({
                username: user.username,
                email: user.email,
                networkName: user.networkName,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles
            }));
        });
    }
}
exports.UserDataService = UserDataService;
//# sourceMappingURL=UserDataService.js.map