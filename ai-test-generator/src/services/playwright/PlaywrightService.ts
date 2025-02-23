import { chromium, Page } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { injectable } from "tsyringe";

@injectable()
export class PlaywrightService {
    async analyzePage(url: string): Promise<{ screenshotPath: string; pageMetadata: any }> {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url);

        // Capture Screenshot
        const screenshotPath = path.join(__dirname, `../../screenshots/${Date.now()}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });

        // Extract Page Metadata
        const pageMetadata = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll("*"));
            return elements.map((el) => ({
                tag: el.tagName,
                text: el.textContent?.trim().slice(0, 100) || null,
                attributes: Array.from(el.attributes).map((attr) => ({
                    name: attr.name,
                    value: attr.value,
                })),
            }));
        });

        await browser.close();
        return { screenshotPath, pageMetadata };
    }
}
