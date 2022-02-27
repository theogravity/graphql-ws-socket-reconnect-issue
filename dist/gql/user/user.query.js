"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryUser = void 0;
const gql_builder_1 = require("../gql-builder");
const User_model_1 = __importDefault(require("../../db/models/User.model"));
gql_builder_1.builder.queryField('user', (t) => {
    return t.field({
        type: User_model_1.default,
        args: {
            id: t.arg.id(),
        },
        nullable: true,
        resolve: async (parent, args, context) => {
            if (!args.id) {
                return null;
            }
            return queryUser(args.id, context);
        },
    });
});
function queryUser(id, context) {
    // Sequelize autoincrement id by default is a number
    return context.dataSources.users.getUserById(id);
}
exports.queryUser = queryUser;
//# sourceMappingURL=user.query.js.map