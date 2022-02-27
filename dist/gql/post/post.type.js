"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAuthorResolver = void 0;
const gql_builder_1 = require("../gql-builder");
const Post_model_1 = __importDefault(require("../../db/models/Post.model"));
const User_model_1 = __importDefault(require("../../db/models/User.model"));
gql_builder_1.builder.objectType(Post_model_1.default, {
    name: 'Post',
    description: 'Blog post',
    fields: (t) => ({
        id: t.exposeID('id'),
        title: t.exposeString('title'),
        content: t.exposeString('content'),
        created: t.string({
            resolve: (parent) => {
                return parent.createdAt.toString();
            },
        }),
        author: t.field({
            type: User_model_1.default,
            nullable: true,
            description: 'Post author',
            resolve: (parent, args, context) => {
                return postAuthorResolver(parent.authorId, context);
            },
        }),
    }),
});
function postAuthorResolver(authorId, context) {
    return context.dataSources.users.getUserById(authorId);
}
exports.postAuthorResolver = postAuthorResolver;
//# sourceMappingURL=post.type.js.map