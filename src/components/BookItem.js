import Link from "next/link";
import useMutation from "use-mutation";
import { StatusSelect } from "./StatusSelect";
import * as api from "../logic/api";
import { useReload } from "../hooks/useReload";
import { StatusIcon } from "./StatusIcon";

export function BookItem({ book }) {
  const reload = useReload();

  const [updateBookStatus] = useMutation(api.updateBookStatus, {
    onSettled: reload,
  });

  return (
    <div className="flex flex-row gap-3 border rounded-md py-2 px-3 items-center relative group border-blue-200 bg-blue-50">
      <StatusIcon status={book.status} />
      <div className="flex flex-col flex-1 relative self-stretch min-h-[44px]">
        <div className="flex flex-col flex-1 absolute inset-0">
          <div className="flex flex-row gap-1 items-center">
            <Link href={`/book/${book.id}`}>
              <a
                className="text-lg group-hover:underline text-slate-900 text-ellipsis truncate"
                onClick={(e) => e.stopPropagation()}
              >
                {book.title}
              </a>
            </Link>
          </div>
          <div className="flex flex-row items-center font-light text-xs gap-2 italic text-slate-500">
            <p>
              {book.year} - {book.author}
            </p>
          </div>
        </div>
      </div>
      <div>
        <StatusSelect
          status={book.status}
          onChange={(status) => {
            updateBookStatus({ bookId: book.id, status });
          }}
        />
      </div>
    </div>
  );
}
