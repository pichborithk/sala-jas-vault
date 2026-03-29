import { type ReactNode, useEffect } from "react"

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal = ({ open, onClose, title, children, footer }: ModalProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-lg border border-stone-700 bg-stone-900 shadow-2xl animate-[modalIn_0.2s_ease]">
        <div
          className="flex items-center justify-between border-b border-stone-800 px-6 py-5">
          <h2
            className="text-lg font-bold text-stone-100"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-xl leading-none text-stone-500 transition-colors hover:text-stone-200"
          >
            ×
          </button>
        </div>
        <div className="flex flex-col gap-5 px-6 py-6">{children}</div>
        {footer && (
          <div
            className="flex justify-end gap-2 border-t border-stone-800 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal