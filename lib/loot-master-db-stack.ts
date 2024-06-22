import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as iam from 'aws-cdk-lib/aws-iam';

export class LootMasterDbStack extends cdk.Stack {
  public readonly instance: rds.DatabaseInstance;
  public readonly lootmasteradminSecret: secretsmanager.ISecret;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Example: Create VPC
    const vpc = new ec2.Vpc(this, 'LootMasterDBVPC', {
      maxAzs: 2, // Use 2 Availability Zones
    });

    // Create Secrets Manager secret
    this.lootmasteradminSecret = new secretsmanager.Secret(this, 'LootMasterAdminSecret', {
      secretName: 'lootmasteradmin-password',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'lootmasteradmin' }),
        generateStringKey: 'password',
        excludePunctuation: true,
        includeSpace: false,
        passwordLength: 16,
      },
    });

    this.lootmasteradminSecret.grantRead(new iam.ServicePrincipal('lambda.amazonaws.com'));

    new cdk.CfnOutput(this, 'LootMasterAdminSecretARN', {
      value: this.lootmasteradminSecret.secretArn,
    });

    // Create RDS instance
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
      allocatedStorage: 10,
      backupRetention: cdk.Duration.days(0),
      maxAllocatedStorage: 10,
      credentials: rds.Credentials.fromSecret(this.lootmasteradminSecret),
    });
  }
}
