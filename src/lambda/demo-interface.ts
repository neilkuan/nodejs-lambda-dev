import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

export const client = new S3Client({
  region: process.env.AWS_REGION,
});

export function listBucket() {
  return new ListBucketsCommand({});
};