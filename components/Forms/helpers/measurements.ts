import SelectItem from "../SelectItem"

const topSizes: SelectItem[] = [
  { label: "XXS", value: "XS" },
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
]

const waistSizes: SelectItem[] = (() => {
  const items: SelectItem[] = [{ label: `26"`, value: 26 }]
  for (let waistSize = 28; waistSize <= 36; waistSize++) {
    items.push({ label: String(waistSize) + `"`, value: waistSize })
  }
  return items
})()

const shoeSizes: SelectItem[] = (() => {
  const items: SelectItem[] = []
  for (let shoeSize = 7; shoeSize <= 14; shoeSize++) {
    items.push({ label: `Size ${shoeSize}`, value: shoeSize })
  }
  return items
})()

const pantLengths: SelectItem[] = [
  { label: `Short 30"`, value: 30 },
  { label: `Short 32"`, value: 32 },
  { label: `Short 34"`, value: 34 },
  { label: `Short 36"`, value: 36 },
]

const fits: SelectItem[] = [
  { label: "Sometimes too small", value: "Small" },
  { label: "It fits me every time", value: "Perfect" },
  { label: "Sometimes too big", value: "Big" },
]

export const customerMeasurements = {
  topSizes,
  waistSizes,
  fits,
  pantLengths,
  shoeSizes,
}
