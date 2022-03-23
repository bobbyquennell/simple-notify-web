import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import { Construct } from 'constructs';

export class SimpleNotifyWebStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const notificationHandler = new NodejsFunction(this, 'NotificationHandler', {
      functionName: 'notificationHandler',
      description: 'Get notifications from DynamoDB',
      runtime: lambda.Runtime.NODEJS_14_X,
      architecture: lambda.Architecture.ARM_64,
      entry: path.join(__dirname, '../src/lambda/notification-handler.ts'),
      handler: 'notificationHandler',
    });

    new apigateway.LambdaRestApi(this, 'Endpoint', {
      handler: notificationHandler,
    });
  }
}
