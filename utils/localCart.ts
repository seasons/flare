import { localCartVar } from "lib/apollo/cache"

export const addToLocalCart = (selectedVariantId) => {
  const existingCartItems = localCartVar()
  if (!existingCartItems.includes(selectedVariantId)) {
    const updatedItems = [...existingCartItems, selectedVariantId]
    localCartVar(updatedItems)
    localStorage.setItem("localCartItems", JSON.stringify(updatedItems))
  }
}

export const removeLocalCartItem = (selectedVariantId) => {
  const existingCartItems = localCartVar()
  if (existingCartItems.includes(selectedVariantId)) {
    const updatedItems = existingCartItems.filter((id) => id !== selectedVariantId)
    localCartVar(updatedItems)
    localStorage.setItem("localCartItems", JSON.stringify(updatedItems))
  }
}
