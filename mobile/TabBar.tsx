import { Box, Flex, Sans, Separator } from "components"
import { color } from "helpers"
import React from "react"
import { Animated, TouchableWithoutFeedback, View } from "react-native"
import styled from "styled-components"

/**
 * Nearly all props are given by the ScrollableTabView,
 * these are prefixed with Auto:
 */
interface TabBarProps {
  tabColor?: string
  /** Auto: A list of strings for the buttons */
  tabs: Tab[]
  disabledTabs?: string[]
  /** Auto:  A callback for usage in the tab buttons */
  goToPage?: (page: Number) => null | void
  /** Auto: The index of the currently active tab */
  activeTab?: number
  /** Auto: How much horiztonal space do you have */
  containerWidth?: number
  /** Auto: Handled by ScrollableTabView */
  scrollValue?: Animated.AnimatedInterpolation
  /** Should space tabs evenly */
  spaceEvenly?: boolean
  /** Tabs to render with strikethrough */
  strikethroughTabs?: string[]
}

interface Tab {
  name: string
  badgeCount?: number
}

interface TabProps {
  tabLabel: string
}

export const Tab: React.FC<TabProps> = ({ children }) => <View style={{ flex: 1, overflow: "hidden" }}>{children}</View>

export class TabBar extends React.Component<TabBarProps, null> {
  renderTab(name, page, isTabActive, isTabDisabled, onPressHandler, tabColorProps, withStrikeThrough, badgeCount) {
    let tabTextColor
    if (isTabDisabled) {
      tabTextColor = color("black25")
    } else if (isTabActive) {
      tabTextColor = color("black100")
    } else {
      tabTextColor = color("black50")
    }

    return (
      <Button
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => (isTabDisabled ? null : onPressHandler(page))}
      >
        <TabButton spaceEvenly={this.props.spaceEvenly} active={isTabActive} tabColor={tabColorProps}>
          <Flex style={{ position: "relative" }} justifyContent="center" alignItems="center">
            <Sans
              numberOfLines={1}
              inline
              weight="medium"
              size="5"
              color={tabTextColor}
              style={
                withStrikeThrough
                  ? { textDecorationLine: "line-through", textDecorationStyle: "solid", position: "relative" }
                  : { position: "relative" }
              }
            >
              {name}
              {!!badgeCount && badgeCount > 0 && (
                <BadgeCount badgeCount={badgeCount}>
                  <Sans size="2" color="white100" style={{ top: badgeCount > 9 ? 1 : -1 }}>
                    {badgeCount}
                  </Sans>
                </BadgeCount>
              )}
            </Sans>
          </Flex>
        </TabButton>
      </Button>
    )
  }

  render() {
    return (
      <Wrapper>
        <Tabs>
          {this.props.tabs.map(({ name, badgeCount }, index) => {
            const isTabActive = this.props.activeTab === index
            const isTabDisabled = this.props.disabledTabs?.includes(name)
            const withStrikeThrough = this.props.strikethroughTabs?.includes(name)
            return this.renderTab(
              name,
              index,
              isTabActive,
              isTabDisabled,
              this.props.goToPage,
              this.props.tabColor,
              withStrikeThrough,
              badgeCount
            )
          })}
        </Tabs>
        <Separator />
      </Wrapper>
    )
  }
}

const Wrapper = styled(Box)`
  width: 100%;
  cursor: pointer;
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5;
`

const BadgeCount = styled(Box)<{ badgeCount: number }>`
  position: absolute;
  display: flex;
  right: -24px;
  top: 20px;
  background-color: ${color("black100")};
  border-radius: 100%;
  padding: 2px;
  height: 16px;
  width: 16px;
  align-items: center;
  justify-content: center;
`

const Button = styled(TouchableWithoutFeedback)`
  flex: 1;
`

const Tabs = styled(Box)`
  height: 55px;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-around;
`

const TabButton = styled(Box)<{ spaceEvenly?: boolean; active?: boolean; tabColor?: string }>`
  align-items: center;
  justify-content: center;
  padding-top: 5;
  flex-grow: 1;
  border-bottom: ${(p) => (p.active ? `2px solid ${color("black100")}` : "2px solid transparent")};
  ${(p) => p.spaceEvenly && `flex: 1;`};
  ${(p) =>
    p.active &&
    `
    border-color: ${p.tabColor ? p.tabColor : "#000000"};
  `};

  p {
    text-align: center;
    line-height: 55px;
  }
`
