import { useDrawerContext } from "components/Drawer/DrawerContext"
import { groupByPlanTier } from "components/SignUp/MembershipPlans"
import { PlanTier } from "components/SignUp/PlanTier"
import { color } from "helpers"
import { useAuthContext } from "lib/auth/AuthContext"
import { useRouter } from "next/router"
import React from "react"
import { imageResize } from "utils/imageResize"

import { Box, Flex, Media, Picture, Spacer } from "../"
import { Col, Grid, Row } from "../Grid"

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

  const image = require("../../public/images/homepage/OutfitGrid-1.jpg")

  return (
    <Grid px={[2, 2, 2, 5, 5]} pt={[10, 0, 0, 0, 0]}>
      <Row>
        <Col md="6" xs="12">
          <Flex
            height="100%"
            width="100%"
            px={[0, 0, 4, 7, 7]}
            pt={[2, 10, 0, 7, 7]}
            pb={[5, 5, 2, 7, 7]}
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
          >
            <Box>
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
                  <PlanTier group={group} onSelectPlan={onSelectPlan} displayText />
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
