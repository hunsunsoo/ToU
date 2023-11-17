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
exports.NetworkService = void 0;
const helper_1 = require("../../../common/helper");
const logger = helper_1.helper.getLogger('NetworkService');
/**
 *
 *
 * @class NetworkService
 */
class NetworkService {
    /**
     * Creates an instance of NetworkService.
     * @param {*} platform
     * @memberof NetworkService
     */
    constructor(platform) {
        this.platform = platform;
    }
    /**
     *
     *
     * @returns
     * @memberof NetworkService
     */
    networkList() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the list of the networks from the  configuration that was loaded from the config.json
            const networklist = [];
            const networks = this.platform.getNetworks();
            logger.debug('Network list ', networks);
            for (const [network_id, clientObj] of networks.entries()) {
                logger.debug('Network list ', clientObj.name);
                networklist.push({
                    id: network_id,
                    name: clientObj.name,
                    authEnabled: clientObj.instance.fabricGateway.getEnableAuthentication()
                });
            }
            logger.debug('Network list ', networklist);
            return networklist;
        });
    }
}
exports.NetworkService = NetworkService;
//# sourceMappingURL=NetworkService.js.map