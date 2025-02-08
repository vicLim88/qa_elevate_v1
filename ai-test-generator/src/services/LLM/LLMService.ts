export interface LLMService {
    generateTestCase(appMetaData: string) : Promise<string[]>;
}