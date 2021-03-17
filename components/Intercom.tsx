import { useEffect } from "react"

export const Intercom = () => {
  useEffect(() => {
    ;(window as any).Intercom?.("show")
    return () => {
      ;(window as any).Intercom?.("hide")
    }
  }, [])
  return null
}
