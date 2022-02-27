"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPostEvent = void 0;
const post_event_interface_1 = require("./post-event.interface");
const gql_builder_1 = require("../../gql-builder");
class NewPostEvent extends post_event_interface_1.BasePostEvent {
    constructor({ id, title }) {
        super(post_event_interface_1.PostEventType.NewPost);
        this.id = id;
        this.title = title;
    }
}
exports.NewPostEvent = NewPostEvent;
gql_builder_1.builder.objectType(NewPostEvent, {
    name: 'NewPostEvent',
    description: 'When a new post is created',
    interfaces: [post_event_interface_1.IBasePostEvent],
    isTypeOf: (value) => {
        return value.eventType === post_event_interface_1.PostEventType.NewPost;
    },
    fields: (t) => ({
        id: t.exposeID('id', {
            description: 'Post id',
        }),
        title: t.exposeString('title', {
            description: 'Post title',
        }),
    }),
});
//# sourceMappingURL=new-post.event.js.map