import React from "react"
import { useField } from "formik"
import { SelectionTable, Props as SelectionTableProps, Item } from "../../mobile/GetMeasurementsPane/SelectionTable"

type Props = Pick<SelectionTableProps, "items" | "itemHeight" | "itemWidth"> & {
  inputName: string
  multiple?: boolean
}

export const SelectionTableField: React.FC<Props> = ({ inputName, items, itemHeight, itemWidth, multiple }) => {
  const [{ value }, _, { setValue, setTouched }] = useField<string[]>(inputName)

  const handleTap = (item: Item, _index: number) => {
    if (multiple) {
      const idx = value.findIndex((i) => i === item.value)
      const newValue = [...value].filter(Boolean)
      if (idx === -1) {
        newValue.push(item.value)
      } else {
        newValue.splice(idx, 1)
      }
      setValue(newValue)
    } else {
      setValue([item.value])
    }
  }

  let selectedItemIndices
  if (multiple) {
    selectedItemIndices = value.map((item) => items.findIndex((innerItem) => innerItem.value === item))
  } else {
    selectedItemIndices = [items.findIndex((innerItem) => innerItem.value === value?.[0])]
  }

  return (
    <SelectionTable
      items={items}
      onTap={handleTap}
      selectedItemIndices={selectedItemIndices}
      itemHeight={itemHeight}
      itemWidth={itemWidth}
    />
  )
}
