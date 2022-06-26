import clsx from "clsx";

const BOOK_STATUS_COLOR = {
  Reading:
    "border-orange-400 bg-orange-100 group-hover:bg-orange-400 hover:bg-orange-500",
  Read: "border-gray-400 bg-gray-100 group-hover:bg-gray-400 hover:bg-gray-500",
  ToRead:
    "border-blue-400 bg-blue-100 group-hover:bg-blue-400 hover:bg-blue-500",
  ToBuy:
    "border-purple-400 bg-purple-100 group-hover:bg-purple-400 hover:bg-purple-500",
};

export function StatusSelect({ status, onChange }) {
  return (
    <select
      className={clsx(
        "rounded px-3 py-1 pr-9 text-base uppercase tracking-wider font-bold flex flex-row items-center gap-2 border text-slate-500  group-hover:shadow-md group-hover:white-carret group-hover:text-white",
        BOOK_STATUS_COLOR[status]
      )}
      value={status}
      onChange={(event) => onChange(event.currentTarget.value)}
    >
      <option value="ToBuy">À acheter</option>
      <option value="ToRead">À lire</option>
      <option value="Reading">En cours</option>
      <option value="Read">Lu</option>
    </select>
  );
}
