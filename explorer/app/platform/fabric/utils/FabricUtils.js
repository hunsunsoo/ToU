"use strict";
/*
 *SPDX-License-Identifier: Apache-2.0
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
exports.getPEMfromConfig = exports.generateBlockHash = exports.generateDir = exports.getBlockTimeStamp = exports.createFabricClient = void 0;
const path = __importStar(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const js_sha256_1 = __importDefault(require("js-sha256"));
const asn1_js_1 = __importDefault(require("asn1.js"));
const fabric_common_1 = require("fabric-common");
const FabricClient_1 = require("../FabricClient");
const ExplorerError_1 = require("../../../common/ExplorerError");
const ExplorerMessage_1 = require("../../../common/ExplorerMessage");
const helper_1 = require("../../../common/helper");
const logger = helper_1.helper.getLogger('FabricUtils');
function createFabricClient(config, persistence) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create new FabricClient
        const client = new FabricClient_1.FabricClient(config);
        // Initialize fabric client
        logger.debug('************ Initializing fabric client for [%s]************', config.getNetworkId());
        try {
            yield client.initialize(persistence);
            return client;
        }
        catch (err) {
            throw new ExplorerError_1.ExplorerError(ExplorerMessage_1.explorerError.ERROR_2014);
        }
    });
}
exports.createFabricClient = createFabricClient;
/**
 *
 *
 * @param {*} dateStr
 * @returns
 */
function getBlockTimeStamp(dateStr) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Date(dateStr);
        }
        catch (err) {
            logger.error(err);
        }
        return new Date(dateStr);
    });
}
exports.getBlockTimeStamp = getBlockTimeStamp;
/**
 *
 *
 * @returns
 */
function generateDir() {
    return __awaiter(this, void 0, void 0, function* () {
        const tempDir = `/tmp/${new Date().getTime()}`;
        try {
            fs_extra_1.default.mkdirSync(tempDir);
        }
        catch (err) {
            logger.error(err);
        }
        return tempDir;
    });
}
exports.generateDir = generateDir;
/**
 *
 *
 * @param {*} header
 * @returns
 */
function generateBlockHash(header) {
    return __awaiter(this, void 0, void 0, function* () {
        const headerAsn = asn1_js_1.default.define('headerAsn', function () {
            this.seq().obj(this.key('Number').int(), this.key('PreviousHash').octstr(), this.key('DataHash').octstr());
        });
        logger.info('generateBlockHash', header.number.toString());
        // ToDo: Need to handle Long data correctly. header.number {"low":3,"high":0,"unsigned":true}
        const output = headerAsn.encode({
            Number: parseInt(header.number.low),
            PreviousHash: header.previous_hash,
            DataHash: header.data_hash
        }, 'der');
        return js_sha256_1.default.sha256(output);
    });
}
exports.generateBlockHash = generateBlockHash;
/**
 *
 *
 * @param {*} config
 * @returns
 */
function getPEMfromConfig(config) {
    let result = null;
    if (config) {
        if (config.path) {
            // Cert value is in a file
            try {
                result = readFileSync(config.path);
                result = fabric_common_1.Utils.normalizeX509(result);
            }
            catch (e) {
                logger.error(e);
            }
        }
    }
    return result;
}
exports.getPEMfromConfig = getPEMfromConfig;
/**
 *
 *
 * @param {*} config_path
 * @returns
 */
function readFileSync(config_path) {
    try {
        const config_loc = path.resolve(config_path);
        const data = fs_extra_1.default.readFileSync(config_loc);
        return Buffer.from(data).toString();
    }
    catch (err) {
        logger.error(`NetworkConfig101 - problem reading the PEM file :: ${err}`);
        throw err;
    }
}
//# sourceMappingURL=FabricUtils.js.map