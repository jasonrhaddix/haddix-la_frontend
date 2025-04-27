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


/* import AWS from 'aws-sdk'

const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME
const bucketRegion = import.meta.env.VITE_AWS_BUCKET_REGION
const IdentityPoolId = import.meta.env.VITE_AWS_BUCKET_IDENTITY_POOL_ID

// Configure the AWS Instance
AWS.config.update({
	region: bucketRegion,
	credentials: new AWS.CognitoIdentityCredentials({
		IdentityPoolId: IdentityPoolId
	})
})

const s3 = new AWS.S3({
	apiVersion: '2006-03-01',
	params: { Bucket: bucketName }
})

export default s3
 */