import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem"
import uuidv1 from "uuid/v1"
import HeaderText from "./HeaderText"
import DetailText from "./DetailText"
import { Field } from "formik"
import { TextField } from "../Fields/TextField"
import { IncludesAtLeastOne } from "../../utils/includesAtLeastOne"
import { SelectField } from "../Fields/SelectField"
import { color } from "../../helpers"
import { BackArrow } from "../SVGs/BackArrow"
import { Box, Flex, Spacer } from "../"
import { Button } from "../Button"

export interface FormProps {
  context: any
}
export interface FormTemplateProps {
  context: any
  headerText: string
  HeaderDetail?: React.ReactFragment
  FooterDetail?: React.ReactFragment
  buttonText?: string
  FieldDefinitionList: FieldDefinition[]
  backButton?: boolean
  titleBottomSpacing?: number
}

export interface FieldDefinition {
  id?: string
  name?: string
  label: string
  selectOptions?: string[]
  onClick?: () => void
  customElement?: React.ReactNode
  type?: string
  initialValue?: string
}

export function FormTemplate({
  context,
  headerText,
  HeaderDetail,
  FooterDetail,
  buttonText,
  FieldDefinitionList,
  backButton,
  titleBottomSpacing,
}: FormTemplateProps) {
  const {
    form: {
      handleChange,
      handleBlur,
      handleSubmit,
      isValid: formContextIsValid,
      isSubmitting,
      setFieldValue,
      values,
      touched,
    },
    wizard: { previous },
  } = context
  const [thisFormIsValid, setThisFormIsValid] = useState(false)
  // @ts-ignore
  const nonCustomFieldNames = FieldDefinitionList.reduce(function addFieldNameIfNotCustomElem(
    acc,
    currentFieldDefinition
  ) {
    if (!currentFieldDefinition.customElement) {
      return [...acc, currentFieldDefinition.name]
    }
    return acc
  },
  [])

  useEffect(() => {
    // Does the form pass validation? Note that we don't check for custom Elements,
    // so a form with only custom elements will fail this validation
    const formValuesIncludesThisForm =
      nonCustomFieldNames?.length === 0 ||
      (nonCustomFieldNames?.length >= 1 && !!values && IncludesAtLeastOne(Object.keys(values), nonCustomFieldNames))
    setThisFormIsValid(!!formContextIsValid && !!formValuesIncludesThisForm)
  }, [thisFormIsValid, values, formContextIsValid])

  return (
    <>
      {backButton && <BackButton onClick={previous} />}
      <Spacer height={10} />
      <Box>
        <HeaderText>{headerText}</HeaderText>
        <Spacer height={8} />
        {!!HeaderDetail ? <StyledDetailText>{HeaderDetail}</StyledDetailText> : null}
      </Box>
      <Spacer height={titleBottomSpacing || 40} />
      <FieldsContainer>
        {FieldDefinitionList.map((props) => (
          <Box key={props.label}>{RenderFormRow(props)}</Box>
        ))}
        <Spacer height={20} />
      </FieldsContainer>
      <FormFooterWrapper>
        <FormFooter flexDirection="row" justifyContent="center">
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" py={2} style={{ width: "100%" }}>
            {!!FooterDetail ? (
              <DetailText my={2} size="4">
                {FooterDetail}
              </DetailText>
            ) : null}
            {!!buttonText && (
              <Button
                variant="primaryBlack"
                onClick={handleSubmit}
                loading={isSubmitting}
                size="large"
                type="submit"
                disabled={!thisFormIsValid}
              >
                {buttonText}
              </Button>
            )}
          </Flex>
        </FormFooter>
      </FormFooterWrapper>
    </>
  )

  // *****************************************
  function RenderFormRow({ selectOptions, id, name, label, customElement, type, initialValue }: FieldDefinition) {
    const isSelectField = !!selectOptions && Array.isArray(selectOptions)
    return !!customElement ? (
      customElement
    ) : (
      <Field
        component={isSelectField ? SelectField : TextField}
        onChange={isSelectField ? (e) => setFieldValue(name, e.target.value) : handleChange}
        select={isSelectField}
        onBlur={handleBlur}
        id={id}
        name={name}
        label={label}
        type={type || "text"}
      >
        {isSelectField && !!selectOptions
          ? selectOptions.map((v) => {
              console.log("v", v)
              return (
                <StyledMenuItem value={v} key={uuidv1()}>
                  {v}
                </StyledMenuItem>
              )
            })
          : null}
      </Field>
    )
  }
}

function BackButton({ onClick }) {
  return (
    <BackButtonContainer onClick={onClick}>
      <BackArrow />
    </BackButtonContainer>
  )
}

const FormFooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`

const FormFooter = styled(Flex)`
  border-top: 1px solid ${color("black10")};
  width: 100%;
`

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;

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
}
`

export function StyledMenuItem(props: MenuItemProps): React.ReactElement {
  return (
    // @ts-ignore
    <MenuItem
      {...props}
      style={{
        ...props.style,
        fontFamily: "ProximaNova-Medium, sans-serif",
        backgroundColor: props.selected ? "#e8e8e8" : "#f6f6f6",
        color: "black",
        borderBottom: "1px solid #d2d2d2",
        padding: "12px 16px",
      }}
    />
  )
}
