"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPostsField = void 0;
const Post_model_1 = __importDefault(require("../../db/models/Post.model"));
// This is an example of splitting out a field to its own file
// in the event the field definition itself is pretty large
function userPostsField(t) {
    return t.field({
        type: [Post_model_1.default],
        description: `User's blog posts`,
        resolve: async (parent, args, context) => {
            return context.dataSources.posts.getPostsByAuthorId(parent.id);
        },
    });
}
exports.userPostsField = userPostsField;
//# sourceMappingURL=user.posts.field.js.map