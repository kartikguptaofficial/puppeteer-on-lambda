# Using puppeteer on AWS Lambda function

We’ll be using the @sparticuz/chromium Layer to get the title of a webpage.

We’ll be using SST’s Live Lambda Development. It allows you to make changes and test locally without having to redeploy.

Requirements
    Node.js 16 or later
    We’ll be using TypeScript
    An AWS account with the AWS CLI configured locally

Here, we will download the Layer from the Sparticuz/chromium GitHub release. Create folder layers/chromium in the root of the project and unzip the file layer then you will have layers/chromium/nodejs. The nodejs folder contains the node_modules folder and the package.json file.
    - Create a layers folder in the root of the project.
    - Create a nodejs folder in the layers folder.
    - npm init
    - Install the @sparticuz/chromium package, which will create the node_modules folder there.

Configurations: 
    - Increase timeout of lambda function according to your requirements, maximum timeout of lambda is 900s (15 mins).
    - Increase the memory size of lambda function according to your requirements, maximum memory size is 3008 MB

Start commands: 
    - npm run dev (to start the function locally)
    - npm run deploy (to deploy the function) or npx sst deploy --stage prod (for stage prod)


Puppeteer requires a chromium binary file in order to run the browser on cloud, for that we are using @sparticuz/chromium package here,
Chromium binary file occupies a good space which cannot be deployed to lambda function directly, so here we have configured that file in
the layers, so that the chromium file will be deployed to layers instead of lambda, and then the lambda function will use that layer to use
chromium.

For more details: https://sst.dev/examples/how-to-use-lambda-layers-in-your-serverless-app.html

- By Kartik