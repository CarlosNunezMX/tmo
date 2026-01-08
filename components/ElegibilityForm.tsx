"use client";
import { TMO } from "@carlosnunezmx/tmo-api";
import { requestElegibility } from "@/app/actions/elegibilityRequest";
import { useActionState, useEffect } from "react";
import ActionResponse from "@/lib/actionResponse";
import Container from "./Common";

interface props {
  onFinish(response: ActionResponse<TMO.Elegibility.Response>): void
}

export default function ElegibilityForm({ onFinish }: props) {
  const [state, action, isPending] = useActionState(requestElegibility, {
    ok: false
  });
  useEffect(() => {
    if (state.error || state.data) onFinish(state);
  }, [state])
  return (
    <Container>
      <form action={action} className=" flex flex-col gap-4 ">
        <h2 className="text-xl font-black text-center">TMobile Unlock Elegibility</h2>
        <div className="flex flex-col">
          <label htmlFor="imei" className="font-bold text-sm">IMEI</label>
          <input className="dark:bg-zinc-700 border dark:border-zinc-600 shadow p-2 rounded " name="imei" type="number" placeholder="Place your 15 digits IMEI number" maxLength={15} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="type" className="font-bold text-sm">Unlock Type</label>
          <select name="type" className="dark:bg-zinc-700 border dark:border-zinc-600 shadow p-2 rounded ">
            <option value="">Select an option</option>
            <option value={TMO.Elegibility.Type.TEMPORAL}>Temporal</option>
            <option value={TMO.Elegibility.Type.PERMANENT}>Permanent</option>
          </select>
        </div>

        <button className="dark:bg-zinc w-full text-center bg-black rounded py-2 dark:hover:bg-zinc-700 ease-in-out transition-colors disabled:bg-zinc-700 cursor-pointer disabled:cursor-progress" disabled={isPending}>Check capability</button>
      </form >
    </Container>
  )
}
