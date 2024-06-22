#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LootMasterDbStack } from '../lib/loot-master-db-stack';

const app = new cdk.App();
new LootMasterDbStack(app, 'LootMasterDbStack');
