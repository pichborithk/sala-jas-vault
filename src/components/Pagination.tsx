import type { ReactNode } from "react"

interface PaginationProps {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPage }: PaginationProps) => {
  if (totalPages <= 1) return null

  const pages: (number | "…")[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…")
    }
  }

  return (
    <div
      className="flex items-center justify-between border-t border-stone-800 bg-stone-900/50 px-4 py-3">
      <span className="font-mono text-[11px] text-stone-500">
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-1">
        <PageBtn onClick={() => onPage(page - 1)}
                 disabled={page <= 1}>‹</PageBtn>
        {pages.map((p, i) =>
          p === "…" ? (
            <PageBtn key={`ellipsis-${i}`} disabled>…</PageBtn>
          ) : (
            <PageBtn key={p} active={p === page}
                     onClick={() => onPage(p as number)}>
              {p}
            </PageBtn>
          )
        )}
        <PageBtn onClick={() => onPage(page + 1)}
                 disabled={page >= totalPages}>›</PageBtn>
      </div>
    </div>
  )
}

interface PageBtnProps {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const PageBtn = ({
                   children,
                   active = false,
                   disabled = false,
                   onClick
                 }: PageBtnProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex h-7 w-7 items-center justify-center rounded border font-mono text-xs transition-all
        ${active
      ? "border-yellow-500 bg-yellow-500 font-bold text-stone-950"
      : disabled
        ? "cursor-default border-stone-800 text-stone-700"
        : "cursor-pointer border-stone-700 bg-stone-800 text-stone-400 hover:border-yellow-700 hover:text-yellow-400"
    }`}
  >
    {children}
  </button>
)

export default Pagination