import Link from "next/link";
import { Navbar } from "../components/navbar/navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
        <Link href="/agenda" >Agenda</Link>
      </main>
    </>
  );
}
