import { Zernio } from "@zernio/node";

const apiKey = process.env.ZERNIO_API_KEY || process.env.ZERNO_API_KEY;

export const isZernioConfigured = Boolean(apiKey);

const zernio = new Zernio({
    // Individual social routes return a clear configuration error when this is absent.
    // An empty value keeps unrelated routes, such as login, available.
    apiKey: apiKey || "",
    baseURL: "https://api.zernio.com/api"
});

export default zernio;
