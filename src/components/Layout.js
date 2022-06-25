import Link from "next/link";
import { Logo } from "./Logo";

export function Layout({ children }) {
  return (
    <div className="h-full w-full overflow-hidden flex flex-col items-center justify-center">
      <div className="w-full max-h-full overflow-x-hidden overflow-y-auto flex flex-col items-center">
        <div className="px-4 py-6 sm:py-12 max-w-xl w-full flex flex-col gap-6 text-slate-900">
          <Link href="/">
            <a className="px-6">
              <Logo />
            </a>
          </Link>
          <div className="bg-gray-50 shadow-lg rounded-xl p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
