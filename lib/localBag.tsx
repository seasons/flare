import { makeVar } from "@apollo/client"

interface LocalBagItem {
  productID: string
  variantID: string
}

const localStorage: Storage = typeof window !== "undefined" ? window?.localStorage : null

const initialState = JSON.parse(localStorage?.getItem("localBag") || "[]")

export const localBagVar = makeVar(initialState)

export const isItemInLocalBag = (item: LocalBagItem) => {
  const currentBag = localBagVar()
  return !!currentBag.find((a) => a.productID === item.productID)
}

export const addToLocalBag = (item: LocalBagItem) => {
  const updatedBag = [...localBagVar(), item]
  localBagVar(updatedBag)
  localStorage?.setItem("localBag", JSON.stringify(updatedBag))
  return updatedBag
}

export const removeFromLocalBag = (item: LocalBagItem) => {
  const currentBag = localBagVar()
  const updatedBag = currentBag.filter((i) => i.productID !== item.productID)
  localStorage?.setItem("localBag", JSON.stringify(updatedBag))
  return updatedBag
}

export const addOrRemoveFromLocalBag = (item: LocalBagItem) => {
  const currentBag = localBagVar()
  const hasItem = !!currentBag.find((a) => a.productID === item.productID)
  return hasItem ? removeFromLocalBag(item) : addToLocalBag(item)
}
