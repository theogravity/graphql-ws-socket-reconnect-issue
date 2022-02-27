"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersQuery = void 0;
const gql_builder_1 = require("../gql-builder");
const User_model_1 = __importDefault(require("../../db/models/User.model"));
gql_builder_1.builder.queryField('users', (t) => {
    return t.field({
        type: [User_model_1.default],
        description: 'List of users',
        resolve: async (parent, args, context) => {
            return usersQuery(context);
        },
    });
});
function usersQuery(context) {
    return context.dataSources.users.listUsers();
}
exports.usersQuery = usersQuery;
//# sourceMappingURL=users.query.js.map