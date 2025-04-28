import { S3Client } from '@aws-sdk/client-s3'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'

const bucketRegion = import.meta.env.VITE_AWS_BUCKET_REGION
const identityPoolId = import.meta.env.VITE_AWS_BUCKET_IDENTITY_POOL_ID

const s3Client = new S3Client({
  region: bucketRegion,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: bucketRegion },
    identityPoolId: identityPoolId
  })
})

export default s3Client
