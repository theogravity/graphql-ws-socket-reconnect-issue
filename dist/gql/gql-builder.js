"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.builder = void 0;
const plugin_directives_1 = __importDefault(require("@pothos/plugin-directives"));
const plugin_simple_objects_1 = __importDefault(require("@pothos/plugin-simple-objects"));
const core_1 = __importDefault(require("@pothos/core"));
const directives_1 = require("./directives");
exports.builder = new core_1.default({
    plugins: [plugin_directives_1.default, plugin_simple_objects_1.default],
});
// We create empty root query, mutation, and subscription
// because we'll define individual nodes in other files
// since those nodes can have multiple resolvers and possibly
// can lead to really large and hard to read/navigate files
exports.builder.queryType({});
exports.builder.mutationType({});
exports.builder.subscriptionType({});
//# sourceMappingURL=gql-builder.js.map