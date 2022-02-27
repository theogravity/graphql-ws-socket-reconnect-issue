"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsQuery = void 0;
const gql_builder_1 = require("../gql-builder");
const Post_model_1 = __importDefault(require("../../db/models/Post.model"));
gql_builder_1.builder.queryField('posts', (t) => {
    return t.field({
        type: [Post_model_1.default],
        description: 'List of posts',
        resolve: async (parent, args, context) => {
            return postsQuery(context);
        },
    });
});
function postsQuery(context) {
    return context.dataSources.posts.listPosts();
}
exports.postsQuery = postsQuery;
//# sourceMappingURL=posts.query.js.map