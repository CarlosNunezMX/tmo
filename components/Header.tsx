import Image from "next/image";

export default function Header() {
  return (
    <header className="flex flex-row p-2 items-center gap-2">
      <Image alt="CarlosNunezMX avatar" className="rounded-full" width={32} height={32} src="/CarlosNunezMX.jpg" />
      <h1 className="font-bold flex items-center gap-2">
        <a href="https://github.com/CarlosNunezMX">CarlosNuñezMX</a> - Tools /
        <a href="https://github.com/CarlosNunezMX/tmo" className="text-xs font-medium border rounded px-2 py-1 dark:hover:bg-zinc-600 dark:bg-zinc-900 bg-zinc-300 hover:bg-zinc-700 hover:text-white dark:border-zinc-600 ">
          TMobile
        </a>
      </h1>
    </header>
  )
}
