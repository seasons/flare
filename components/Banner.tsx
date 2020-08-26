import React, { useState } from "react"
import styled from "styled-components"
import { MaxWidth } from "./MaxWidth"
import { Formik, Field, Form, FormikHelpers } from "formik"
import { Sans, Flex } from "./"
import { Button } from "./Button"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

// import { color } from "./helpers/color"

enum ViewOptions {
  EnterZip = 1,
  Thanks = 2,
  Sorry = 3,
  GoodNews = 4,
}

const SUBMIT_ZIP_CODE_EMAIL = gql`
  mutation SubmitZipCodeEmail($email: String!, $zipCode: String!) {
    submitZipCodeAndEmail(email: $email, zipCode: $zipCode) {
      id
    }
  }
`

const SUBMIT_ZIP_CODE= gql`
  mutation SubmitZipCode( $zipCode: String!) {
    submitZipCode( zipCode: $zipCode) {
      id
    }
  }
`

const Banner: React.FC = () => {
  const [currentView, setCurrentView] = useState(ViewOptions.EnterZip)
  const [email, setEmail] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [submitZipCodeAndEmail] = useMutation(SUBMIT_ZIP_CODE_EMAIL)
  const [submitZipCode] = useMutation(SUBMIT_ZIP_CODE)
  let text = ""

  const zipCodeSubmit = async () => {
    await submitZipCode({
      variables: {
        zipCode,
      },
    })
  }

  const emailSubmit = async () => {
    await submitZipCodeAndEmail({
      variables: {
        email,
        zipCode,
      },
    })
  }

  switch (currentView) {
    case ViewOptions.EnterZip:
      text = "Exclusively in select cities. Make sure we're in your area:"
      break
    case ViewOptions.Thanks:
      text = "Thanks for your interest. We'll let you know when we're in your area."
      break
    case ViewOptions.GoodNews:
      text = "Good news. It looks like we're in your area."
      break
    case ViewOptions.Sorry:
      text = "Sorry, your ZIP is outside of our service area.Get notified when we're in your city."
    default:
      break
  }

  const ZipLink= () => {
    return (
      <Flex>
        <Field
          name="zipCode"
          placeholder="Enter your ZIP"
          onChange={(e) => {
            setZipCode(e.target.value) //here I'd need to do a hyperLink to membership form
          }}
        />
        <Button onClick={zipCodeSubmit}>Submit</Button>
      </Flex>
    )
  }
  

  const EnterYourEmail = () => {
    return (
      <Flex>
        <Field
          name="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <Button onClick={emailSubmit}>Submit</Button>
      </Flex>
    )
  }
  
  const onClose = () => {void}

  return (
    <BannerContainer>
      <MaxWidth>
        <Flex justifyContent="space-between">
          <Flex>
            <CloseWrap onClick={onClose}>
              <span>X</span>
            </CloseWrap>
            <Sans size="4">{text}</Sans>
          </Flex>

          {() => {
              if (currentView === ViewOptions.GoodNews) {
                  return <ZipLink />
              } else { 
                  return null 
              }
          }}

          {() => {
            if (currentView === ViewOptions.Sorry) {
              return <EnterYourEmail />
            } else {
              return null
            }
          }}
        </Flex>

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
  width: 100%;
  height: 58.5px;
  align-items: center;
`

export default Banner
