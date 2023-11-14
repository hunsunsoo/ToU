"use strict";
/**
 *    SPDX-License-Identifier: Apache-2.0
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.attributes = void 0;
const Sequelize = __importStar(require("sequelize"));
exports.attributes = {
    username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: {
                args: /^[a-z0-9_-]+$/i,
                msg: 'Username allows only lowercase alphanumeric characters with hyphen and underscore Ex:(a-z0-9_-)'
            }
        }
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        validate: {
            isEmail: {
                args: true,
                msg: 'Invalid email format'
            }
        }
    },
    networkName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.DataTypes.STRING
    },
    lastName: {
        type: Sequelize.DataTypes.STRING
    },
    password: {
        type: Sequelize.DataTypes.STRING
    },
    roles: {
        type: Sequelize.DataTypes.STRING
    },
    salt: {
        type: Sequelize.DataTypes.STRING
    }
};
exports.options = {
    freezeTableName: true,
    indexes: [
        {
            unique: true,
            fields: ['username', 'networkName']
        }
    ]
};
//# sourceMappingURL=User.js.map