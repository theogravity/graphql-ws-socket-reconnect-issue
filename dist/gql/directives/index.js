"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDirectives = exports.useLogDirective = exports.DirectiveNames = void 0;
const log_directive_1 = require("./log.directive");
var DirectiveNames;
(function (DirectiveNames) {
    DirectiveNames["consoleLog"] = "consoleLog";
})(DirectiveNames = exports.DirectiveNames || (exports.DirectiveNames = {}));
function useLogDirective() {
    return {
        name: DirectiveNames.consoleLog,
        args: {},
    };
}
exports.useLogDirective = useLogDirective;
function registerDirectives(schema) {
    schema = (0, log_directive_1.registerLogDirective)(schema);
    return schema;
}
exports.registerDirectives = registerDirectives;
//# sourceMappingURL=index.js.map