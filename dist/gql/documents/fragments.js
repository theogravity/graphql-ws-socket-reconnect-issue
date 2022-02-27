"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.user = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.user = (0, graphql_tag_1.default) `
  fragment user on User {
    id
    name
  }
`;
exports.post = (0, graphql_tag_1.default) `
  fragment post on Post {
    author {
      ...user
    }
    content
    created
    id
    title
  }

  ${exports.user}
`;
//# sourceMappingURL=fragments.js.map