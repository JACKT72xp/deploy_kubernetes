#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MultiTenantStack } from '../lib/multi_tenant-stack';


const env = {
  account: '292130268450',
  region: 'us-east-1'
};
const app = new cdk.App();

const stack = new MultiTenantStack(app, 'MultiTenantStackOVG', { env });
