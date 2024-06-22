import * as cdk from '@aws-cdk/core';
import * as rds from '@aws-cdk/aws-rds';
import * as ec2 from '@aws-cdk/aws-ec2';

interface RdsInstanceProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class RdsStack extends cdk.Construct {
  public readonly instance: rds.DatabaseInstance;

  constructor(scope: cdk.Construct, id: string, props: RdsInstanceProps) {
    super(scope, id);

    this.instance = new rds.DatabaseInstance(this, 'LootMasterRDSInstance', {
      engine: rds.DatabaseInstanceEngine.POSTGRES,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      vpc: props.vpc,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      databaseName: 'lootmasterrdsdb',
      allocatedStorage: 2,
    });
  }
}
