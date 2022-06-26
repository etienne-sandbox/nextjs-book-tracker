import clsx from "clsx";
import {
  Book,
  BookBookmark,
  CheckCircle,
  ShoppingCartSimple,
} from "phosphor-react";

const BOOK_STATUS_ICON = {
  Reading: { Icon: BookBookmark, color: "text-orange-400" },
  Read: { Icon: CheckCircle, color: "text-gray-300" },
  ToRead: { Icon: Book, color: "text-blue-400" },
  ToBuy: { Icon: ShoppingCartSimple, color: "text-purple-500" },
};

export function StatusIcon({ status }) {
  const { Icon, color } = BOOK_STATUS_ICON[status];

  return (
    <Icon
      className={clsx("w-8 h-8", color)}
      weight="duotone"
      color="currentColor"
    />
  );
}
