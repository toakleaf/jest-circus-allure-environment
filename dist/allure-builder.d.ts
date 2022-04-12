declare type SimpleArgs = string | Array<string>;
declare type ComplexArgs = {
    [key: string]: string;
};
export declare enum SimpleMethodTypes {
    "OWNERS" = "owners",
    "EPICS" = "epics",
    "FEATURES" = "features",
    "STORIES" = "stories"
}
export declare enum ComplexMethodTypes {
    "PARAMETERS" = "parameters",
    "LABELS" = "labels"
}
declare type ConstructorArgs = Partial<Record<SimpleMethodTypes, SimpleArgs>> | Partial<Record<ComplexMethodTypes, ComplexArgs>>;
export default class AllureBuilder {
    private methodCalls;
    constructor(args?: ConstructorArgs);
    build(): this;
    reset(methodCallKeys: SimpleMethodTypes | ComplexMethodTypes | Array<SimpleMethodTypes | ComplexMethodTypes> | undefined): this;
    owner(args: SimpleArgs, overwriteExisting?: boolean): this;
    vertical: (args: SimpleArgs, overwriteExisting?: boolean) => this;
    horizontal: (args: SimpleArgs, overwriteExisting?: boolean) => this;
    epic(args: SimpleArgs, overwriteExisting?: boolean): this;
    feature(args: SimpleArgs, overwriteExisting?: boolean): this;
    function: (args: SimpleArgs, overwriteExisting?: boolean) => this;
    story(args: SimpleArgs, overwriteExisting?: boolean): this;
    parameter(args: ComplexArgs, overwriteExisting?: boolean): this;
    label(args: ComplexArgs, overwriteExisting?: boolean): this;
    private getSimpleAllureMethod;
    private getComplexAllureMethod;
    private addSimpleMethod;
    private addComplexMethod;
}
export {};
