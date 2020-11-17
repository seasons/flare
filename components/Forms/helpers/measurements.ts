import SelectItem from "../SelectItem"

const heights: SelectItem[] = (() => {
  const totalInches = (feet: number, inches: number) => 12 * feet + inches
  let items: SelectItem[] = [{ label: "4'11\"", value: totalInches(4, 11) }]
  new Array(5, 6).forEach((feet) => {
    items.push({ label: `${feet}\'`, value: totalInches(feet, 0) })
    for (let inches = 1; inches < 12; inches++) {
      items.push({ label: `${feet}\'${inches}\"`, value: totalInches(feet, inches) })
    }
  })
  return items
})()

const weights: SelectItem[] = (() => {
  const items: SelectItem[] = []
  for (let weight = 90; weight <= 240; weight += 10) {
    items.push({ label: `${weight} - ${weight + 10}lbs`, value: [weight, weight + 10] })
  }
  return items
})()

const topSizes: SelectItem[] = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
  { label: "XXXL", value: "XXXL" },
]

const waistSizes: SelectItem[] = (() => {
  const items: SelectItem[] = []
  for (let waistSize = 28; waistSize <= 40; waistSize++) {
    items.push({ label: String(waistSize), value: waistSize })
  }
  return items
})()

const fits: SelectItem[] = [
  { label: "Sometimes too small", value: "Small" },
  { label: "It fits me every time", value: "Perfect" },
  { label: "Sometimes too big", value: "Big" },
]

export const customerMeasurements = {
  heights,
  weights,
  topSizes,
  waistSizes,
  fits,
}
