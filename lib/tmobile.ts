import { TMO } from "@carlosnunezmx/tmo-api";

let client: TMO.Client | null = null;
let clientPromise: Promise<TMO.Client> | null = null;

export async function getClient(): Promise<TMO.Client> {
  if (client) return client;

  if (clientPromise) return await clientPromise;

  clientPromise = (async () => {
    const c = new TMO.Client();
    await c.login();
    client = c;
    return c;
  })();

  return await clientPromise;
}
