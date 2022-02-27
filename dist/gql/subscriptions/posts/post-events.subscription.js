"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishPostEvent = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const gql_builder_1 = require("../../gql-builder");
const post_event_interface_1 = require("./post-event.interface");
const pubsub_1 = require("../../../pubsub");
gql_builder_1.builder.subscriptionField('postEvents', (t) => {
    return t.field({
        type: post_event_interface_1.IBasePostEvent,
        description: 'Events related to posts',
        args: {},
        subscribe: (_, {}, ctx, _info) => {
            const subscriptionResolver = generatePostEventSubscriptionResolver({ ctx });
            return subscriptionResolver(_, {}, ctx, _info);
        },
        resolve: async (payload, {}, context) => {
            return payload;
        },
    });
});
function generatePostEventSubscriptionResolver({ ctx }) {
    return (0, graphql_subscriptions_1.withFilter)(() => {
        return pubsub_1.pubsub.asyncIterator(post_event_interface_1.PostEventLabel);
    }, async (event, {}, ctx) => {
        // Send to all connected users to this subscription
        return true;
    });
}
async function publishPostEvent(event, context) {
    await context.pubsub.publish(post_event_interface_1.PostEventLabel, event);
}
exports.publishPostEvent = publishPostEvent;
//# sourceMappingURL=post-events.subscription.js.map