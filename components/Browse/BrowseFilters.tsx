import { Sans, Spacer, Flex } from "../../components"
import { CategoryLoader } from "../../components/Browse/BrowseLoader"
import Link from "next/link"
import { color } from "../../helpers"
import styled from "styled-components"

interface BrowseFiltersProps {
  setCurrentPage: (boolean) => void
  listItems: any
  title: string
  hideTitle?: boolean
  currentCategory: string | string[]
  currentBrand: string | string[]
}

export const BrowseFilters: React.FC<BrowseFiltersProps> = ({
  setCurrentPage,
  currentCategory,
  listItems,
  currentBrand,
  title,
  hideTitle,
}) => {
  return (
    <>
      {title && !hideTitle && <Sans size="3">{title}</Sans>}
      <Spacer mb={[0, 2]} />
      {!listItems ? (
        <CategoryLoader />
      ) : (
        listItems.map((item) => {
          const query =
            title === "Designers"
              ? { category: currentCategory, brand: item.slug }
              : { category: item.slug, brand: currentBrand }
          const isActive = title === "Designers" ? currentBrand === item.slug : currentCategory === item.slug
          return (
            <div onClick={() => setCurrentPage(1)} key={item.slug}>
              <Link href={{ pathname: "/browse", query }}>
                <Flex flexDirection="row" alignItems="center">
                  {isActive && <ActiveLine />}
                  <Sans size="3" my="2" opacity={isActive ? 1.0 : 0.5} style={{ cursor: "pointer" }}>
                    {item.name}
                  </Sans>
                </Flex>
              </Link>
              <Spacer mb={1} />
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
