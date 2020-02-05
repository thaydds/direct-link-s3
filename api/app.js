/*
 * Import required packages.
 * Packages should be installed with "npm install".
 */
const express = require("express");
const aws = require("aws-sdk");
const cors = require("cors");

const AWS_ID = "AKIAIIZWADQKGRFTWIOA";
const AWS_SECRET = "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";
const S3_BUCKET_NAME = "thaydds-test-bucket";
/*
 * Set-up and run the Express app.
 */
const app = express();
app.use(cors());
app.listen(process.env.PORT || 3333, () => {
  console.log("listening on port 3333");
});

const s3 = new aws.S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET
});

/*
 * Configure the AWS region of the target bucket.
 * Remember to change this to the relevant region.
 */
aws.config.region = "sa-east-1";

/*
 * Load the S3 information from the environment variables.
 */
const S3_BUCKET = "thaydds-test-bucket";

/*
 * Respond to GET requests to /account.
 * Upon request, render the 'account.html' web page in views/ directory.
 */

app.get("/", (req, res) => {
  console.log("oi");
  return res.json({ message: "bem vinfo" });
});

/*
 * Respond to GET requests to /sign-s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and
 * the anticipated URL of the image.
 */
app.get("/sign-s3", (req, res) => {
  console.log(req.query["file-name"]);
  console.log(req.query["file-type"]);
  const fileName = req.query["file-name"];
  const fileType = req.query["file-type"];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read"
  };
  console.log("oli");
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    console.log("oi");
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    console.log(returnData);
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

/*
 * Respond to POST requests to /submit_form.
 * This function needs to be completed to handle the information in
 * a way that suits your application.
 */
app.post("/save-details", (req, res) => {
  // TODO: Read POSTed form data and do something useful
});
