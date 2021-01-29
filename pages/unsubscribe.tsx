import { CheckWithBackground } from "components/SVGs"
import styled from "styled-components"

import { Box, Sans, Spacer } from "../components"
import HeaderText from "../components/Forms/HeaderText"
import { gql, useMutation } from "@apollo/client"
import { useRouter } from "next/router"

export const UNSUBSCRIBE_USER = gql`
  mutation UnsubscribeUser($id: String!) {
    unsubscribeUserFromEmails(id: $id)
  }
`

const UnsubscribePage: React.FC = () => {
  const router = useRouter()
  const [unsubscribeUser] = useMutation(UNSUBSCRIBE_USER)
  if (typeof window !== "undefined") {
    if (!!router.query?.id) {
      unsubscribeUser({ variables: { id: router.query.id } })
    }
  }

  return (
    <>
      <Wrapper px={[2, 2, 2, 5, 5]} style={{ width: "100%" }}>
        <CheckWithBackground />
        <Spacer mb={3} />
        <HeaderText>Sorry to see you go</HeaderText>
        <Spacer mb={1} />
        <Sans size="4" color="black50" style={{ maxWidth: "800px" }}>
          You've been unsubscribed from all marketing communications.
        </Sans>
        <Spacer mb={3} />
      </Wrapper>
    </>
  )
}

const Wrapper = styled(Box)`
  transform: translateY(-50%);
  top: 50%;
  position: absolute;
`

export default UnsubscribePage
