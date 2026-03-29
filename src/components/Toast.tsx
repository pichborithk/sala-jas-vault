import type { ToastItem } from "../types"

const ToastContainer = ({ toasts }: { toasts: ToastItem[] }) => (
  <div
    className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`flex items-center gap-3 rounded border bg-stone-800 px-4 py-3 text-sm
            text-stone-100 shadow-2xl pointer-events-auto animate-[slideIn_0.2s_ease]
            ${t.type === "success"
          ? "border-l-4 border-l-emerald-500 border-stone-700"
          : "border-l-4 border-l-red-500 border-stone-700"
        }`}
      >
          <span
            className={t.type === "success" ? "text-emerald-400" : "text-red-400"}>
            {t.type === "success" ? "✓" : "✕"}
          </span>
        {t.message}
      </div>
    ))}
  </div>
)

export default ToastContainer