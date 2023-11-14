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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Explorer = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const compression_1 = __importDefault(require("compression"));
const passport_1 = __importDefault(require("passport"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const PlatformBuilder_1 = require("./platform/PlatformBuilder");
const explorerconfig_json_1 = __importDefault(require("./explorerconfig.json"));
const PersistenceFactory_1 = require("./persistence/PersistenceFactory");
const authroutes_1 = require("./rest/authroutes");
const dbroutes_1 = require("./rest/dbroutes");
const platformroutes_1 = require("./rest/platformroutes");
const adminroutes_1 = require("./platform/fabric/rest/adminroutes");
const ExplorerConst_1 = require("./common/ExplorerConst");
const ExplorerMessage_1 = require("./common/ExplorerMessage");
const auth_check_1 = require("./middleware/auth-check");
const swagger_json_1 = __importDefault(require("./swagger.json"));
const ExplorerError_1 = require("./common/ExplorerError");
const local_login_1 = require("./passport/local-login");
/**
 *
 *
 * @class Explorer
 */
class Explorer {
    /**
     * Creates an instance of explorerConst.
     * @memberof Explorer
     */
    constructor() {
        // set up rate limiter: maximum of 1000 requests per minute
        this.app = (0, express_1.default)();
        const limiter = new express_rate_limit_1.default({
            windowMs: 1 * 60 * 1000,
            max: 1000
        });
        // apply rate limiter to all requests
        this.app.use(limiter);
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({
            extended: true
        }));
        // eslint-disable-next-line spellcheck/spell-checker
        // handle rate limit, see https://lgtm.com/rules/1506065727959/
        this.app.use(passport_1.default.initialize());
        if (process.env.NODE_ENV !== 'production') {
            this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
        }
        this.app.use((0, compression_1.default)());
        this.persistence = null;
        this.platforms = [];
    }
    /**
     *
     *
     * @returns
     * @memberof Explorer
     */
    getApp() {
        return this.app;
    }
    /**
     *
     *
     * @param {*} broadcaster
     * @memberof Explorer
     */
    initialize(broadcaster) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!explorerconfig_json_1.default[ExplorerConst_1.explorerConst.PERSISTENCE]) {
                throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_1001);
            }
            if (!explorerconfig_json_1.default[explorerconfig_json_1.default[ExplorerConst_1.explorerConst.PERSISTENCE]]) {
                throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_1002, explorerconfig_json_1.default[ExplorerConst_1.explorerConst.PERSISTENCE]);
            }
            this.persistence = yield PersistenceFactory_1.PersistenceFactory.create(explorerconfig_json_1.default[ExplorerConst_1.explorerConst.PERSISTENCE], explorerconfig_json_1.default[explorerconfig_json_1.default[ExplorerConst_1.explorerConst.PERSISTENCE]]);
            for (const pltfrm of explorerconfig_json_1.default[ExplorerConst_1.explorerConst.PLATFORMS]) {
                const platform = yield PlatformBuilder_1.PlatformBuilder.build(pltfrm, this.persistence, broadcaster);
                platform.setPersistenceService();
                // Initializing the platform
                yield platform.initialize();
                // Make sure that platform instance will be referred after its initialization
                passport_1.default.use('local-login', (0, local_login_1.localLoginStrategy)(platform));
                this.app.use('/api', auth_check_1.authCheckMiddleware);
                const authrouter = express_1.default.Router();
                // Initializing the rest app services
                yield (0, authroutes_1.authroutes)(authrouter, platform);
                const apirouter = express_1.default.Router();
                // Initializing the rest app services
                (0, dbroutes_1.dbroutes)(apirouter, platform);
                yield (0, platformroutes_1.platformroutes)(apirouter, platform);
                yield (0, adminroutes_1.adminroutes)(apirouter, platform);
                this.app.use('/auth', authrouter);
                this.app.use('/api', apirouter);
                // Initializing sync listener
                platform.initializeListener(explorerconfig_json_1.default.sync);
                this.platforms.push(platform);
            }
        });
    }
    /**
     *
     *
     * @memberof Explorer
     */
    close() {
        if (this.persistence) {
            this.persistence.closeconnection();
        }
        for (const platform of this.platforms) {
            if (platform) {
                platform.destroy();
            }
        }
    }
}
exports.Explorer = Explorer;
//# sourceMappingURL=Explorer.js.map