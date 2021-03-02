import gql from "graphql-tag"
import { Order_OrderFragment } from "@seasons/eclipse"

export const CREATE_DRAFT_ORDER_MUTATION = gql`
  mutation ProductVariantCreateDraftOrder($input: CreateDraftedOrderInput!) {
    createDraftedOrder(input: $input) {
      id
      ...Order_OrderFragment
    }
  }
  ${Order_OrderFragment}
`

export const SUBMIT_ORDER = gql`
  mutation SubmitOrder($input: SubmitOrderInput!) {
    submitOrder(input: $input) {
      id
      ...OrderFragment
    }
  }
  ${Order_OrderFragment}
`
