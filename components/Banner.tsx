import React, { useState } from "react"
import styled, { css } from "styled-components"
import { MaxWidth } from "./MaxWidth"
// import { Formik, Field, Form, FormikHelpers } from "formik"
// import { Field } from "./Forms/FormsTemplate"
import * as Yup from "yup"
import { Sans, Flex } from "./"
import { Button } from "./Button"
import { gql } from "apollo-boost"
import { useMutation, useLazyQuery } from "@apollo/react-hooks"
import { color } from "../helpers/color"
import Link from "next/link"
import { buttonStyle } from "styled-system"

enum ViewOptions {
  EnterZip = "EnterZip",
  Thanks = "Thanks",
  Sorry = "Sorry",
  GoodNews = "GoodNews",
}

const Color = {
  EnterZip: color("black04"),
  ThankYou: color("black100"),
  VerySorry: color("black50"),
  BuenoNews: color("black25"),
}

const SUBMIT_ZIP_CODE_EMAIL = gql`
  mutation createInterestedUser($email: String!, $zipCode: String) {
    createInterestedUser(email: $email, zipCode: $zipCode) {
      id
    }
  }
`

const SUBMIT_ZIP_CODE = gql`
  query zipcodeServiced($zipCode: String!) {
    zipcodeServiced(zipCode: $zipCode)
  }
`

const zipCodeAndEmailValidation = Yup.object().shape({
  email: Yup.string().trim().required("Required").email("Invalid email"),
  zipCode: Yup.string()
    .trim()
    .required("Please enter a ZIP")
    .matches(/^[0-9]{5}$/, "Must be exactly 5 digits"),
})

const Banner: React.FC<{}> = () => {
  const [currentView, setCurrentView] = useState(ViewOptions.EnterZip)
  const [showBanner, setShowBanner] = useState(true)
  //   const [changeColor, setChangeColor] = useState(ViewOptionsColors.GetZip)
  const [email, setEmail] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [submitZipCodeAndEmail] = useMutation(SUBMIT_ZIP_CODE_EMAIL)
  const [getZip, { data }] = useLazyQuery(SUBMIT_ZIP_CODE)

  let text = ""

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

  const EnterYourZipCode = () => {
    return (
      <Flex>
        <ZipContainer>
          <form>
            <input
              type="tel"
              inputMode="numeric"
              name="zipCode"
              value={zipCode}
              placeholder="Enter your ZIP"
              onChange={(e) => {
                setZipCode(e.target.value)
              }}
            ></input>
          </form>
          {/* validationSchema={zipCodeAndEmailValidation} */}
        </ZipContainer>
        <Button
          size="medium"
          onClick={() => {
            console.log(`Hi I am working!`)
          }}
        >
          Submit
        </Button>
      </Flex>
    )
  }

  const ZipLink = () => {
    return (
      <Flex>
        <Link href="/signup">
          <Button onClick={() => setCurrentView(ViewOptions.GoodNews)}>Apply for membership</Button>
        </Link>
      </Flex>
    )
  }

  const EnterYourEmail = () => {
    return (
      <Flex>
        <EmailContainer>
          <form>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            ></input>
          </form>
          {/* validationSchema={zipCodeAndEmailValidation} */}
        </EmailContainer>
        {/* <Button onClick={emailHandleSubmit}>Submit</Button> */}
      </Flex>
    )
  }

  zipCodeAndEmailValidation.isValid(EnterYourZipCode, EnterYourEmail).then(function (valid) {
    valid
  })

  const zipcodeHandleSubmit = (e, valid) => {
    getZip({
      variables: {
        zipCode,
      },
    })
    if (e === valid) {
      return ViewOptions.GoodNews
    } else {
      return ViewOptions.Sorry
    }
    e.preventDefault()
  }

  const emailHandleSubmit = (e, valid) => {
    submitZipCodeAndEmail({
      variables: {
        email,
        zipCode,
      },
    })
    if (e === valid) {
      return ViewOptions.Thanks
    } else {
      e.preventDefault()
    }
  }

  const Step = ({ view }) => {
    switch (view) {
      case ViewOptions.EnterZip:
        return <EnterYourZipCode />
      case ViewOptions.GoodNews:
        return <ZipLink />
      case ViewOptions.Sorry:
        return <EnterYourEmail />
      case ViewOptions.Thanks:
        return <>{text}</>
      default:
        return <></>
    }
  }
  //   let show = Boolean

  // const handleClose = () => setShowBanner(false)

  // const onClose = () => void

  return (
    <BannerContainer background={Color[currentView]}>
      <MaxWidth>
        <Flex flexDirection="row" width="100%" justifyContent="space-between" px={[2, 2, 2, 5, 5]}>
          <Flex>
            <CloseWrap>
              <span id="close" onClick={() => setShowBanner(false)}>
                X
              </span>
            </CloseWrap>
            <TextContainer>
              <Sans size="4">{text}</Sans>
            </TextContainer>
          </Flex>

          <Step view={currentView} />
        </Flex>
      </MaxWidth>
    </BannerContainer>
  )
}

const CloseWrap = styled.div`
  margin-top: 4px;
  padding-right: 20px;
  padding-top: 10px;
`
const ZipContainer = styled.div`
  height: 100px;
  border: none;
  padding: 10px;
  margin: 10px;
`

// const ButtonContainer = styled.div`
//   display: flex;
//   position: fixed;
//   background-color: ${color("white100")};
//   width: 100%;
//   z-index: 3;
//   bottom: 0;
//   border-top: 1px solid ${color("black10")};
// `

const TextContainer = styled.div`
  padding-top: 10px;
`

const EmailContainer = styled.div`
  height: 100px;
  border: none;
  padding: 10px;
  margin: 10px;
`

const BannerContainer = styled.div<{ background: string }>`
  bottom: 0;
  left: 0;
  position: fixed;
  background: ${(p) => p.background};
  color: ${color("black50")};
  display: flex;
  flex-direction: column, row;
  box-sizing: border-box;
  margin: auto;
  border-top: solid ${color("black25")};
  width: 100%;
  height: 58.5px;
  align-items: center;
  z-index: 50;
`

export default Banner
