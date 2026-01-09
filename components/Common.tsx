import React from "react";

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-zinc-300 border-zinc-600 dark:bg-zinc-900 flex flex-col gap-4 rounded px-4 py-2 md:w-1/2 md:max-w-1/2 md:mx-auto mt-2">
      {children}
    </div>
  )
}
