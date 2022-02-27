"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postQuery = void 0;
const gql_builder_1 = require("../gql-builder");
const Post_model_1 = __importDefault(require("../../db/models/Post.model"));
gql_builder_1.builder.queryField('post', (t) => {
    return t.field({
        type: Post_model_1.default,
        args: {
            id: t.arg.id(),
        },
        description: 'Blog post',
        nullable: true,
        resolve: async (parent, args, context) => {
            if (!args.id) {
                return null;
            }
            return postQuery(args.id, context);
        },
    });
});
function postQuery(id, context) {
    return context.dataSources.posts.getPostById(id);
}
exports.postQuery = postQuery;
//# sourceMappingURL=post.query.js.map