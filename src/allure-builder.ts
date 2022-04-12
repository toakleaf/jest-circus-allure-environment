type SimpleArgs = string | Array<string>;

type ComplexArgs = { [key: string]: string } | Array<{ [key: string]: string }>;

enum SimpleMethodTypes {
  "OWNERS" = "owners",
  "EPICS" = "epics",
  "FEATURES" = "features",
  "STORIES" = "stories",
}

enum ComplexMethodTypes {
  "PARAMETERS" = "parameters",
  "LABELS" = "labels",
}

type ConstructorArgs =
  | Partial<Record<SimpleMethodTypes, SimpleArgs>>
  | Partial<Record<ComplexMethodTypes, ComplexArgs>>;

type SimpleMethodCallType = Array<() => void>;
type ComplexMethodCallType = { [key: string]: Array<() => void> };

type A = {
  [key in SimpleMethodTypes]?: SimpleMethodCallType;
};

type B = {
  [key in ComplexMethodTypes]?: ComplexMethodCallType;
};

type MethodCalls = A & B;

export default class AllureBuilder {
  private methodCalls: MethodCalls = {};

  constructor(args: ConstructorArgs = {}) {
    Object.entries(args).forEach(([key, val]) => {
      const simpleKey =
        SimpleMethodTypes[key.toUpperCase() as keyof typeof SimpleMethodTypes];
      const complexKey =
        ComplexMethodTypes[
          key.toUpperCase() as keyof typeof ComplexMethodTypes
        ];
      if (simpleKey) {
        this.addSimpleMethod(
          simpleKey,
          this.getSimpleAllureMethod(simpleKey),
          val
        );
      } else if (complexKey) {
        this.addComplexMethod(
          complexKey,
          this.getComplexAllureMethod(complexKey),
          val
        );
      } else {
        throw new TypeError(
          `${key} must be one of ${[
            ...Object.values(SimpleMethodTypes),
            Object.values(ComplexMethodTypes),
          ]}`
        );
      }
    });
  }

  build() {
    const flatMethodCalls = Object.values(this.methodCalls).flatMap(
      (val: SimpleMethodCallType | ComplexMethodCallType) => {
        if (Array.isArray(val)) return val;
        return Object.values(val).flat();
      }
    );
    flatMethodCalls.forEach((method) => method());
  }

  owner(args: SimpleArgs, overwriteExisting: boolean) {
    this.addSimpleMethod(
      SimpleMethodTypes.OWNERS,
      this.getSimpleAllureMethod(SimpleMethodTypes.OWNERS),
      args,
      overwriteExisting
    );
  }

  vertical = this.epic;
  horizontal = this.epic;

  epic(args: SimpleArgs, overwriteExisting: boolean) {
    this.addSimpleMethod(
      SimpleMethodTypes.EPICS,
      this.getSimpleAllureMethod(SimpleMethodTypes.EPICS),
      args,
      overwriteExisting
    );
  }

  feature(args: SimpleArgs, overwriteExisting: boolean) {
    this.addSimpleMethod(
      SimpleMethodTypes.FEATURES,
      this.getSimpleAllureMethod(SimpleMethodTypes.FEATURES),
      args,
      overwriteExisting
    );
  }

  function = this.story;

  story(args: SimpleArgs, overwriteExisting: boolean) {
    this.addSimpleMethod(
      SimpleMethodTypes.STORIES,
      this.getSimpleAllureMethod(SimpleMethodTypes.STORIES),
      args,
      overwriteExisting
    );
  }

  parameter(args: ComplexArgs, overwriteExisting: boolean) {
    this.addComplexMethod(
      ComplexMethodTypes.PARAMETERS,
      this.getComplexAllureMethod(ComplexMethodTypes.PARAMETERS),
      args,
      overwriteExisting
    );
  }

  label(args: ComplexArgs, overwriteExisting: boolean) {
    this.addComplexMethod(
      ComplexMethodTypes.LABELS,
      this.getComplexAllureMethod(ComplexMethodTypes.LABELS),
      args,
      overwriteExisting
    );
  }

  private getSimpleAllureMethod(
    key: SimpleMethodTypes
  ): (name: string) => void {
    const methodMapping = {
      [SimpleMethodTypes.OWNERS]: (name: string) => allure.owner(name),
      [SimpleMethodTypes.EPICS]: (name: string) => allure.epic(name),
      [SimpleMethodTypes.FEATURES]: (name: string) => allure.feature(name),
      [SimpleMethodTypes.STORIES]: (name: string) => allure.story(name),
    };
    return methodMapping[key];
  }

  private getComplexAllureMethod(
    key: ComplexMethodTypes
  ): (name: string, value: string) => void {
    const methodMapping = {
      [ComplexMethodTypes.PARAMETERS]: (name: string, value: string) =>
        allure.parameter(name, value),
      [ComplexMethodTypes.LABELS]: (name: string, value: string) =>
        allure.label(name, value),
    };
    return methodMapping[key];
  }

  private addSimpleMethod(
    key: SimpleMethodTypes,
    fn: (name: string) => void,
    args: SimpleArgs,
    overwriteExisting: boolean = true
  ) {
    if (overwriteExisting) {
      this.methodCalls[key] = [...[args].flat().map((name) => () => fn(name))];
    } else {
      this.methodCalls[key] = [
        ...(this.methodCalls[key] || []),
        ...[args].flat().map((name) => () => fn(name)),
      ];
    }
  }

  private addComplexMethod(
    key: ComplexMethodTypes,
    fn: (name: string, value: string) => void,
    args: ComplexArgs,
    overwriteExisting: boolean = true
  ) {
    if (!this.methodCalls[key]) this.methodCalls[key] = {};
    if (overwriteExisting) {
      [args].flat().forEach((arg) => {
        const [subKey, subVal] = Object.entries(arg)[0];
        this.methodCalls[key]![subKey] = [
          () => {
            fn(subKey, subVal);
          },
        ];
      });
    } else {
      [args].flat().forEach((arg) => {
        const [subKey, subVal] = Object.entries(arg)[0];
        this.methodCalls[key]![subKey] = [() => fn(subKey, subVal)];
      });
    }
  }
}
