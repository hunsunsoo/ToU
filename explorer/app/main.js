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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Created by shouhewu on 6/8/17.
 *
 */
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const url_1 = __importDefault(require("url"));
const WebSocket = __importStar(require("ws"));
const fs = __importStar(require("fs"));
const helper_1 = require("./common/helper");
const appconfig_json_1 = __importDefault(require("./appconfig.json"));
const Explorer_1 = require("./Explorer");
const ExplorerError_1 = require("./common/ExplorerError");
const logger = helper_1.helper.getLogger('main');
const sslEnabled = process.env.SSL_ENABLED || appconfig_json_1.default.sslEnabled;
const sslCertsPath = process.env.SSL_CERTS_PATH || appconfig_json_1.default.sslCertsPath;
const host = process.env.HOST || appconfig_json_1.default.host;
const port = process.env.PORT || appconfig_json_1.default.port;
const protocol = sslEnabled ? 'https' : 'http';
/**
 *
 *
 * @class Broadcaster
 * @extends {WebSocket.Server}
 */
class Broadcaster extends WebSocket.Server {
    /**
     * Creates an instance of Broadcaster.
     * @param {*} bServer
     * @memberof Broadcaster
     */
    constructor(bServer) {
        super({
            server: bServer
        });
        this.on('connection', function connection(ws, req) {
            const location = url_1.default.parse(req.url, true);
            this.on('message', message => {
                logger.info('received: %s, %s', location, message);
            });
        });
    }
    /**
     *
     *
     * @param {*} data
     * @memberof Broadcaster
     */
    broadcast(data) {
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                logger.debug('Broadcast >> %j', data);
                client.send(JSON.stringify(data));
            }
        });
    }
}
let server;
let explorer;
function startExplorer() {
    return __awaiter(this, void 0, void 0, function* () {
        explorer = new Explorer_1.Explorer();
        // Application headers
        explorer.getApp().use((0, helmet_1.default)());
        explorer.getApp().use(helmet_1.default.xssFilter());
        explorer.getApp().use(helmet_1.default.hidePoweredBy());
        explorer.getApp().use(helmet_1.default.referrerPolicy());
        explorer.getApp().use(helmet_1.default.noSniff());
        /* eslint-disable */
        explorer.getApp().use(helmet_1.default.frameguard({ action: 'SAMEORIGIN' }));
        explorer.getApp().use(helmet_1.default.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                objectSrc: ["'self'"],
                frameSrc: ["'self'"],
                fontSrc: ["'self'"],
                imgSrc: ["'self' data: https:; "]
            }
        }));
        /* eslint-enable */
        // Application headers
        // = =========== web socket ==============//
        const sslPath = path_1.default.join(__dirname, sslCertsPath);
        logger.debug(sslEnabled, sslCertsPath, sslPath);
        if (sslEnabled) {
            const options = {
                key: fs.readFileSync(sslPath + '/privatekey.pem').toString(),
                cert: fs.readFileSync(sslPath + '/certificate.pem').toString()
            };
            server = https_1.default.createServer(options, explorer.getApp());
        }
        else {
            server = http_1.default.createServer(explorer.getApp());
        }
        const broadcaster = new Broadcaster(server);
        yield explorer.initialize(broadcaster);
        explorer
            .getApp()
            .use(express_1.default.static(path_1.default.join(__dirname, '..', 'client/build')));
        // ============= start server =======================
        server.listen(port, () => {
            logger.info(`Please open web browser to access ：${protocol}://${host}:${port}/`);
            logger.info(`pid is ${process.pid}`);
        });
    });
}
startExplorer();
/* eslint-disable */
let connections = [];
server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => (connections = connections.filter(curr => curr !== connection)));
});
/* eslint-enable */
/*
 * This function is called when you want the server to die gracefully
 * i.e. wait for existing connections
 */
const shutDown = function (exitCode) {
    logger.info('Received kill signal, shutting down gracefully');
    server.close(() => {
        explorer.close();
        logger.info('Closed out connections');
        process.exit(exitCode);
    });
    setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        explorer.close();
        process.exit(1);
    }, 10000);
    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
};
process.on('unhandledRejection', (up) => {
    logger.error('<<<<<<<<<<<<<<<<<<<<<<<<<< Explorer Error >>>>>>>>>>>>>>>>>>>>>');
    if (up instanceof ExplorerError_1.ExplorerError) {
        logger.error('Error : ', up.message);
    }
    else {
        logger.error(up);
    }
    setTimeout(() => {
        shutDown(1);
    }, 2000);
});
process.on('uncaughtException', up => {
    logger.error('<<<<<<<<<<<<<<<<<<<<<<<<<< Explorer Error >>>>>>>>>>>>>>>>>>>>>');
    if (up instanceof ExplorerError_1.ExplorerError) {
        logger.error('Error : ', up.message);
    }
    else {
        logger.error(up);
    }
    setTimeout(() => {
        shutDown(1);
    }, 2000);
});
// Listen for TERM signal .e.g. kill
process.on('SIGTERM', shutDown);
// Listen for INT signal e.g. Ctrl-C
process.on('SIGINT', shutDown);
//# sourceMappingURL=main.js.map