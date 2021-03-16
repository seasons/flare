import React, { useReducer } from "react"
import ModalContext from "./ModalContext"

enum ModalAction {
  Show = "SHOW",
  Hide = "HIDE",
  Clear = "CLEAR",
}

export const ModalProvider = ({ children }) => {
  const [modalState, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case ModalAction.Show:
          return {
            ...prevState,
            children: action.children,
            show: true,
          }
        case ModalAction.Hide:
          return {
            ...prevState,
            show: false,
          }
        case ModalAction.Clear:
          return {
            ...prevState,
            children: null,
            show: false,
          }
      }
    },
    {
      show: false,
      children: null,
    }
  )

  let clearChildren

  const modalContext = {
    toggleModal: async (show: boolean, children) => {
      if (show) {
        dispatch({ type: ModalAction.Show, children })
      } else {
        dispatch({ type: ModalAction.Hide })
        clearChildren = setTimeout(() => {
          dispatch({ type: ModalAction.Clear })
        }, 1000)
      }
    },
    modalState,
  }

  return <ModalContext.Provider value={modalContext}>{children}</ModalContext.Provider>
}
