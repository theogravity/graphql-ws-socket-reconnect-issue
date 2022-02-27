"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsDatasource = void 0;
const apollo_datasource_1 = require("apollo-datasource");
const dataloader_sequelize_1 = require("dataloader-sequelize");
const Post_model_1 = __importDefault(require("../db/models/Post.model"));
class PostsDatasource extends apollo_datasource_1.DataSource {
    constructor() {
        super();
        this.context = null;
    }
    async getPostById(id) {
        return Post_model_1.default.findByPk(id, { [dataloader_sequelize_1.EXPECTED_OPTIONS_KEY]: this.context.db });
    }
    async getPostsByAuthorId(authorId) {
        return Post_model_1.default.findAll({
            where: {
                authorId,
            },
            [dataloader_sequelize_1.EXPECTED_OPTIONS_KEY]: this.context.db,
        });
    }
    async listPosts() {
        return Post_model_1.default.findAll({ [dataloader_sequelize_1.EXPECTED_OPTIONS_KEY]: this.context.db });
    }
    async createPost({ authorId, title, content, }) {
        const post = new Post_model_1.default();
        post.authorId = authorId;
        post.title = title;
        post.content = content;
        await post.save();
        return post;
    }
    /**
     * This is a function that gets called by ApolloServer when being setup.
     * This function gets called with the datasource config including things
     * like caches and context. We'll assign this.context to the request context
     * here, so we can know about the user making requests
     */
    initialize(config) {
        this.context = config.context;
    }
}
exports.PostsDatasource = PostsDatasource;
//# sourceMappingURL=posts.datasource.js.map