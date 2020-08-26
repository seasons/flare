import React from "react"
import { Button, AppBar, Toolbar, Typography, Grid, Card } from "@material-ui/core"
import styled from "styled-components"
import { MaxWidth } from "./MaxWidth"
import { Formik, Field, Form, FormikHelpers } from "formik"
// import { color } from "./helpers/color"

export interface BannerProps {
  email: string
  zipCode: string
  onClose: () => void
}

const Banner: React.FC<BannerProps> = ({ email, zipCode, onClose }) => {
  return (
    <BannerContainer>
      <MaxWidth>
        <StyleDiv>
          <CloseWrap onClick={onClose}>
            <span>X</span>
          </CloseWrap>
          <p>Exclusively in select cities. Make sure we're in your area: </p>
          <Formik
            initialValues={{
              zipCode: "",
              email: "",
              onClose: null,
            }}
            onSubmit={(values: BannerProps, { setSubmitting }: FormikHelpers<BannerProps>) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
              }, 500)
            }}
          >
            <Form>
              <Field id="zipCode" name="zipCode" placeholder="Enter ZIP code" />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </StyleDiv>
      </MaxWidth>
    </BannerContainer>
  )
}

const StyleDiv = styled.div``

const CloseWrap = styled.div``
/**
 * div color temporary just testing it out
 */
const BannerContainer = styled.div`
  bottom: 0;
  left: 0;
  background-color: pink;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  z-index: 100;
  width: 100%;
  height: 58.5px;
  align-items: center;
`

export default Banner
