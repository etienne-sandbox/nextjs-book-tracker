import { Books } from "phosphor-react";

export function Logo() {
  return (
    <span className="flex flex-row justify-center items-center gap-4 text-purple-400">
      <Books weight="light" className="w-12 h-12 mt-1" color="currentColor" />
      <span className="text-4xl uppercase tracking-[0.5rem] font-sans font-light">
        Livres
      </span>
    </span>
  );
}
