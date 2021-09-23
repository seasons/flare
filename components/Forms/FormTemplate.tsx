import { useFormikContext } from "formik"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { imageResize } from "utils/imageResize"

import { Box, Flex } from "@seasons/eclipse"

import { Media } from "../Responsive"
import { Field, FormField } from "./FormField"
import { FormFooter } from "./FormFooter"
import { FormHeader } from "./FormHeader"
import { Picture, Spacer } from "components"

export interface FormTemplateProps {
  headerText: string
  headerDescription: string
  headerLabel?: string
  footerText?: React.ReactFragment
  buttonText?: string
  leftImage?: string
  fields: Field[]
  titleBottomSpacing?: number
  buttonActionName?: string
  contentMaxWidth?: string
}

export const FormTemplate = ({
  headerText,
  headerDescription,
  headerLabel,
  footerText,
  buttonText,
  leftImage,
  fields,
  buttonActionName,
  contentMaxWidth,
}: FormTemplateProps) => {
  const { handleSubmit, isValid: formContextIsValid, isSubmitting, values } = useFormikContext()

  const [clientSide, setClientSide] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && !clientSide) {
      // the SSR forms look way different from the client version so hide render from the server
      setClientSide(true)
    }
  }, [])

  const Content = (platform) => {
    const isDesktop = platform === "desktop"
    const sortedFields = isDesktop ? fields : fields.sort((a, b) => a.mobileOrder - b.mobileOrder)
    const image = imageResize(leftImage, "large")
    return (
      <>
        {isDesktop && image && (
          <ImageContainer py={5}>
            <FixedImageWrapper>
              <Picture src={image} key={image} />
            </FixedImageWrapper>
          </ImageContainer>
        )}
        <Wrapper
          clientSide={clientSide}
          isDesktop={isDesktop}
          contentMaxWidth={contentMaxWidth}
          pl={isDesktop ? [2, 2, 2, 6, 6] : 0}
          mt={isDesktop ? "128px" : 6}
          mb={isDesktop ? 5 : 6}
        >
          <FormHeader
            isDesktop={isDesktop}
            headerText={headerText}
            headerDescription={headerDescription}
            headerLabel={headerLabel}
          />
          <FieldsContainer>
            {sortedFields.map((props, index) => {
              const mobileWidth = ["Email", "Password", "Confirm password"].includes(props.label) ? "100%" : "50%"
              const width = props.fullWidth ? "100%" : isDesktop ? "50%" : mobileWidth

              const paddingLeft = isDesktop ? (props.fullWidth ? 0 : index % 2 === 0 ? 0 : 30) : 1
              const paddingRight = isDesktop ? (props.fullWidth ? 0 : index % 2 === 0 ? 30 : 0) : 1

              return (
                <Box key={props.label} width={width} pl={paddingLeft} pr={paddingRight}>
                  <FormField {...props} />
                </Box>
              )
            })}
          </FieldsContainer>
          {!isDesktop && <Spacer mb={6} />}
        </Wrapper>
      </>
    )
  }

  return (
    <Flex style={{ minHeight: "100%", width: "100%", position: "relative" }}>
      <DesktopMedia greaterThanOrEqual="md">
        <DesktopWrapper>{Content("desktop")}</DesktopWrapper>
      </DesktopMedia>
      <Media lessThan="md">{Content("mobile")}</Media>
      <FormFooter
        buttonActionName={buttonActionName}
        buttonText={buttonText}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        footerText={footerText}
        disabled={!formContextIsValid}
      />
    </Flex>
  )
}

const Wrapper = styled(Box)<{ clientSide: boolean; isDesktop: boolean; contentMaxWidth?: string }>`
  display: flex;
  flex-direction: column;
  max-width: ${(p) => (p.contentMaxWidth ? p.contentMaxWidth : "none")};
  flex: 1;
  justify-content: center;
  opacity: ${(p) => (p.clientSide ? "1" : "0")};
`

const FixedImageWrapper = styled(Box)`
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  overflow: hidden;
`

const DesktopWrapper = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`

const ImageContainer = styled(Box)`
  width: 40%;
  max-width: 500px;
  position: relative;
`

const FieldsContainer = styled(Box)`
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;

  .MuiFormControl-root {
    width: 100%;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: black !important;
    &:hover {
      -webkit-text-fill-color: black;
    }
    &:focus {
      -webkit-text-fill-color: black;
    }
  }
`

const DesktopMedia = styled(Media)`
  display: flex;
  flex: 1;
  flex-direction: row;
`
