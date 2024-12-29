"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_ssm_1 = require("@aws-sdk/client-ssm");
const ssmClient = new client_ssm_1.SSMClient({
    region: 'us-east-1'
});
const getSSMParam = (paramName) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const params = {
            Name: paramName,
            WithDecryption: true
        };
        const result = yield ssmClient.send(new client_ssm_1.GetParameterCommand(params));
        return (_b = (_a = result === null || result === void 0 ? void 0 : result.Parameter) === null || _a === void 0 ? void 0 : _a.Value) !== null && _b !== void 0 ? _b : 'invalid value!';
    }
    catch (error) {
        console.error('Error occurred while getting SSM');
        console.log(error);
        return 'invalid value!';
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    let paramName = 'my-bucket-name';
    const bucketName = yield getSSMParam(paramName);
    paramName = 'my-bucket-file';
    const fileName = yield getSSMParam(paramName);
    console.log(fileName);
    console.log(bucketName);
}))();
