import * as cdk from 'aws-cdk-lib';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Bucket, IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class AcademicReportAnalyzerInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
   
    const bucket = Bucket.fromBucketName(this, 'MyBucket', 'academic-report-analyzer-upload-test');

    this.createGetUploadUrlLambdaRole(bucket)
  }

  createGetUploadUrlLambdaRole(s3Bucket: IBucket): Role {
    const lambdaRole = new Role(this, 'GetUploadUrlLambdaRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      roleName: 'get-upload-url-lambda-role',
    });

    lambdaRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
    );

    s3Bucket.grantPut(lambdaRole)

    return lambdaRole;
  }
}
