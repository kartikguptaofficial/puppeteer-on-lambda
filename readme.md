# Using Puppeteer on AWS Lambda Function

This guide demonstrates how to use Puppeteer with an AWS Lambda function, leveraging the `@sparticuz/chromium` Layer to extract the title of a webpage. Additionally, it utilizes SST’s Live Lambda Development for local testing without the need for frequent redeployments.

## Requirements
- Node.js 16 or later
- TypeScript
- An AWS account with the AWS CLI configured locally

## Setup
1. Download the `@sparticuz/chromium` Layer from the [Sparticuz/chromium GitHub release](https://github.com/Sparticuz/chromium/releases).
2. Create a `layers/chromium` folder in the root of the project and unzip the downloaded file.
3. Ensure the structure `layers/chromium/nodejs` exists, containing the `node_modules` folder and the `package.json` file.
4. Create a `layers` folder in the root of the project.
5. Within the `layers` folder, create a `nodejs` folder.
6. Run `npm init` and install the `@sparticuz/chromium` package to create the `node_modules` folder.

## Configurations
- Adjust the timeout of the lambda function to fit your requirements, with a maximum timeout of 900s (15 mins).
- Customize the memory size of the lambda function according to your needs, with a maximum memory size of 3008 MB.

## Usage
- Run `npm run dev` to start the function locally.
- Run `npm run deploy` to deploy the function, or `npx sst deploy --stage prod` for the production stage.

## Notes
Puppeteer requires a chromium binary file to run the browser on the cloud. The `@sparticuz/chromium` package is used to manage this requirement. However, due to the large size of the Chromium binary file, it cannot be deployed directly to the lambda function. Instead, it is configured within the layers. The chromium file is deployed to layers, and the lambda function utilizes this layer to access chromium.

For more details, refer to [SST's documentation on using Lambda Layers](https://sst.dev/examples/how-to-use-lambda-layers-in-your-serverless-app.html).

By Kartik
