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
    }
    owner(args, overwriteExisting) {
        this.addSimpleMethod(SimpleMethodTypes.OWNERS, this.getSimpleAllureMethod(SimpleMethodTypes.OWNERS), args, overwriteExisting);
    }
    epic(args, overwriteExisting) {
        this.addSimpleMethod(SimpleMethodTypes.EPICS, this.getSimpleAllureMethod(SimpleMethodTypes.EPICS), args, overwriteExisting);
    }
    feature(args, overwriteExisting) {
        this.addSimpleMethod(SimpleMethodTypes.FEATURES, this.getSimpleAllureMethod(SimpleMethodTypes.FEATURES), args, overwriteExisting);
    }
    story(args, overwriteExisting) {
        this.addSimpleMethod(SimpleMethodTypes.STORIES, this.getSimpleAllureMethod(SimpleMethodTypes.STORIES), args, overwriteExisting);
    }
    parameter(args, overwriteExisting) {
        this.addComplexMethod(ComplexMethodTypes.PARAMETERS, this.getComplexAllureMethod(ComplexMethodTypes.PARAMETERS), args, overwriteExisting);
    }
    label(args, overwriteExisting) {
        this.addComplexMethod(ComplexMethodTypes.LABELS, this.getComplexAllureMethod(ComplexMethodTypes.LABELS), args, overwriteExisting);
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
        if (overwriteExisting) {
            this.methodCalls[key] = [...[args].flat().map((name) => () => fn(name))];
        }
        else {
            this.methodCalls[key] = [
                ...(this.methodCalls[key] || []),
                ...[args].flat().map((name) => () => fn(name)),
            ];
        }
    }
    addComplexMethod(key, fn, args, overwriteExisting = true) {
        if (!this.methodCalls[key])
            this.methodCalls[key] = {};
        if (overwriteExisting) {
            [args].flat().forEach((arg) => {
                const [subKey, subVal] = Object.entries(arg)[0];
                this.methodCalls[key][subKey] = [
                    () => {
                        fn(subKey, subVal);
                    },
                ];
            });
        }
        else {
            [args].flat().forEach((arg) => {
                const [subKey, subVal] = Object.entries(arg)[0];
                this.methodCalls[key][subKey] = [() => fn(subKey, subVal)];
            });
        }
    }
}
exports.default = AllureBuilder;
//# sourceMappingURL=AllureBuilder.js.map