#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { LootMasterDbStack } from '../lib/loot-master-db-stack';

const app = new cdk.App();
new LootMasterDbStack(app, 'LootMasterDbStack');