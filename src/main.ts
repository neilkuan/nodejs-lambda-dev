import * as path from 'path';
import { App, Stack, StackProps, Duration } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    new NodejsFunction(this, 'DemoFn', {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: path.join(__dirname, './lambda/demo-fn.ts'),
      handler: 'handler',
      timeout: Duration.seconds(300),
      bundling: {
        forceDockerBundling: true,
        target: 'esnext',
        nodeModules: ['@aws-sdk/client-s3'],
        sourceMap: true,
      },
      initialPolicy: [
        new iam.PolicyStatement({
          actions: [
            's3:*',
          ],
          resources: [
            '*',
          ],
        }),
      ],
    });
  }
}

const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};
const app = new App();
new MyStack(app, 'nodejs-lambda-dev', { env: devEnv });

app.synth();