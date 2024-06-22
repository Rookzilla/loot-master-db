import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class VpcStack extends cdk.Construct {
  public readonly vpc: ec2.Vpc;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    this.vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2, // Use 2 Availability Zones
    });
  }
}
