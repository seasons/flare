import { useAuthContext } from "lib/auth/AuthContext"
import { GET_BAG, GET_LOCAL_BAG, GET_LOCAL_BAG_ITEMS } from "queries/bagQueries"
import { useEffect } from "react"

import { useLazyQuery, useQuery } from "@apollo/client"

export const useLocalBag = () => {
  const { data: getLocalBagData } = useQuery(GET_LOCAL_BAG)
  const ids = getLocalBagData?.localBagItems

  const [getLocalBag, { data, refetch, loading }] = useLazyQuery(GET_LOCAL_BAG_ITEMS, {
    variables: {
      ids: ids?.map((i) => i.variantID),
    },
  })

  useEffect(() => {
    getLocalBag()
  }, [ids])

  return {
    bagItems:
      data?.productVariants?.map((item, i) => {
        return {
          ...ids?.[i],
          ...data?.productVariants?.[i],
          productVariant: item,
          status: "Added",
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
  const { bagItems: localItems, loading: localLoading } = useLocalBag()
  const { bagSections: remoteSections, data, refetch, loading } = useRemoteBag()

  const bagSections = !isSignedIn ? [{ status: "Added", title: "Reserving", bagItems: localItems }] : remoteSections

  return {
    data,
    refetch,
    bagSections,
    loading: !isSignedIn ? localLoading : loading,
  }
}
