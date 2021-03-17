import React, { useContext } from "react"

export const useModalContext = () => useContext(ModalContext)

const ModalContext = React.createContext({
  toggleModal: (show: boolean, children: any) => null,
  modalState: { show: false, children: null },
})

export default ModalContext
