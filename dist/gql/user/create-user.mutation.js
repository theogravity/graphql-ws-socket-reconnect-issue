"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserMutation = void 0;
const gql_builder_1 = require("../gql-builder");
const User_model_1 = __importDefault(require("../../db/models/User.model"));
const UserInput = gql_builder_1.builder.inputType('UserInput', {
    fields: (t) => ({
        name: t.string({ required: true }),
    }),
});
// If we want to do a custom payload, use the simple-objects plugin
// to define fields without the need for a backing model
// https://pothos.com/plugins/simple-objects
const CreateUserPayload = gql_builder_1.builder.simpleObject('CreateUserPayload', {
    fields: (t) => ({
        user: t.field({
            type: User_model_1.default,
            description: 'The created user',
        }),
    }),
});
gql_builder_1.builder.mutationField('createUser', (t) => {
    return t.field({
        type: CreateUserPayload,
        nullable: false,
        args: {
            input: t.arg({ type: UserInput, required: true }),
        },
        resolve: async (root, args, context) => {
            const user = await createUserMutation(args.input.name, context);
            return {
                user,
            };
        },
    });
});
function createUserMutation(name, context) {
    return context.dataSources.users.createUser(name);
}
exports.createUserMutation = createUserMutation;
//# sourceMappingURL=create-user.mutation.js.map