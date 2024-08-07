import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: 'us-east-1'
});
const s3Content = new AWS.S3();

// Function to upload file to s3
const uploadFileS3 = (key, body) => {
    const fileKey = Date.now().toString() + key;
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileKey,
            Body: body
        };

        s3Content.upload(params, (err, data) => {
            if (err) {
                console.log('Error uploading file:', err);
                reject(err); // Reject the promise with the error
            } else {
                console.log("Uploaded to S3: ", data.Location);
                resolve(data.Location); // Resolve the promise with the data.Location value
            }
        });
    }).catch((error) => {
        console.log(error)
        return null;
    });
};

export default uploadFileS3;