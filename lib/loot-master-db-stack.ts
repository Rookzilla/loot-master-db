import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Rds } from './rds'; // Adjust import path as per your project structure

export class LootMasterDbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Example: Create VPC
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2, // Use 2 Availability Zones
    });

    // Example: Create RDS instance
    new Rds(this, 'MyRdsInstance', {
      vpc,
    });
  }
}
