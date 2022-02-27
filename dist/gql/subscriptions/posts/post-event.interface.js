"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IBasePostEvent = exports.BasePostEvent = exports.PostEventTypeGql = exports.PostEventType = exports.PostEventLabel = void 0;
const gql_builder_1 = require("../../gql-builder");
exports.PostEventLabel = 'POST_EVENT';
var PostEventType;
(function (PostEventType) {
    PostEventType["NewPost"] = "NewPost";
})(PostEventType = exports.PostEventType || (exports.PostEventType = {}));
exports.PostEventTypeGql = gql_builder_1.builder.enumType(PostEventType, {
    name: 'PostEventType',
});
class BasePostEvent {
    constructor(eventType) {
        this.eventType = eventType;
    }
}
exports.BasePostEvent = BasePostEvent;
exports.IBasePostEvent = gql_builder_1.builder.interfaceType(BasePostEvent, {
    name: 'IBasePostEvent',
    fields: (t) => ({
        eventType: t.field({
            type: exports.PostEventTypeGql,
            description: 'Event type',
            resolve: (event) => {
                return event.eventType;
            },
        }),
    }),
});
//# sourceMappingURL=post-event.interface.js.map