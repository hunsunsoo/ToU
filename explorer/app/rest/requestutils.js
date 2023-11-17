"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
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
exports.queryDatevalidator = exports.parseOrgsArray = exports.notFound = exports.invalidRequest = exports.responder = void 0;
const query_string_1 = __importDefault(require("query-string"));
/**
 *
 *
 * @param {*} action
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function respond(action, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const value = yield action(req, res, next);
            res.status(200).send(value);
        }
        catch (error) {
            res.send({
                status: 400,
                message: error.toString()
            });
        }
    });
}
/**
 *
 *
 * @param {*} action
 * @returns
 */
function responder(action) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield respond(action, req, res, next);
        });
    };
}
exports.responder = responder;
/**
 *
 *
 * @param {*} req
 * @param {*} res
 */
function invalidRequest(req, res) {
    const payload = reqPayload(req);
    res.send({
        status: 400,
        error: 'BAD REQUEST',
        payload
    });
}
exports.invalidRequest = invalidRequest;
/**
 *
 *
 * @param {*} req
 * @param {*} res
 */
function notFound(req, res) {
    const payload = reqPayload(req);
    res.send({
        status: 404,
        error: 'NOT FOUND',
        payload
    });
}
exports.notFound = notFound;
/**
 *
 *
 * @param {*} req
 * @returns
 */
function reqPayload(req) {
    const requestPayload = [];
    const { params, query, body } = req;
    requestPayload.push({
        params
    });
    requestPayload.push({
        query
    });
    requestPayload.push({
        body
    });
    return requestPayload;
}
const parseOrgsArray = function (reqQuery) {
    if (reqQuery) {
        // eslint-disable-next-line spellcheck/spell-checker
        // workaround 'Type confusion through parameter tampering', see `https //lgtm dot com/rules/1506301137371 `
        const orgsStr = query_string_1.default.stringify(reqQuery);
        if (orgsStr) {
            const parsedReq = query_string_1.default.parse(orgsStr);
            if (parsedReq && parsedReq.orgs) {
                return Array.isArray(parsedReq) ? parsedReq.orgs : [parsedReq.orgs];
            }
            return [];
        }
    }
};
exports.parseOrgsArray = parseOrgsArray;
const queryDatevalidator = function (from, to) {
    if (!isNaN(Date.parse(from)) && !isNaN(Date.parse(to))) {
        from = new Date(from).toISOString();
        to = new Date(to).toISOString();
    }
    else {
        from = new Date(Date.now() - 864e5).toISOString();
        to = new Date().toISOString();
    }
    return { from, to };
};
exports.queryDatevalidator = queryDatevalidator;
//# sourceMappingURL=requestutils.js.map