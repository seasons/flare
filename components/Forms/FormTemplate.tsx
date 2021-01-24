import { Picture, ProgressiveImage } from "components"
import { useFormikContext } from "formik"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { imageResize } from "utils/imageResize"
import { IncludesAtLeastOne } from "utils/includesAtLeastOne"

import { Box, Flex, Sans, Spacer } from "@seasons/eclipse"

import { Media } from "../Responsive"
import { FieldDefinition, FormField } from "./FormField"
import { FormFooter } from "./FormFooter"
import { FormHeader } from "./FormHeader"

export interface FormTemplateProps {
  context: any
  headerText: string
  headerDescription: string
  headerLabel?: string
  footerText?: React.ReactFragment
  buttonText?: string
  leftImage?: string
  fieldDefinitionList: FieldDefinition[]
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
  fieldDefinitionList,
  backButton,
  buttonActionName,
}: FormTemplateProps) => {
  const { handleSubmit, isValid: formContextIsValid, isSubmitting, values } = useFormikContext()

  const [clientSide, setClientSide] = useState(false)
  const [thisFormIsValid, setThisFormIsValid] = useState(false)
  const nonCustomFieldNames = fieldDefinitionList.reduce((acc, currentFieldDefinition) => {
    if (!currentFieldDefinition.customElement) {
      return [...acc, currentFieldDefinition.name]
    }
    return acc
  }, [])

  useEffect(() => {
    // Does the form pass validation? Note that we don't check for custom Elements,
    // so a form with only custom elements will fail this validation
    const formValuesIncludesThisForm =
      nonCustomFieldNames?.length === 0 ||
      (nonCustomFieldNames?.length >= 1 && !!values && IncludesAtLeastOne(Object.keys(values), nonCustomFieldNames))
    setThisFormIsValid(!!formContextIsValid && !!formValuesIncludesThisForm)
  }, [thisFormIsValid, values, formContextIsValid])

  useEffect(() => {
    if (typeof window !== "undefined" && !clientSide) {
      // the SSR forms look way different from the client version so hide render from the server
      setClientSide(true)
    }
  }, [])

  const mobileFieldDefinitionList = [...fieldDefinitionList].sort((a, b) => {
    return a.mobileOrder - b.mobileOrder
  })

  return (
    <Flex style={{ minHeight: "100%", width: "100%" }}>
      <DesktopMedia greaterThanOrEqual="md">
        <Flex height="100%" width="100%" flexDirection="row" alignItems="center">
          {leftImage && <ImageContainer url={imageResize(leftImage, "large")} />}
          <Wrapper clientSide={clientSide}>
            <FormHeader
              headerText={headerText}
              headerDescription={headerDescription}
              headerLabel={headerLabel}
              showBackButton={backButton}
            />
            <FieldsContainer px={[2, 2, 2, 5, 5]}>
              {fieldDefinitionList.map((props, index) => (
                <Box key={props.label} width="50%" pl={index % 2 === 0 ? 0 : 50} pr={index % 2 === 0 ? 50 : 0}>
                  <Box>
                    <Spacer mt={4} />
                    <Sans size="3">{props.label}</Sans>
                    <FormField {...props} />
                  </Box>
                </Box>
              ))}
            </FieldsContainer>
          </Wrapper>
        </Flex>
      </DesktopMedia>
      <Media lessThan="md">
        <Wrapper clientSide={clientSide}>
          <FormHeader
            headerText={headerText}
            headerDescription={headerDescription}
            headerLabel={headerLabel}
            showBackButton={backButton}
          />
          <FieldsContainer px={1} pb={150}>
            {mobileFieldDefinitionList.map((props) => {
              const width =
                props.label === "Email" || props.label === "Password" || props.label === "Confirm password"
                  ? "100%"
                  : "50%"
              return (
                <Box key={props.label} width={width} px={1}>
                  <Box>
                    <Spacer mt={4} />
                    <Sans size="3">{props.label}</Sans>
                    <FormField {...props} />
                  </Box>
                </Box>
              )
            })}
          </FieldsContainer>
        </Wrapper>
      </Media>
      <FormFooter
        buttonActionName={buttonActionName}
        buttonText={buttonText}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        footerText={footerText}
        disabled={!thisFormIsValid}
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
