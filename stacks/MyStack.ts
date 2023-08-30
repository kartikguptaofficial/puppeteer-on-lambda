import { StackContext, Api, EventBus } from "sst/constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export function API({ stack }: StackContext) {
  const layerChromium = new lambda.LayerVersion(stack, "chromiumLayers", {
    code: lambda.Code.fromAsset("layers/chromium"),
  });

  const api = new Api(stack, "api", {
    routes: {
      "GET /": {
        function: {
          handler: "packages/functions/src/lambda.handler",
          runtime: "nodejs18.x",
          timeout: 900,
          memorySize: 3008,
          // Load Chrome in a Layer
          layers: [layerChromium],
          // Exclude bundling it in the Lambda function
          nodejs: {
            esbuild: {
              external: ["@sparticuz/chromium"],
            },
          }
        },
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
