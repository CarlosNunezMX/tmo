"use client";
import Header from "@/components/Header";
import ElegibilityForm from "@/components/ElegibilityForm";
import { useState } from "react";
import { TMO } from "@carlosnunezmx/tmo-api";
import ActionResponse from "@/lib/actionResponse";
import ElegibilityReport from "@/components/ElegibilityReport";



export default function Home() {
  const [elegibility, setElegibility] = useState<ActionResponse<TMO.Elegibility.Response> | null>(null);
  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <ElegibilityForm onFinish={response => setElegibility(response)} />
      {
        elegibility && <ElegibilityReport error={elegibility.error} data={elegibility.data} ok={elegibility.ok} />
      }
    </div >
  );
}
