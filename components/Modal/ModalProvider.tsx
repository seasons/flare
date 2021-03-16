import React, { useReducer } from "react"
import ModalContext from "./ModalContext"

enum ModalAction {
  Show = "SHOW",
  Hide = "HIDE",
}

export const ModalProvider = ({ children }) => {
  const [modalState, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case ModalAction.Show:
          return {
            ...prevState,
            show: true,
          }
        case ModalAction.Hide:
          return {
            ...prevState,
            show: false,
          }
      }
    },
    {
      show: false,
    }
  )

  const modalContext = {
    toggleModal: async (show: boolean) => {
      if (show) {
        dispatch({ type: ModalAction.Show })
      } else {
        dispatch({ type: ModalAction.Hide })
      }
    },
    modalState,
  }

  return <ModalContext.Provider value={modalContext}>{children}</ModalContext.Provider>
}
