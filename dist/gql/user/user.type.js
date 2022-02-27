"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gql_builder_1 = require("../gql-builder");
const User_model_1 = __importDefault(require("../../db/models/User.model"));
const directives_1 = require("../directives");
const user_posts_field_1 = require("./user.posts.field");
gql_builder_1.builder.objectType(User_model_1.default, {
    name: 'User',
    description: 'Blog user',
    fields: (t) => ({
        id: t.exposeInt('id', {
            directives: [(0, directives_1.useLogDirective)()],
        }),
        name: t.exposeString('name'),
        // If your field may be a large implementation, we can separate it out to its own function
        posts: (0, user_posts_field_1.userPostsField)(t),
    }),
});
//# sourceMappingURL=user.type.js.map