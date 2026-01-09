"use client";
import { TMO } from "@carlosnunezmx/tmo-api";
import { requestElegibility } from "@/app/actions/elegibilityRequest";
import { useActionState, useEffect } from "react";
import ActionResponse from "@/lib/actionResponse";
import Container from "./Common";

interface props {
  onFinish(response: ActionResponse<TMO.Eligibility.Response>): void
}

export default function ElegibilityForm({ onFinish }: props) {
  const [state, action, isPending] = useActionState(requestElegibility, {
    ok: false,
    data: []
  });
  useEffect(() => {
    if (state.error || state.data.length !== 0) onFinish(state);
  }, [state])
  return (
    <Container>
      <form action={action} className=" flex flex-col gap-4 ">
        <h2 className="text-xl font-black text-center">TMobile Unlock Eligibility</h2>
        <div className="flex flex-col">
          <label htmlFor="imei" className="font-bold text-sm">IMEI</label>
          <input className="bg-zinc-400 text-black font-bold dark:text-white dark:bg-zinc-700 shadow p-2 rounded " name="imei" type="number" placeholder="Place your 15 digits IMEI number" maxLength={15} />
        </div>

        <button
          className="bg-zinc-400 text-black dark:text-white font-bold dark:bg-black w-full text-center rounded py-2 dark:hover:bg-zinc-700 hover:bg-zinc-700 hover:text-white ease-in-out
                       transition-colors disabled:bg-zinc-700 cursor-pointer disabled:cursor-progress" disabled={isPending}>
          {isPending ? "Getting info..." : "Check status"}
        </button>
        {state.error && <p className="text-red-400">Error found: {state.error}</p>}
      </form >
    </Container>
  )
}

