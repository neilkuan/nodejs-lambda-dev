import { client, listBucket } from './demo-interface';

// @ts-ignore
export async function handler() {
  const command = listBucket();
  const resp = await client.send(command);

  for (const bucket of resp.Buckets!) {
    console.log(bucket.Name);
  }
}