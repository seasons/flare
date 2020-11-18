import React from "react"
import { useField } from "formik"
import {
  MultiSelectionTable,
  Props as MultiSelectionTableProps,
  Item,
} from "../../mobile/GetMeasurementsPane/MultiSelectionTable"

type Props = Pick<MultiSelectionTableProps, "items" | "itemSize"> & {
  inputName: string
}

export const MultiSelectionTableField: React.FC<Props> = ({ inputName, items, itemSize }) => {
  const [{ value }, _, { setValue, setTouched }] = useField<string[]>(inputName)

  const handleTap = (item: Item, _index: number) => {
    const idx = value.findIndex((i) => i === item.value)
    const newValue = [...value].filter(Boolean)
    if (idx === -1) {
      newValue.push(item.value)
    } else {
      newValue.splice(idx, 1)
    }
    setValue(newValue)
  }

  const selectedItemIndices = value.map((item) => items.findIndex((innerItem) => innerItem.value === item))

  return (
    <MultiSelectionTable
      items={items}
      onTap={handleTap}
      selectedItemIndices={selectedItemIndices}
      itemSize={itemSize}
    />
  )
}
