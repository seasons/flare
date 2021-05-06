import { Sans, Spacer, Flex } from "../../components"
import { SpacerProps } from "components/Spacer"
import { CategoryLoader } from "../../components/Browse/BrowseLoader"
import { color } from "../../helpers"
import styled from "styled-components"

interface BrowseFiltersProps {
  setParam: (param: string) => void
  listItems: any
  title: string
  hideTitle?: boolean
  currentCategory: string | string[]
  currentBrand: string | string[]
  listItemStyle?: React.CSSProperties
  listItemSpacing?: SpacerProps["mb"]
}

export const BrowseFilters: React.FC<BrowseFiltersProps> = ({
  currentCategory,
  listItems,
  currentBrand,
  title,
  hideTitle,
  listItemStyle,
  listItemSpacing = 1,
  setParam,
}) => {
  return (
    <>
      {title && !hideTitle && <Sans size="3">{title}</Sans>}
      <Spacer mb={[0, 2]} />
      {!listItems ? (
        <CategoryLoader />
      ) : (
        listItems.map((item) => {
          const isActive = title === "Designers" ? currentBrand === item.slug : currentCategory === item.slug
          return (
            <div key={item.slug}>
              <Flex flexDirection="row" alignItems="center" onClick={() => setParam(item.slug)}>
                {isActive && <ActiveLine />}
                <Sans size="3" my="2" opacity={isActive ? 1.0 : 0.5} style={{ cursor: "pointer", ...listItemStyle }}>
                  {item.name}
                </Sans>
              </Flex>
              <Spacer mb={listItemSpacing} />
            </div>
          )
        })
      )}
    </>
  )
}

export const ActiveLine = styled.div`
  width: 16px;
  height: 2px;
  margin-right: 8px;
  background-color: ${color("black100")};
`
