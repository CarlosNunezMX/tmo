"use server";

import ActionResponse from "@/lib/actionResponse";
import { getClient } from "@/lib/tmobile";
import { TMO } from "@carlosnunezmx/tmo-api";

export async function requestElegibility(prevState: ActionResponse<TMO.Eligibility.Response>, data: FormData): Promise<ActionResponse<TMO.Eligibility.Response>> {
  const imei = data.get("imei");
  if (!imei) return { ok: false, data: [], error: "IMEI is required" }
  if (imei.toString().length != 15) return { ok: false, data: [], error: "IMEI length is invalid (15 chars)" };

  try {
    const client = await getClient();
    const temporary = await client.getEligibility(imei.toString(), TMO.Eligibility.Type.TEMPORARY);
    const permanent = await client.getEligibility(imei.toString(), TMO.Eligibility.Type.PERMANENT);
    console.log(temporary, permanent)
    return {
      ok: true,
      data: [temporary, permanent]
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
        data: []
      }
    }
    if (error instanceof TMO.Errors.RequestError) {
      return {
        ok: false,
        error: error.message,
        data: []
      }
    }
    return {
      ok: false,
      error: "Unknown",
      data: []
    }
  }
}

