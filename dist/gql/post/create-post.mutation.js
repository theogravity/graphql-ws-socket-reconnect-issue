"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostMutation = void 0;
const gql_builder_1 = require("../gql-builder");
const Post_model_1 = __importDefault(require("../../db/models/Post.model"));
const post_events_subscription_1 = require("../subscriptions/posts/post-events.subscription");
const new_post_event_1 = require("../subscriptions/posts/new-post.event");
const PostInput = gql_builder_1.builder.inputType('PostInput', {
    fields: (t) => ({
        authorId: t.int({ required: true }),
        title: t.string({ required: true }),
        content: t.string({ required: true }),
    }),
});
gql_builder_1.builder.mutationField('createPost', (t) => {
    return t.field({
        // We feed in the Post model, which pothos will map to the Post type we created in post.type.ts
        type: Post_model_1.default,
        args: {
            input: t.arg({ type: PostInput, required: true }),
        },
        nullable: false,
        resolve: (root, args, context) => {
            return createPostMutation(args.input, context);
        },
    });
});
// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
async function createPostMutation({ authorId, title, content }, context) {
    const post = await context.dataSources.posts.createPost({
        authorId,
        title,
        content,
    });
    await (0, post_events_subscription_1.publishPostEvent)(new new_post_event_1.NewPostEvent({
        id: post.id,
        title,
    }), context);
    return post;
}
exports.createPostMutation = createPostMutation;
//# sourceMappingURL=create-post.mutation.js.map