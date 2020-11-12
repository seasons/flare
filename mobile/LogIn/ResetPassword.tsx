import gql from "graphql-tag"
import React, { useState } from "react"
import { BackArrowIcon } from "components/Icons"
import { useMutation } from "@apollo/client"
import { Box, Button, Flex, Sans, Spacer, TextInput } from "components"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { isValidEmail } from "helpers/isValidEmail"
import { color } from "helpers"
import { useAuthContext } from "lib/auth/AuthContext"

const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      message
    }
  }
`

export const ResetPassword: React.FC<{ setShowResetPassword: (reset: boolean) => void }> = ({
  setShowResetPassword,
}) => {
  const { toggleLoginModal, loginModalOpen } = useAuthContext()
  const [email, setEmail] = useState("")
  const [isMutating, setIsMutating] = useState(false)
  const [isEmailComplete, setIsEmailComplete] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const popUpData = {
    title: "Your email didn’t work!",
    note: "We couldn’t find an account tied to this email. Double check and try again.",
    buttonText: "Got it",
    onClose: () => hidePopUp(),
  }

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onError: (error) => {
      console.log("SignIn/ResetPassword.tsx: ", error)
      showPopUp(popUpData)
    },
  })

  const onEmailChange = (val) => {
    setEmail(val)
    setIsEmailComplete(isValidEmail(val))
  }

  const handleSendLink = async () => {
    setIsMutating(true)
    const result = await resetPassword({
      variables: {
        email,
      },
    })

    if (result && result.data && result.data.resetPassword) {
      setIsMutating(false)
      setShowConfirmation(true)
    } else {
      setIsMutating(false)
      showPopUp(popUpData)
    }
  }

  const Confirmation = () => {
    return (
      <Box>
        <Sans size="5">Your password has been reset</Sans>
        <Sans size="3" color="black50">
          We sent an email to {email}.
        </Sans>
        <Spacer mb={5} />
        <Button block onClick={() => toggleLoginModal(false)} variant="primaryWhite">
          Close
        </Button>
      </Box>
    )
  }

  return (
    <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }} py={3}>
      <Box px={2}>
        <Box
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowResetPassword(false)
          }}
        >
          <BackArrowIcon color={color("black100")} />
        </Box>
        <Spacer mb={3} />
        {showConfirmation ? (
          <Confirmation />
        ) : (
          <>
            <Sans size="5">Reset Password</Sans>
            <Sans size="3" color="black50">
              Enter your email and we'll promptly send you a link to reset your password.
            </Sans>
            <Spacer mb={3} />
            <TextInput
              headerText="Your email"
              onChangeText={(_, val) => onEmailChange(val)}
              style={{ width: "100%" }}
            />
            <Spacer mb={5} />
            <Button
              block
              onClick={handleSendLink}
              loading={isMutating}
              disabled={!isEmailComplete || isMutating}
              variant="primaryWhite"
            >
              Reset
            </Button>
          </>
        )}
      </Box>
    </Flex>
  )
}
