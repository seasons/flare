import React, { useState, useEffect } from "react"
import styled from "styled-components"

export const BlackOverlay: React.SFC = () => {
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowOverlay(true)
    }, 100)
  }, [])

  return <Overlay showOverlay={showOverlay} />
}

const Overlay = styled.div<{ showOverlay }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  pointer-events: ${(p) => (p.showOverlay ? "none" : "auto")};
  background-color: ${(p) => (p.showOverlay ? "black" : "transparent")};
  transition: all 0.5s ease-in;
`
