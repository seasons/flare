import { Media } from "components"
import React, { useState } from "react"
import styled from "styled-components"
import { useMutation, useQuery } from "@apollo/client"
import { DiscoverBagContent } from "./DiscoverBagContent"
import { GET_DISCOVERY_BAG, GET_DISCOVERY_PRODUCT_VARIANTS } from "./queries"
import { ADD_TO_BAG, DELETE_BAG_ITEM } from "queries/bagQueries"

const PAGE_LENGTH = 16

export const DiscoverBagStep: React.FC<{ onCompleted: () => void }> = ({ onCompleted }) => {
  const [isMutating, setIsMutating] = useState(false)
  const [productCount, setProductCount] = useState(PAGE_LENGTH)
  const { previousData, data = previousData, fetchMore, loading } = useQuery(GET_DISCOVERY_PRODUCT_VARIANTS, {
    variables: {
      first: productCount,
      skip: 0,
      orderBy: "updatedAt_DESC",
    },
  })

  const { data: bagData } = useQuery(GET_DISCOVERY_BAG)

  const [addToBag] = useMutation(ADD_TO_BAG, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      setIsMutating(false)
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_DISCOVERY_BAG,
      },
    ],
  })
  const [removeFromBag] = useMutation(DELETE_BAG_ITEM, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      setIsMutating(false)
    },
  })

  return (
    <>
      <DesktopMedia greaterThanOrEqual="md">
        <DiscoverBagContent
          PAGE_LENGTH={PAGE_LENGTH}
          platform="desktop"
          data={data}
          bagData={bagData}
          addToBag={addToBag}
          removeFromBag={removeFromBag}
          isMutating={isMutating}
          setIsMutating={setIsMutating}
          fetchMore={fetchMore}
          setProductCount={setProductCount}
          productCount={productCount}
          loading={loading}
          onCompleted={onCompleted}
        />
      </DesktopMedia>
      <MobileMedia lessThan="md">
        <DiscoverBagContent
          platform="mobile"
          data={data}
          PAGE_LENGTH={PAGE_LENGTH}
          bagData={bagData}
          addToBag={addToBag}
          removeFromBag={removeFromBag}
          isMutating={isMutating}
          setIsMutating={setIsMutating}
          fetchMore={fetchMore}
          setProductCount={setProductCount}
          productCount={productCount}
          loading={loading}
          onCompleted={onCompleted}
        />
      </MobileMedia>
    </>
  )
}

const DesktopMedia = styled(Media)`
  height: 100%;
  width: 100%;
  position: relative;
`

const MobileMedia = styled(Media)`
  width: 100%;
  position: relative;
`
