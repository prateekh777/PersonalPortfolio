import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built with React, Express & Shadcn UI
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/dashboard">
            <a className="text-sm underline">Admin</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
