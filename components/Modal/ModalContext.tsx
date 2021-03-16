import React, { useContext } from "react"

export const useModalContext = () => useContext(ModalContext)

const ModalContext = React.createContext({
  toggleModal: (show: boolean) => null,
  modalState: { show: false },
})

export default ModalContext
