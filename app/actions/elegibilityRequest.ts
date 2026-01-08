"use server";

import ActionResponse from "@/lib/actionResponse";
import { getClient } from "@/lib/tmobile";
import { TMO } from "@carlosnunezmx/tmo-api";

export async function requestElegibility(prevState: ActionResponse<TMO.Elegibility.Response>, data: FormData): Promise<ActionResponse<TMO.Elegibility.Response>> {
  const imei = data.get("imei");
  const type = data.get("type");
  if (!imei || !type) return { ok: false, error: "IMEI or Unlock Type is invalid" }

  if (imei.toString().length != 15) return { ok: false, error: "IMEI length is invalid (15 chars)" };
  if (type !== "1" && type !== "2") {
    return { ok: false, error: "Unlock Type is invalid" }
  }

  try {

    const client = await getClient();
    const response = await client.getElegibility(imei.toString(), type as TMO.Elegibility.Type);
    console.log(response, client)
    return {
      ok: true,
      data: response
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message
      }
    }
    if (error instanceof TMO.Errors.RequestError) {
      return {
        ok: false,
        error: error.message
      }
    }
    return {
      ok: false,
      error: "Unknown"
    }
  }
}

