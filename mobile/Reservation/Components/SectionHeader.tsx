import React from "react"
import { Flex, Sans, Separator, Spacer, Box } from "components"

export const SectionHeader: React.FC<{
  title: string
  rightText?: string
  onPressRightText?: () => void
}> = ({ title, onPressRightText, rightText }) => {
  return (
    <>
      <Flex flexDirection="row" width="100%" justifyContent={!!rightText ? "space-between" : "flex-start"}>
        <Sans size="3" color="black">
          {title}
        </Sans>
        {!!rightText && (
          <>
            {!!onPressRightText ? (
              <Box onClick={onPressRightText}>
                <Sans size="3" color="blue" underline>
                  {rightText}
                </Sans>
              </Box>
            ) : (
              <Sans size="3" color="black">
                {rightText}
              </Sans>
            )}
          </>
        )}
      </Flex>
      <Spacer mb={1} />
      <Separator />
    </>
  )
}
