import { SSMClient, PutParameterCommand, PutParameterCommandInput } from "@aws-sdk/client-ssm";

const ssmClient: SSMClient = new SSMClient({
    region: "us-east-1"
});

const putSSMParam = async (): Promise<boolean> => {
    try {
        const params: PutParameterCommandInput = {
            Name: 'my-bucket-name',
            Value: 'my-buck145',
            Type: 'SecureString',
            Overwrite: true
        };
        const result = await ssmClient.send(new PutParameterCommand(params));
        console.log(result);

        const params1: PutParameterCommandInput = {
            Name: 'my-bucket-file',
            Value: 'test.json.txt',
            Type: 'SecureString',
            Overwrite: true
        };
        const result1 = await ssmClient.send(new PutParameterCommand(params1));
        console.log(result1);
        return true;
    } catch (error) {
        console.error('Error occurred while putting SSM');
        console.log(error);
        return false;
    }
};

(async () => {
    const isPutSSMDone: boolean = await putSSMParam();
    isPutSSMDone === true ? console.log('Put ssm done succcess') : console.log('put ssm failed');
})();
