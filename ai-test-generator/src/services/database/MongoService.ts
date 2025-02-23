import { MongoClient } from "mongodb";
import { injectable } from "tsyringe";

const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:password@mongodb:27017";
const DB_NAME = "ai_vision";

@injectable()
export class MongoService {
    private client: MongoClient;

    constructor() {
        this.client = new MongoClient(MONGO_URI);
    }

    async connect() {
        if (!this.client.db(DB_NAME)) {
            await this.client.connect();
        }
    }

    // Store the URL, screenshot path, and extracted metadata in MongoDB
    async savePageMetadata(url: string, screenshotPath: string, metadata: any) {
        await this.connect();
        const db = this.client.db(DB_NAME);
        const collection = db.collection("webpages");
        await collection.insertOne({ url, screenshotPath, metadata, timestamp: new Date() });
    }
}
