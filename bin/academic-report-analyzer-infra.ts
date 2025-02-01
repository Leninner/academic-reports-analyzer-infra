#!/usr/bin/env node
import "dotenv/config";
import * as cdk from 'aws-cdk-lib';
import { AcademicReportAnalyzerInfraStack } from '../lib/academic-report-analyzer-infra-stack';

const projectName = 'AcademicReportAnalyzer';
const app = new cdk.App();

new AcademicReportAnalyzerInfraStack(app, `${projectName}InfraStack`, {
	env: { account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION },
});