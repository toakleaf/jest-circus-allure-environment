import NodeEnvironment = require("jest-environment-node");
import { default as extendAllureBaseEnvironment } from "./allure-base-environment";

// @ts-ignore
export default extendAllureBaseEnvironment(NodeEnvironment);
