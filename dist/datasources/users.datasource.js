"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDatasource = void 0;
const apollo_datasource_1 = require("apollo-datasource");
const dataloader_sequelize_1 = require("dataloader-sequelize");
const User_model_1 = __importDefault(require("../db/models/User.model"));
class UsersDatasource extends apollo_datasource_1.DataSource {
    constructor() {
        super();
        this.context = null;
    }
    async getUserById(id) {
        return User_model_1.default.findByPk(id, { [dataloader_sequelize_1.EXPECTED_OPTIONS_KEY]: this.context.db });
    }
    async listUsers() {
        return User_model_1.default.findAll({ [dataloader_sequelize_1.EXPECTED_OPTIONS_KEY]: this.context.db });
    }
    async createUser(name) {
        const user = new User_model_1.default();
        user.name = name;
        await user.save();
        return user;
    }
    /**
     * This is a function that gets called by ApolloServer when being setup.
     * This function gets called with the datasource config including things
     * like caches and context. We'll assign this.context to the request context
     * here, so we can know about the user making requests
     */
    initialize(config) {
        this.context = config.context;
    }
}
exports.UsersDatasource = UsersDatasource;
//# sourceMappingURL=users.datasource.js.map