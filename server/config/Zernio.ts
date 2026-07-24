import { Zernio } from "@zernio/node";

const apiKey = process.env.ZERNIO_API_KEY || process.env.ZERNO_API_KEY || "sk_e9e795c754483c033bdca2620773c9ffebb80bd828c76feb34309aa34ca813b6";

const zernio = new Zernio({
    apiKey,
    baseURL: "https://api.zernio.com/api"
});

export default zernio;