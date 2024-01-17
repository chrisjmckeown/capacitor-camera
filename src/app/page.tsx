"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col max-w-5xl w-full items-center justify-between gap-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Photo capture
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Showcasing photo upload
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            Desktop uses
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              canvas
            </code>
            for video feed and
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              &lt;input type=&quot;file&quot; accept=&quot;image/*&quot;/&gt;
            </code>
            for file upload.
          </li>
          <li>
            Mobile uses
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              &lt;input type=&quot;file&quot; accept=&quot;image/*&quot;/&gt;
            </code>
            to access the phones native file or photo capture options.
          </li>
          <li>
            Native mobile uses
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              &lt;input type=&quot;file&quot; accept=&quot;image/*&quot;
              capture=&quot;environment&quot;/&gt;
            </code>
            to access the phones native file or photo capture options.
          </li>
        </ul>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/guestPhoto"
        >
          Guest Photo
        </Link>
      </div>
    </main>
  );
}
