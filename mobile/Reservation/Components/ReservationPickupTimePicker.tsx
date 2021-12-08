import { Box, Button, Spacer, Flex } from "components"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { DateTime } from "luxon"
import React, { useState } from "react"
import styled from "styled-components"
import "react-datepicker/dist/react-datepicker.css"
import { SectionHeader } from "./SectionHeader"
import DatePicker from "react-datepicker"
import { color } from "helpers/color"

export const ReservationPickupTimePicker = ({ timeWindows, onTimeWindowSelected }) => {
  const [selectedTime, setSelectedTime] = useState(null)
  const now = new Date()
  const [date, setDate] = useState(now)
  const currentHour = now.getHours()

  const luxonDate = DateTime.fromJSDate(date)
  const isToday = luxonDate.hasSame(DateTime.local(), "day")

  return (
    <Box mt={3}>
      <SectionHeader title="Select pick-up window" rightText={isToday ? "Today" : luxonDate.toFormat("EEE MMM, d")} />
      <Spacer mt={2} />
      <DatePickerWrapper>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          open
          inline
          maxDate={new Date().setDate(now.getDate() + 21)}
          minDate={now}
        />
      </DatePickerWrapper>
      <Spacer mt={2} />
      <Flex flexDirection="row" flexWrap="wrap">
        {timeWindows?.map((timeWindow, index) => {
          const selected = index === selectedTime
          return (
            <Box key={index} mr={1} pb={1}>
              <Button
                variant={selected ? "primaryWhite" : "secondaryOutline"}
                onClick={() => {
                  setSelectedTime(index)
                  onTimeWindowSelected?.({
                    date,
                    timeWindow,
                  })
                }}
                disabled={isToday ? timeWindow.startTime < currentHour : false}
              >
                {timeWindow.display}
              </Button>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}

const DatePickerWrapper = styled(Box)`
  .react-datepicker__day--weekend {
    pointer-events: none;
    color: #ccc;
  }

  .react-datepicker__header {
    background-color: ${color("black04")};
  }

  .react-datepicker {
    border-radius: 8px;
    overflow: hidden;
  }

  .react-datepicker,
  .react-datepicker__month-container {
    width: 100%;
    font-family: "ProximaNova-Medium", sans-serif;
  }
  .react-datepicker__day-names,
  .react-datepicker__week {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: ${color("black100")};
    border-radius: 100%;
  }

  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__navigation-icon::before {
    border-color: ${color("black100")};
  }
`
