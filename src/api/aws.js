import AWS from 'aws-sdk'

const bucketName = process.env.VUE_APP_AWS_BUCKET_NAME || 'test'
const bucketRegion = process.env.VUE_APP_AWS_BUCKET_REGION || 'test'
const IdentityPoolId = process.env.VUE_APP_AWS_IDENTITY_POOL_ID || 'test'

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
