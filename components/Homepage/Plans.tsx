import { groupByPlanTier } from "components/SignUp/MembershipPlans"
import { PlanTier } from "components/SignUp/PlanTier"
import { color } from "helpers"
import React from "react"
import { Box, Flex, Media, Spacer } from "../"
import { Col, Grid, Row } from "../Grid"
import { useAuthContext } from "lib/auth/AuthContext"
import { useRouter } from "next/router"
import { useDrawerContext } from "components/Drawer/DrawerContext"

export const Plans: React.FC<{ plans: any; allAccessEnabled: boolean }> = ({ plans, allAccessEnabled }) => {
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

  return (
    <Grid px={[2, 2, 2, 5, 5]} pt={[10, 0, 0, 0, 0]}>
      <Row>
        {plansGroupedByTier.map((group, index) => (
          <Col md="6" xs="12" key={index}>
            <Flex key={index} width="100%" height="100%" px={[2, 2, 2, 7, 7]} style={{ position: "relative" }}>
              <Flex flexDirection="column" alignItems="center" width="100%">
                <Spacer pb={[0, 10, 10, 10, 10]} />
                <Box width="100%">
                  <PlanTier group={group} onSelectPlan={onSelectPlan} allAccessEnabled={allAccessEnabled} displayText />
                </Box>
                <Spacer pb={[10, 10, 10, 10, 10]} />
              </Flex>
              <Media greaterThanOrEqual="md">
                {index === 0 && (
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
