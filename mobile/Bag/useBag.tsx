import { useAuthContext } from "lib/auth/AuthContext"
import { GET_BAG, GET_LOCAL_BAG_ITEMS } from "queries/bagQueries"
import { useEffect } from "react"

import { useLazyQuery, useQuery } from "@apollo/client"

export const useLocalBag = () => {
  const { data: getLocalBagData } = useQuery(GET_LOCAL_BAG_ITEMS)
  const ids = getLocalBagData?.localBagItems

  const [getLocalBag, { data, refetch }] = useLazyQuery(GET_LOCAL_BAG_ITEMS, {
    variables: {
      ids: ids?.map((i) => i.productID),
    },
  })

  useEffect(() => {
    getLocalBag()
  }, [ids])

  return {
    bagItems:
      data?.products.map((item, i) => ({
        ...ids?.[i],
        ...data?.products?.[i],
        productVariant: item.variants[0],
        status: "Added",
      })) || [],
    refetch,
  }
}

export const useRemoteBag = () => {
  const { previousData, data = previousData, refetch } = useQuery(GET_BAG)

  if (!data) {
    return {
      data: null,
      bagItems: [],
    }
  }

  const me = data.me
  const bagItems =
    me?.bag?.map((item) => ({
      ...item,
      variantID: item.productVariant.id,
      productID: item.productVariant.product.id,
    })) || []

  return {
    data,
    bagItems,
    refetch,
  }
}

export const useBag = () => {
  const { authState } = useAuthContext()

  const isSignedIn = authState.isSignedIn
  const { bagItems: localItems } = useLocalBag()
  const { bagItems: remoteItems, data, refetch } = useRemoteBag()

  const bagItems = !isSignedIn ? localItems : remoteItems

  return {
    data,
    refetch,
    bagItems,
  }
}
