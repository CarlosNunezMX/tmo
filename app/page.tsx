"use client";
import Header from "@/components/Header";
import ElegibilityForm from "@/components/ElegibilityForm";
import { useState } from "react";
import { TMO } from "@carlosnunezmx/tmo-api";
import ActionResponse from "@/lib/actionResponse";
import ElegibilityReport from "@/components/ElegibilityReport";



export default function Home() {
  const [eligibility, setEligibility] = useState<ActionResponse<TMO.Eligibility.Response>>({ data: [], ok: false });
  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <ElegibilityForm onFinish={response => setEligibility(response)} />
      {
        (eligibility.data.length != 0 || eligibility?.error) && <ElegibilityReport error={eligibility.error} data={eligibility.data} ok={eligibility.ok} />
      }
    </div >
  );
}
