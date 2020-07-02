import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MenuItem from "@material-ui/core/MenuItem"
import HeaderText from "./HeaderText"
import DetailText from "./DetailText"
import { Field } from "formik"
import { TextField } from "../Fields/TextField"
import { IncludesAtLeastOne } from "../../utils/includesAtLeastOne"
import { SelectField } from "../Fields/SelectField"
import { color } from "../../helpers"
import { BackArrow } from "../SVGs/BackArrow"
import { Box, Flex, Spacer, MaxWidth, Sans } from "../"
import { Button } from "../Button"
import { Media } from "../Responsive"

export interface FormProps {
  context: any
}
export interface FormTemplateProps {
  context: any
  headerText: string
  HeaderDetail?: React.ReactFragment
  footerText?: React.ReactFragment
  buttonText?: string
  fieldDefinitionList: FieldDefinition[]
  backButton?: boolean
  titleBottomSpacing?: number
}

export interface FieldDefinition {
  id?: string
  name?: string
  placeholder: string
  selectOptions?: string[]
  onClick?: () => void
  customElement?: React.ReactNode
  type?: string
  initialValue?: string
  label: string
}

interface FooterProps {
  buttonText?: string
  handleSubmit?: () => void
  isSubmitting?: boolean
  disabled?: boolean
  footerText?: any
  buttonLink?: string
}

const BackButton = ({ onClick }) => {
  return (
    <BackButtonContainer onClick={onClick}>
      <BackArrow />
    </BackButtonContainer>
  )
}

export const FormFooter: React.FC<FooterProps> = ({
  buttonText,
  handleSubmit,
  isSubmitting,
  disabled,
  footerText,
  buttonLink,
}) => {
  const ButtonComponent = () => {
    return (
      <Button
        ml={2}
        variant="primaryBlack"
        onClick={handleSubmit}
        loading={isSubmitting}
        size="medium"
        type="submit"
        disabled={disabled}
      >
        {buttonText}
      </Button>
    )
  }

  return (
    <FormFooterWrapper>
      <FormFooterInnerWrapper flexDirection="row" justifyContent="center" alignContent="centers">
        <MaxWidth>
          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            py={1}
            height={["auto", "63px"]}
            style={{ width: "100%" }}
            px={[2, 0]}
          >
            {!!footerText ? (
              <DetailText my={2} size={["2", "4"]}>
                {footerText}
              </DetailText>
            ) : null}
            {!!buttonText && !!buttonLink ? (
              <a href={buttonLink}>
                <ButtonComponent />
              </a>
            ) : (
              !!buttonText && <ButtonComponent />
            )}
          </Flex>
        </MaxWidth>
      </FormFooterInnerWrapper>
    </FormFooterWrapper>
  )
}

export const FormTemplate = ({
  context,
  headerText,
  HeaderDetail,
  footerText,
  buttonText,
  fieldDefinitionList,
  backButton,
}: FormTemplateProps) => {
  const {
    form: { handleChange, handleBlur, handleSubmit, isValid: formContextIsValid, isSubmitting, setFieldValue, values },
    wizard: { previous },
  } = context
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

  const TextContent = () => {
    return (
      <Box px={2}>
        {backButton && <BackButton onClick={previous} />}
        <Spacer mb={[5, 0]} />
        <Box>
          <HeaderText>{headerText}</HeaderText>
          <Spacer height={8} />
          {!!HeaderDetail ? <StyledDetailText>{HeaderDetail}</StyledDetailText> : null}
        </Box>
        <Spacer height={[5, 40]} />
      </Box>
    )
  }

  const RenderField = (props, breakpoint) => {
    const { selectOptions, id, name, placeholder, customElement, type }: FieldDefinition = props
    const isSelectField = !!selectOptions && Array.isArray(selectOptions)
    return !!customElement ? (
      customElement
    ) : (
      <Field
        component={isSelectField ? SelectField : TextField}
        onChange={isSelectField ? (e) => setFieldValue(name, e.target.value) : handleChange}
        select={isSelectField}
        onBlur={handleBlur}
        name={name}
        placeholder={placeholder}
        type={type || "text"}
      >
        {isSelectField && !!selectOptions
          ? selectOptions.map((v) => {
              return (
                <MenuItem
                  key={v}
                  value={v}
                  style={{
                    fontSize: "16px",
                    fontFamily: "ProximaNova-Medium, sans-serif",
                    backgroundColor: props.selected ? "#e8e8e8" : "#f6f6f6",
                    color: "black",
                    borderBottom: "1px solid #d2d2d2",
                  }}
                >
                  {v}
                </MenuItem>
              )
            })
          : null}
      </Field>
    )
  }

  return (
    <Flex style={{ height: "100%" }}>
      <Media greaterThanOrEqual="md">
        <Flex height="100%" flexDirection="row" alignItems="center">
          <Wrapper clientSide={clientSide}>
            <TextContent />
            <FieldsContainer px={2}>
              {fieldDefinitionList.map((props, index) => (
                <Box key={props.placeholder} width="50%" pl={index % 2 === 0 ? 0 : 50} pr={index % 2 === 0 ? 50 : 0}>
                  <Box>
                    <Spacer mt={4} />
                    <Sans size="3">{props.label}</Sans>
                    {RenderField(props, "md")}
                  </Box>
                </Box>
              ))}
            </FieldsContainer>
          </Wrapper>
        </Flex>
      </Media>
      <Media lessThan="md">
        <Wrapper clientSide={clientSide}>
          <TextContent />
          <FieldsContainer px={1} pb={150}>
            {fieldDefinitionList.map((props, index) => {
              const width = props.label === "Email" ? "100%" : "50%"
              return (
                <Box key={props.placeholder} width={width} px={1}>
                  <Box>
                    <Spacer mt={4} />
                    <Sans size="3">{props.label}</Sans>
                    {RenderField(props, "xs")}
                  </Box>
                </Box>
              )
            })}
          </FieldsContainer>
        </Wrapper>
      </Media>
      <FormFooter
        buttonText={buttonText}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        footerText={footerText}
        disabled={!thisFormIsValid}
      />
    </Flex>
  )
}

const Wrapper = styled(Flex)<{ clientSide }>`
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  opacity: ${(p) => (p.clientSide ? "1" : "0")};
`

const FormFooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${color("white100")};
`

const FormFooterInnerWrapper = styled(Flex)`
  border-top: 1px solid ${color("black10")};
  width: 100%;
`

const FieldsContainer = styled(Flex)`
  flex-direction: row;
  flex-wrap: wrap;

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

const BackButtonContainer = styled.div`
  color: white;
  background: #e8e8e8;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  position: absolute;
  top: 6px;
  left: 6px;
  @media (min-width: 350px) {
    top: 12px;
    left: 12px;
  }
  @media (min-width: 450px) {
    top: 48px;
    left: 48px;
    width: 64px;
    height: 64px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledDetailText = styled(DetailText)`
  position: relative;
  max-width: 150%;
`
