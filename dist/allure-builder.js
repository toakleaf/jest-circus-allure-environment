"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleMethodTypes;
(function (SimpleMethodTypes) {
    SimpleMethodTypes["OWNERS"] = "owners";
    SimpleMethodTypes["EPICS"] = "epics";
    SimpleMethodTypes["FEATURES"] = "features";
    SimpleMethodTypes["STORIES"] = "stories";
})(SimpleMethodTypes || (SimpleMethodTypes = {}));
var ComplexMethodTypes;
(function (ComplexMethodTypes) {
    ComplexMethodTypes["PARAMETERS"] = "parameters";
    ComplexMethodTypes["LABELS"] = "labels";
})(ComplexMethodTypes || (ComplexMethodTypes = {}));
class AllureBuilder {
    constructor(args = {}) {
        this.methodCalls = {};
        this.vertical = this.epic;
        this.horizontal = this.epic;
        this.function = this.story;
        Object.entries(args).forEach(([key, val]) => {
            const simpleKey = SimpleMethodTypes[key.toUpperCase()];
            const complexKey = ComplexMethodTypes[key.toUpperCase()];
            if (simpleKey) {
                this.addSimpleMethod(simpleKey, this.getSimpleAllureMethod(simpleKey), val);
            }
            else if (complexKey) {
                this.addComplexMethod(complexKey, this.getComplexAllureMethod(complexKey), val);
            }
            else {
                throw new TypeError(`${key} must be one of ${[
                    ...Object.values(SimpleMethodTypes),
                    Object.values(ComplexMethodTypes),
                ]}`);
            }
        });
    }
    build() {
        const flatMethodCalls = Object.values(this.methodCalls).flatMap((val) => {
            if (Array.isArray(val))
                return val;
            return Object.values(val).flat();
        });
        flatMethodCalls.forEach((method) => method());
        return this;
    }
    reset(methodCallKeys) {
        if (!methodCallKeys)
            this.methodCalls = {};
        else {
            [methodCallKeys].flat().forEach((key) => {
                delete this.methodCalls[key];
            });
        }
        return this;
    }
    owner(args, overwriteExisting) {
        this.addSimpleMethod(SimpleMethodTypes.OWNERS, this.getSimpleAllureMethod(SimpleMethodTypes.OWNERS), args, overwriteExisting);
        return this;
    }
    epic(args, overwriteExisting) {
        this.addSimpleMethod(SimpleMethodTypes.EPICS, this.getSimpleAllureMethod(SimpleMethodTypes.EPICS), args, overwriteExisting);
        return this;
    }
    feature(args, overwriteExisting) {
        this.addSimpleMethod(SimpleMethodTypes.FEATURES, this.getSimpleAllureMethod(SimpleMethodTypes.FEATURES), args, overwriteExisting);
        return this;
    }
    story(args, overwriteExisting) {
        this.addSimpleMethod(SimpleMethodTypes.STORIES, this.getSimpleAllureMethod(SimpleMethodTypes.STORIES), args, overwriteExisting);
        return this;
    }
    parameter(args, overwriteExisting) {
        this.addComplexMethod(ComplexMethodTypes.PARAMETERS, this.getComplexAllureMethod(ComplexMethodTypes.PARAMETERS), args, overwriteExisting);
        return this;
    }
    label(args, overwriteExisting) {
        this.addComplexMethod(ComplexMethodTypes.LABELS, this.getComplexAllureMethod(ComplexMethodTypes.LABELS), args, overwriteExisting);
        return this;
    }
    getSimpleAllureMethod(key) {
        const methodMapping = {
            [SimpleMethodTypes.OWNERS]: (name) => allure.owner(name),
            [SimpleMethodTypes.EPICS]: (name) => allure.epic(name),
            [SimpleMethodTypes.FEATURES]: (name) => allure.feature(name),
            [SimpleMethodTypes.STORIES]: (name) => allure.story(name),
        };
        return methodMapping[key];
    }
    getComplexAllureMethod(key) {
        const methodMapping = {
            [ComplexMethodTypes.PARAMETERS]: (name, value) => allure.parameter(name, value),
            [ComplexMethodTypes.LABELS]: (name, value) => allure.label(name, value),
        };
        return methodMapping[key];
    }
    addSimpleMethod(key, fn, args, overwriteExisting = true) {
        const prev = this.methodCalls[key];
        const cur = [args].flat().map((name) => () => fn(name));
        this.methodCalls[key] = prev && overwriteExisting ? [...prev, ...cur] : cur;
    }
    addComplexMethod(key, fn, args, overwriteExisting = true) {
        if (!this.methodCalls[key])
            this.methodCalls[key] = {};
        Object.entries(args).forEach(([subKey, subVal]) => {
            var _a;
            const prev = (_a = this.methodCalls[key]) === null || _a === void 0 ? void 0 : _a[subKey];
            const func = () => {
                fn(subKey, subVal);
            };
            this.methodCalls[key][subKey] =
                prev && !overwriteExisting ? [...prev, func] : [func];
        });
    }
}
exports.default = AllureBuilder;
//# sourceMappingURL=allure-builder.js.map