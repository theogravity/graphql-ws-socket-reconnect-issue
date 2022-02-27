"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const db_1 = require("../config/db");
let config;
switch (process.env.NODE_ENV) {
    case 'development':
        config = db_1.development;
        break;
    case 'production':
        config = db_1.production;
        break;
    case 'test':
        config = db_1.test;
        break;
    default:
        config = db_1.development;
}
exports.db = new sequelize_typescript_1.Sequelize(config);
//# sourceMappingURL=index.js.map