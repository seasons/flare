import { MaxWidth } from "components"
import { Button } from "components/Button"
import { color } from "helpers"
import React from "react"
import styled from "styled-components"
import { Schema, useTracking } from "utils/analytics"

import { Flex, Sans } from "@seasons/eclipse"

interface FormFooterProps {
  buttonActionName?: string
  buttonText?: string
  handleSubmit?: () => void
  isSubmitting?: boolean
  disabled?: boolean
  footerText?: any
  buttonLink?: string
}

export const FormFooter: React.FC<FormFooterProps> = ({
  buttonText,
  handleSubmit,
  isSubmitting,
  disabled,
  footerText,
  buttonLink,
  buttonActionName,
}) => {
  const tracking = useTracking()

  return (
    <FormFooterWrapper>
      <FormFooterInnerWrapper>
        <MaxWidth>
          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            py={1}
            height={["auto", "63px"]}
            style={{ width: "100%" }}
            px={[2, 2, 2, 5, 5]}
          >
            {!!footerText ? (
              <Sans color="black50" my={2} size={["2", "4"]}>
                {footerText}
              </Sans>
            ) : null}
            {!!buttonText && !!buttonLink ? (
              <a href={buttonLink}>
                <SubmitButton
                  buttonActionName={buttonActionName}
                  tracking={tracking}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  disabled={disabled}
                  buttonText={buttonText}
                />
              </a>
            ) : (
              !!buttonText && (
                <SubmitButton
                  buttonActionName={buttonActionName}
                  tracking={tracking}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  disabled={disabled}
                  buttonText={buttonText}
                />
              )
            )}
          </Flex>
        </MaxWidth>
      </FormFooterInnerWrapper>
    </FormFooterWrapper>
  )
}

const SubmitButton = ({ buttonActionName, tracking, handleSubmit, isSubmitting, disabled, buttonText }) => {
  return (
    <Button
      ml={2}
      variant="primaryBlack"
      onClick={() => {
        if (!!buttonActionName) {
          tracking.trackEvent({
            actionName: buttonActionName,
            actionType: Schema.ActionTypes.Tap,
          })
        }
        handleSubmit()
      }}
      loading={isSubmitting}
      size="medium"
      type="submit"
      disabled={disabled}
    >
      {buttonText}
    </Button>
  )
}

export const FormFooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${color("white100")};
`

export const FormFooterInnerWrapper = styled("div")`
  border-top: 1px solid ${color("black10")};
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  margin-bottom: 5px;
`