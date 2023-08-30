import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const handler = async (
  event: any = {},
  context: any = {}
): Promise<any> => {
  try {
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      defaultViewport: chromium.defaultViewport,
      args: chromium.args
    });
    const page = await browser.newPage();
    
    await page.goto("https://developers.google.com/web/");

    const title = await page.title()

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