import express from "express";
import fs from "fs";
import path from "path";
import { logger_custom } from "@utilities/custom_logger";

const router = express.Router();

// ✅ Get all route files dynamically
const routeFiles = fs.readdirSync(__dirname).filter(file => file.endsWith("Route.ts"));

async function loadRoutes() {
    const promises = routeFiles.map(async (file) => {
        try {
            const module = await import(path.join(__dirname, file));
            if (module.default) {
                router.use("/api", module.default);
                logger_custom.info(`✅ Registered route: /api (from ${file})`);
            }
        } catch (err) {
            logger_custom.error(`❌ Failed to register ${file}:`, err);
        }
    });

    await Promise.all(promises);
}

// ✅ Export a function that loads routes asynchronously
export const initRoutes = async () => {
    await loadRoutes();
    return router;
};
