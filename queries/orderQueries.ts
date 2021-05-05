import gql from "graphql-tag"
import { OrderFragment_Order } from "@seasons/eclipse"

export const CREATE_DRAFT_ORDER_MUTATION = gql`
  mutation ProductVariantCreateDraftOrder($input: CreateDraftedOrderInput!) {
    createDraftedOrder(input: $input) {
      id
      ...OrderFragment_Order
    }
  }
  ${OrderFragment_Order}
`

export const SUBMIT_ORDER = gql`
  mutation SubmitOrder($input: SubmitOrderInput!) {
    submitOrder(input: $input) {
      id
      ...OrderFragment_Order
    }
  }
  ${OrderFragment_Order}
`
