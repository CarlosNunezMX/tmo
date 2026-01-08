import Image from "next/image";

export default function Header() {
  return (
    <header className="flex flex-row p-2 items-center gap-2">
      <Image alt="CarlosNunezMX avatar" className="rounded-full" width={32} height={32} src="/CarlosNunezMX.jpg" />
      <h1 className="font-bold flex items-center gap-2">CarlosNuñezMX - Tools /
        <span className="text-xs font-medium border rounded px-2 py-1 dark:bg-zinc-900 dark:border-zinc-600 ">
          TMobile
        </span>
      </h1>
    </header>
  )
}
