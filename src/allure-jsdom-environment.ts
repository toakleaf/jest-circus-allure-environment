import JsdomEnvironment = require('jest-environment-jsdom');

import extendAllureBaseEnvironment from './allure-base-environment';

// @ts-ignore
export default extendAllureBaseEnvironment(JsdomEnvironment);

