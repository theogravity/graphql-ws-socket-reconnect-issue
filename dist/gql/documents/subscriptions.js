"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSubscription = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.postSubscription = (0, graphql_tag_1.default) `
  subscription postEvents {
    postEvents {
      ... on NewPostEvent {
        eventType
        id
        title
      }
    }
  }
`;
//# sourceMappingURL=subscriptions.js.map