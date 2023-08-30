import { StackContext, Api, EventBus } from "sst/constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export function API({ stack }: StackContext) {
  const layerChromium = new lambda.LayerVersion(stack, "chromiumLayers", {
    code: lambda.Code.fromAsset("layers/chromium"),
  });

  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const api = new Api(stack, "api", {
    // defaults: {
    //   function: {
    //     bind: [bus],
    //   },
    // },
    routes: {
      "GET /": {
        function: {
          handler: "packages/functions/src/lambda.handler",
          // Use 18.x here because in 14, 16 layers have some issue with using NODE_PATH
          runtime: "nodejs18.x",
          // Increase the timeout for generating screenshots
          timeout: 900,
          memorySize: 3008,
          // Load Chrome in a Layer
          // layers: ["arn:aws:lambda:us-east-1:764866452798:layer:chrome-aws-lambda:33"],
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

  // bus.subscribe("todo.created", {
  //   handler: "packages/functions/src/events/todo-created.handler",
  // });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
