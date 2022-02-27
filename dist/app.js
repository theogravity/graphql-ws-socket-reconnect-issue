"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const dataloader_sequelize_1 = require("dataloader-sequelize");
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const gql_builder_1 = require("./gql/gql-builder");
require("./gql");
const db_1 = require("./db");
const posts_datasource_1 = require("./datasources/posts.datasource");
const users_datasource_1 = require("./datasources/users.datasource");
const directives_1 = require("./gql/directives");
const pubsub_1 = require("./pubsub");
async function init({ gqlPort = 3000, graphqlPath = '/graphql', } = {}) {
    let builderSchema = gql_builder_1.builder.toSchema({});
    builderSchema = (0, directives_1.registerDirectives)(builderSchema);
    await db_1.db.sync();
    const dataSources = {
        posts: new posts_datasource_1.PostsDatasource(),
        users: new users_datasource_1.UsersDatasource(),
    };
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: builderSchema,
        dataSources: () => dataSources,
        context: () => {
            return {
                db: (0, dataloader_sequelize_1.createContext)(db_1.db),
                pubsub: pubsub_1.pubsub,
            };
        },
    });
    await apolloServer.start();
    const app = (0, express_1.default)();
    apolloServer.applyMiddleware({ app, path: graphqlPath });
    app.get('/playground', (0, graphql_playground_middleware_express_1.default)({
        endpoint: graphqlPath,
    }));
    const server = app.listen(gqlPort, () => {
        const wsServer = new ws_1.WebSocketServer({
            server,
            path: graphqlPath,
        });
        (0, ws_2.useServer)({ schema: builderSchema }, wsServer);
    });
    return apolloServer;
}
exports.init = init;
//# sourceMappingURL=app.js.map