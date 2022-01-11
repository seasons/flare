import { useAuthContext } from "lib/auth/AuthContext"
import { GET_BAG, GET_LOCAL_CART, GET_LOCAL_CART_PRODUCTS } from "queries/bagQueries"
import { useEffect } from "react"

import { useLazyQuery, useQuery } from "@apollo/client"
import { localCartVar } from "lib/apollo/cache"

export const useLocalCart = () => {
  const { data: getLocalCartData } = useQuery(GET_LOCAL_CART)
  const ids = getLocalCartData?.localCartItems

  const localStateItems = localCartVar()

  const [getLocalCart, { data, refetch, loading }] = useLazyQuery(GET_LOCAL_CART_PRODUCTS, {
    variables: {
      ids,
    },
  })

  useEffect(() => {
    getLocalCart()
  }, [ids])

  useEffect(() => {
    if (localStateItems.length === 0) {
      const storedItems = JSON.parse(localStorage.getItem("localCartItems"))
      if (storedItems.length > 0) {
        localCartVar(storedItems)
      }
    }
  }, [localStateItems])

  return {
    cartItems:
      data?.productVariants?.map((item, i) => {
        return {
          ...data?.productVariants?.[i],
          productVariant: item,
          status: "Added",
          isInCart: true,
        }
      }) || [],
    refetch,
    loading,
  }
}

export const useRemoteBag = () => {
  const { previousData, data = previousData, refetch, loading } = useQuery(GET_BAG)

  if (!data) {
    return {
      data: null,
      bagSections: [],
      loading: false,
    }
  }

  return {
    data,
    bagSections: data?.me?.bagSections,
    refetch,
    loading,
  }
}

export const useBag = () => {
  const { authState } = useAuthContext()

  const isSignedIn = authState.isSignedIn
  const { cartItems: localItems, loading: localLoading } = useLocalCart()
  const { bagSections, data, refetch, loading } = useRemoteBag()

  return {
    data,
    refetch,
    bagSections,
    loading: !isSignedIn ? localLoading : loading,
    localCartItems: localItems,
  }
}
