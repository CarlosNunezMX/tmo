import React from "react";

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <div className="dark:bg-zinc-900 flex flex-col gap-4 dark:border-zinc-600 rounded px-4 py-2 w-1/2 max-w-1/2 mx-auto mt-2">
      {children}
    </div>
  )
}
