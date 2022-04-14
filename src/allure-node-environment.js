import NodeEnvironment from "jest-environment-node";
import { extendAllureBaseEnvironment } from "jest-circus-allure-environment";

export default extendAllureBaseEnvironment(NodeEnvironment);
