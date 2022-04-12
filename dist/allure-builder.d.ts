declare type SimpleArgs = string | Array<string>;
declare type ComplexArgs = {
    [key: string]: string;
};
declare enum SimpleMethodTypes {
    "OWNERS" = "owners",
    "EPICS" = "epics",
    "FEATURES" = "features",
    "STORIES" = "stories"
}
declare enum ComplexMethodTypes {
    "PARAMETERS" = "parameters",
    "LABELS" = "labels"
}
declare type ConstructorArgs = Partial<Record<SimpleMethodTypes, SimpleArgs>> | Partial<Record<ComplexMethodTypes, ComplexArgs>>;
export default class AllureBuilder {
    private methodCalls;
    constructor(args?: ConstructorArgs);
    build(): void;
    owner(args: SimpleArgs, overwriteExisting: boolean): void;
    vertical: (args: SimpleArgs, overwriteExisting: boolean) => void;
    horizontal: (args: SimpleArgs, overwriteExisting: boolean) => void;
    epic(args: SimpleArgs, overwriteExisting: boolean): void;
    feature(args: SimpleArgs, overwriteExisting: boolean): void;
    function: (args: SimpleArgs, overwriteExisting: boolean) => void;
    story(args: SimpleArgs, overwriteExisting: boolean): void;
    parameter(args: ComplexArgs, overwriteExisting: boolean): void;
    label(args: ComplexArgs, overwriteExisting: boolean): void;
    private getSimpleAllureMethod;
    private getComplexAllureMethod;
    private addSimpleMethod;
    private addComplexMethod;
}
export {};
