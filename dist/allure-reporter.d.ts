/// <reference types="node" />
import { AllureGroup, AllureRuntime, AllureStep, AttachmentOptions, AllureTest, Category, ExecutableItemWrapper } from "allure-js-commons";
import type * as jest from "@jest/types";
import JestAllureInterface, { ContentType } from "./jest-allure-interface";
export default class AllureReporter {
    constructor(options: {
        allureRuntime: AllureRuntime;
        jiraUrl?: string;
        tmsUrl?: string;
        environmentInfo?: Record<string, string>;
        categories?: Category[];
    });
    get currentSuite(): AllureGroup | null;
    get currentStep(): AllureStep | null;
    get currentTest(): AllureTest | null;
    getImplementation(): JestAllureInterface;
    environmentInfo(info?: Record<string, string>): void;
    startTestFile(suiteName?: string): void;
    endTestFile(): void;
    startSuite(suiteName?: string): void;
    endSuite(): void;
    startHook(type: jest.Circus.HookType): void;
    endHook(error?: Error): void;
    startTestCase(test: jest.Circus.TestEntry, state: jest.Circus.State, testPath: string): void;
    passTestCase(): void;
    pendingTestCase(test: jest.Circus.TestEntry): void;
    failTestCase(error: Error | any): void;
    endTest(): void;
    writeAttachment(content: Buffer | string, type: ContentType | string | AttachmentOptions): string;
    pushStep(step: AllureStep): void;
    popStep(): void;
    pushTest(test: AllureTest): void;
    popTest(): void;
    pushSuite(suite: AllureGroup): void;
    popSuite(): void;
    private handleError;
    private extractCodeDetails;
    private extractDocBlock;
    private setAllureReportPragmas;
    private setAllureLabelsAndLinks;
    private addSuiteLabelsToTestCase;
    currentExecutable: ExecutableItemWrapper | null;
    private docblockRe;
    private readonly allureRuntime;
    private readonly suites;
    private readonly steps;
    private readonly tests;
    private readonly jiraUrl;
    private readonly tmsUrl;
    private readonly categories;
    private ownerRe;
}
