// import { ApiHandler } from "sst/node/api";

// export const handler = ApiHandler(async (_evt) => {
//   return {
//     statusCode: 200,
//     body: `Hello world. The time is ${new Date().toISOString()}`,
//   };
// });


import puppeteer from "puppeteer-core";
// import * as puppeteer from "puppeteer"
// const chromium = require("@sparticuz/chromium");
import chromium from "@sparticuz/chromium";

export const handler = async (
  event: any = {},
  context: any = {}
): Promise<any> => {
  try {
    // const executablePath = await chromium.executablePath();
    // console.log({executablePath})
    // return {
    //   statusCode: 200,
    //   body: `Hello world. Title: ${executablePath}`,
    // };
    const executablePath = "/node_modules/@sparticuz/bin/chromium.br"
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      // executablePath: executablePath,
      headless: chromium.headless,
      // ignoreHTTPSErrors: true,
      defaultViewport: chromium.defaultViewport,
      // args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      args: chromium.args
    });
    console.log("browser opened")
    // const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage();
    
    await page.goto("https://developers.google.com/web/");

    console.log("webpage")
    
    // await page.screenshot({
      //   path: "/tmp/screenshot.jpg",
      //   fullPage: true,
      // });

    const title = await page.title()
    console.log({title})
    // await browser.close();
    
    // return {executablePath}
    return {
      statusCode: 200,
      body: `Hello world. Title: ${title}`,
    };
  } catch (err) {
    console.log("Some error happended: ", err);
    return {
      statusCode: 500,
      body: `error: ${err}`,
    };
  }
}