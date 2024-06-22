import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface SecretProps {
  secretName: string;
  secretValue: cdk.SecretValue;
}

export class SecretsManager extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define a secret in Secrets Manager
    const secret = new secretsmanager.Secret(this, 'LootMasterRDSSecret', {
      secretName: 'lootmasterrdsdb',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'admin' }),
        generateStringKey: 'password',
        excludePunctuation: true,
        includeSpace: false,
        passwordLength: 16,
      },
    });

    secret.grantRead(new iam.ServicePrincipal('lambda.amazonaws.com'));

    new cdk.CfnOutput(this, 'SecretArn', {
      value: secret.secretArn,
    });
  }
}
