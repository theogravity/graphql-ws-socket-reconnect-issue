"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLogDirective = void 0;
const utils_1 = require("@graphql-tools/utils");
const index_1 = require("./index");
/**
 * Prints out a log of the field name where the directive is applied
 */
function registerLogDirective(schema) {
    return (0, utils_1.mapSchema)(schema, {
        // Executes once for each object field in the schema
        [utils_1.MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            // Check whether this field has the specified directive
            const logDirective = (0, utils_1.getDirective)(schema, fieldConfig, index_1.DirectiveNames.consoleLog)?.[0];
            if (logDirective) {
                const { resolve } = fieldConfig;
                if (!resolve) {
                    return fieldConfig;
                }
                // Replace the original resolver so we can put in our custom directive logic, then call
                // the original resolver
                fieldConfig.resolve = async function (source, args, context, info) {
                    console.log(`Directive ${index_1.DirectiveNames.consoleLog} accessing field '${info.fieldName}'`);
                    return resolve(source, args, context, info);
                };
                return fieldConfig;
            }
        },
    });
}
exports.registerLogDirective = registerLogDirective;
//# sourceMappingURL=log.directive.js.map