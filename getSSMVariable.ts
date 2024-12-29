import { SSMClient, GetParameterCommand, GetParameterCommandInput, GetParameterCommandOutput } from "@aws-sdk/client-ssm";

const ssmClient: SSMClient = new SSMClient({
    region: 'us-east-1'
})

const getSSMParam = async (paramName: string): Promise<string> => {
    try {
        const params: GetParameterCommandInput = {
            Name: paramName,
            WithDecryption: true
        };
        const result: GetParameterCommandOutput = await ssmClient.send(new GetParameterCommand(params));
        return result?.Parameter?.Value ?? 'invalid value!';
    } catch (error) {
        console.error('Error occurred while getting SSM');
        console.log(error);
        return 'invalid value!';
    }
};

(async () => {
    let paramName = 'my-bucket-name';
    const bucketName = await getSSMParam(paramName);
    paramName = 'my-bucket-file';
    const fileName = await getSSMParam(paramName);
    console.log(fileName);
    console.log(bucketName);
    
})();