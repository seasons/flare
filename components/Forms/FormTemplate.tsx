import { useFormikContext } from "formik"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { imageResize } from "utils/imageResize"

import { Box, Flex } from "@seasons/eclipse"

import { Media } from "../Responsive"
import { Field, FormField } from "./FormField"
import { FormFooter } from "./FormFooter"
import { FormHeader } from "./FormHeader"

export interface FormTemplateProps {
  headerText: string
  headerDescription: string
  headerLabel?: string
  footerText?: React.ReactFragment
  buttonText?: string
  leftImage?: string
  fields: Field[]
  backButton?: boolean
  titleBottomSpacing?: number
  buttonActionName?: string
}

export const FormTemplate = ({
  headerText,
  headerDescription,
  headerLabel,
  footerText,
  buttonText,
  leftImage,
  fields,
  backButton,
  buttonActionName,
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

    return (
      <>
        {isDesktop && leftImage && <ImageContainer url={imageResize(leftImage, "large")} />}
        <Wrapper clientSide={clientSide}>
          <FormHeader
            headerText={headerText}
            headerDescription={headerDescription}
            headerLabel={headerLabel}
            showBackButton={backButton}
          />
          <FieldsContainer px={isDesktop ? [2, 2, 2, 5, 5] : 1} pb={isDesktop ? 0 : 150}>
            {sortedFields.map((props, index) => {
              const mobileWidth = ["Email", "Password", "Confirm password"].includes(props.label) ? "100%" : "50%"
              const width = isDesktop ? "50%" : mobileWidth

              return (
                <Box
                  key={props.label}
                  width={width}
                  pl={isDesktop ? (index % 2 === 0 ? 0 : 30) : 1}
                  pr={isDesktop ? (index % 2 === 0 ? 30 : 0) : 1}
                >
                  <FormField {...props} />
                </Box>
              )
            })}
          </FieldsContainer>
        </Wrapper>
      </>
    )
  }

  return (
    <Flex style={{ minHeight: "100%", width: "100%" }}>
      <DesktopMedia greaterThanOrEqual="md">
        <Flex height="100%" width="100%" flexDirection="row" alignItems="center">
          {Content("desktop")}
        </Flex>
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

const Wrapper = styled("div")<{ clientSide }>`
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  display: flex;
  flex: 1;
  height: 100%;
  opacity: ${(p) => (p.clientSide ? "1" : "0")};
`

const ImageContainer = styled(Box)<{ url?: string }>`
  width: 560px;
  height: 100%;
  background: url(${(p) => p.url}) no-repeat center center;
  background-size: cover;
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
  height: 100%;
`
