import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface RdsInstanceProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class Rds extends Construct {
  public readonly instance: rds.DatabaseInstance;

  constructor(scope: Construct, id: string, props: RdsInstanceProps) {
    super(scope, id);

    const vpc = props.vpc;

    // Fetch the secret value from AWS Secrets Manager
    const secret = cdk.SecretValue.secretsManager('lootmasteradmin-password', {
      jsonField: 'lootmasteradmin-password',
    });

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
      credentials: rds.Credentials.fromPassword('lootmasteradmin', secret),
    });
  }
}
