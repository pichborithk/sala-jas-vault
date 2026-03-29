import { useCallback, useState } from "react"
import type { ToastItem, ToastType } from "../types"

function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3500
    )
  }, [])

  return { toasts, toast }
}

export default useToast