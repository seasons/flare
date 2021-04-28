import { useDrawerContext } from "components/Drawer/DrawerContext"
import { groupByPlanTier } from "components/SignUp/MembershipPlans"
import { PlanTier } from "components/SignUp/PlanTier"
import { color } from "helpers"
import { useAuthContext } from "lib/auth/AuthContext"
import { useRouter } from "next/router"
import React from "react"
import { imageResize } from "utils/imageResize"

import { Box, Display, Flex, Media, Picture, Sans, Spacer } from "components"
import { Col, Grid, Row } from "../Grid"

const image = require("../../public/images/homepage/choosebag.jpg")

export const Plans: React.FC<{ plans: any }> = ({ plans }) => {
  const plansGroupedByTier = groupByPlanTier(plans)
  const { authState } = useAuthContext()
  const { openDrawer } = useDrawerContext()
  const router = useRouter()

  const onSelectPlan = (_plan) => {
    if (authState.isSignedIn) {
      openDrawer("choosePlan", { source: "Update" })
    } else {
      router.push("/signup")
    }
  }

  const Content: React.FC<{ platform: "desktop" | "mobile" }> = ({ platform }) => {
    const isMobile = platform === "mobile"
    const title = "Membership"
    const subtitle = "What's included in a monthly membership"

    return (
      <Grid px={[2, 2, 2, 2, 2]} pt={[10, 0, 0, 0, 0]}>
        <Row>
          <Col md="6" xs="12">
            <Flex
              height="100%"
              width="100%"
              pt={[2, 10, 0, 7, 7]}
              pb={[5, 5, 2, 7, 7]}
              alignItems="center"
              justifyContent="flex-start"
              flexDirection="row"
            >
              <Box style={{ maxWidth: "700px" }}>
                {isMobile && (
                  <>
                    <Display size="9">{title}</Display>
                    <Sans size="4" color="black50">
                      {subtitle}
                    </Sans>
                    <Spacer mb={4} />
                  </>
                )}
                <Picture src={imageResize(image, "large")} alt="A layout of clothing" />
              </Box>
            </Flex>
          </Col>
          {plansGroupedByTier.map((group, index) => (
            <Col md="6" xs="12" key={index}>
              <Flex key={index} width="100%" height="100%" px={[2, 2, 2, 7, 7]} style={{ position: "relative" }}>
                <Flex flexDirection="column" alignItems="center" width="100%" justifyContent="center">
                  <Spacer pb={[0, 10, 10, 10, 10]} />
                  <Flex width="100%" justifyContent="center" flexDirection="row" alignItems="center">
                    <PlanTier
                      group={group}
                      onSelectPlan={onSelectPlan}
                      displayText
                      showButton
                      isMobile={isMobile}
                      title={title}
                      subtitle={subtitle}
                    />
                  </Flex>
                  <Spacer pb={[10, 10, 10, 10, 10]} />
                </Flex>
                <Media greaterThanOrEqual="md">
                  {index === 0 && plansGroupedByTier.length > 1 && (
                    <Box
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        width: "1px",
                        backgroundColor: color("black15"),
                        height: "100%",
                      }}
                    />
                  )}
                </Media>
              </Flex>
            </Col>
          ))}
        </Row>
      </Grid>
    )
  }

  return (
    <>
      <Media greaterThan="sm">
        <Content platform="desktop" />
      </Media>
      <Media lessThan="md">
        <Content platform="mobile" />
      </Media>
    </>
  )
}
