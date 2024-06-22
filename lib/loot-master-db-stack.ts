import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { VpcStack } from './vpc';
import { RdsStack } from './rds';

export class LootMasterDbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create VPC
    const vpcStack = new VpcStack(this, 'VpcStack');

    // Create RDS Instance
    const rdsInstanceStack = new RdsStack(this, 'RdsStack', {
      vpc: vpcStack.vpc,
    });

    // Output the RDS instance endpoint
    new cdk.CfnOutput(this, 'MyRdsEndpoint', {
      value: rdsInstanceStack.instance.dbInstanceEndpointAddress!,
    });
  }
}
