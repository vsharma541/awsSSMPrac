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
    region: "us-east-1"
});
const putSSMParam = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            Name: 'my-bucket-name',
            Value: 'my-buck145',
            Type: 'SecureString',
            Overwrite: true
        };
        const result = yield ssmClient.send(new client_ssm_1.PutParameterCommand(params));
        console.log(result);
        const params1 = {
            Name: 'my-bucket-file',
            Value: 'test.json.txt',
            Type: 'SecureString',
            Overwrite: true
        };
        const result1 = yield ssmClient.send(new client_ssm_1.PutParameterCommand(params1));
        console.log(result1);
        return true;
    }
    catch (error) {
        console.error('Error occurred while putting SSM');
        console.log(error);
        return false;
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const isPutSSMDone = yield putSSMParam();
    isPutSSMDone === true ? console.log('Put ssm done succcess') : console.log('put ssm failed');
}))();
