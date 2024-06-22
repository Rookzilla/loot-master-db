import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

interface RdsProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  lootmasteradminSecret: secretsmanager.ISecret;
}

export class RdsStack extends cdk.Stack {
  public readonly instance: rds.DatabaseInstance;

  constructor(scope: Construct, id: string, props: RdsProps) {
    super(scope, id, props);

    const vpc = props.vpc;
    const lootmasteradminSecret = props.lootmasteradminSecret;

    this.instance = new rds.DatabaseInstance(this, 'LootMasterRDSInstance', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_14,
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      multiAz: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      databaseName: 'lootmasterrdsdb',
      allocatedStorage: 3,
      backupRetention: cdk.Duration.days(0),
      maxAllocatedStorage: 3,
      credentials: rds.Credentials.fromSecret(lootmasteradminSecret),
    });
  }
}
