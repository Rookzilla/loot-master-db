import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class VpcStack extends Construct {
  public readonly vpc: ec2.IVpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    this.vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2, // Use 2 Availability Zones
    });
  }
}
