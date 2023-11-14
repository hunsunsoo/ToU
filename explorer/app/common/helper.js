"use strict";
/*
 *SPDX-License-Identifier: Apache-2.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helper = void 0;
/*
 * Copyright ONECHAIN 2017 All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const log4js_1 = __importDefault(require("log4js/lib/log4js"));
const yn_1 = __importDefault(require("yn"));
/*
 * Please assign the logger with the file name for the application logging and assign the logger with "PgService"
 * for database logging for any file name. Please find an example below.
 *
 * To stacktrace, please pass the error.stack object to the logger. If there is no error.stack object pass in a
 * string with description.
 *
 * const helper = require("./app/helper");
 * const logger = helper.getLogger("main");
 * logger.setLevel('INFO');
 */
/**
 *
 * Returns Logger
 * @param {*} moduleName
 * @returns
 */
class helper {
    static getLogger(moduleName) {
        const logger = log4js_1.default.getLogger(moduleName);
        let appLog = 'logs/app/app.log';
        let dbLog = 'logs/db/db.log';
        let consoleLog = 'logs/console/console.log';
        if (process.env.SYNC_LOG_PATH) {
            appLog = `${process.env.SYNC_LOG_PATH}/app/app.log`;
            dbLog = `${process.env.SYNC_LOG_PATH}/db/db.log`;
            consoleLog = `${process.env.SYNC_LOG_PATH}/console/console.log`;
        }
        let appLevel = 'debug';
        let dbLevel = 'debug';
        let consoleLevel = 'info';
        if (process.env.LOG_LEVEL_APP) {
            appLevel = process.env.LOG_LEVEL_APP;
        }
        if (process.env.LOG_LEVEL_DB) {
            dbLevel = process.env.LOG_LEVEL_DB;
        }
        if (process.env.LOG_LEVEL_CONSOLE) {
            consoleLevel = process.env.LOG_LEVEL_CONSOLE;
        }
        let logConfig = {};
        if (!(0, yn_1.default)(process.env.FORK)) {
            logConfig = {
                appenders: {
                    app: {
                        type: 'dateFile',
                        filename: appLog,
                        numBackups: 7
                    },
                    db: {
                        type: 'dateFile',
                        filename: dbLog,
                        numBackups: 7
                    },
                    console: {
                        type: 'dateFile',
                        filename: consoleLog,
                        numBackups: 7
                    },
                    consoleFilter: {
                        type: 'logLevelFilter',
                        appender: 'console',
                        level: consoleLevel
                    }
                },
                categories: {
                    default: { appenders: ['consoleFilter', 'app'], level: appLevel },
                    PgService: { appenders: ['consoleFilter', 'db'], level: dbLevel }
                }
            };
            if (moduleName === 'main') {
                // Should initiate logger once with tcp-server appender
                logConfig.appenders = Object.assign(Object.assign({}, logConfig.appenders), { server: { type: 'tcp-server' } });
            }
            if (process.env.LOG_CONSOLE_STDOUT) {
                if ((0, yn_1.default)(process.env.LOG_CONSOLE_STDOUT)) {
                    logConfig.appenders.console = Object.assign(Object.assign({}, logConfig.appenders.console), { type: 'console' });
                }
            }
        }
        else {
            logConfig = {
                appenders: {
                    network: {
                        type: 'tcp'
                    }
                },
                categories: {
                    default: { appenders: ['network'], level: appLevel },
                    PgService: { appenders: ['network'], level: dbLevel }
                }
            };
        }
        log4js_1.default.configure(logConfig);
        return logger;
    }
}
exports.helper = helper;
//# sourceMappingURL=helper.js.map