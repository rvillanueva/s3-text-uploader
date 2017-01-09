# S3 Text Editor

Put textfiles into S3 from a simple browser interface. Useful as a simple editing interface for non-technical users.

Originally designed to drectly upload survey configuration data to S3 for consumption by the World Food Programme demo bot.

Currently pulls default text from https://s3.amazonaws.com/wfp-bot/survey.yml but can be changed in the server.js file.

-[Demo](https://wfp-bot.herokuapp.com/)
-[Core WFP bot code](https://github.com/instedd/mvam-chatbot)

Requires valid S3 IAM credentials to the bucket you're pushing to.

## Deployment

1. Clone repository
2. npm install
3. npm start

## Use
1. Type text in textarea 2to upload to S3.
2. Add S3 bucket name, filepath + filename and extension (e.g. path/to/file.txt), and valid credentials. Make sure your bucket is set up for proper access from the user.
3. Publish.
