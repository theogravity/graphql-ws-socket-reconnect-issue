"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.createUser = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fragments_1 = require("./fragments");
exports.createUser = (0, graphql_tag_1.default) `
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      user {
        ...user
      }
    }
  }

  ${fragments_1.user}
`;
exports.createPost = (0, graphql_tag_1.default) `
  mutation createPost($input: PostInput!) {
    createPost(input: $input) {
      ...post
    }
  }

  ${fragments_1.post}
`;
//# sourceMappingURL=mutations.js.map