import React, { useState, useEffect } from "react"
import PlacesAutocomplete from "react-places-autocomplete"
import styled from "styled-components"
import { StyledMenuItem } from "../Forms/FormsTemplate"
import uuidv1 from "uuid/v1"
import { TextFieldProps } from "formik-material-ui"
import { TextField as MuiTextField } from "@material-ui/core"
import { sharedInputStyled } from "./TextField"

interface AddressFieldProps extends TextFieldProps {
  onSelect?: (address: any) => void
  id: string
  field: any
  form: any
}

export const AddressField = ({ field, form, id, onSelect, ...props }: AddressFieldProps) => {
  const value = field.value || ""
  const [text, setText] = useState(value)
  const { setFieldValue } = form
  useEffect(() => {
    setText(value)
  }, [value])
  useEffect(() => {
    setFieldValue(id, text)
  }, [text])

  return (
    <PlacesAutocomplete
      {...props}
      value={text}
      onChange={setText}
      onSelect={(_address, placeId) => {
        const request = {
          placeId,
        }

        const placeRequest: Promise<google.maps.places.PlaceResult> = new Promise((resolve, reject) => {
          new google.maps.places.PlacesService(document.createElement("div")).getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              resolve(place)
            } else {
              reject()
            }
          })
        })

        placeRequest.then((data) => {
          const components: any = {}
          if (data.address_components) {
            for (const { long_name, types } of data.address_components) {
              components[types[0]] = long_name
            }

            onSelect &&
              onSelect({
                ...data,
                formattedAddress: {
                  address: `${components.street_number} ${components.route}`,
                  city: components.sublocality_level_1,
                  state: components.administrative_area_level_1,
                  zipCode: components.postal_code,
                },
              })
          }
        })
      }}
      googleCallbackName="myCallbackFunc"
    >
      {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => {
        return (
          <FieldContainer>
            <TextField field={field} form={form} {...props} {...getInputProps()} autocomplete="off" />
            <AddressesContainer>
              {suggestions.map((suggestion) => {
                const style = suggestion.active
                  ? { backgroundColor: "#101010", cursor: "pointer" }
                  : { backgroundColor: "#2e2e2e", cursor: "pointer" }

                const suggestionProps = getSuggestionItemProps(suggestion, {
                  style,
                })

                return (
                  <StyledMenuItem {...suggestionProps} value={suggestion} key={uuidv1()} selected={suggestion.active}>
                    {suggestion.description}
                  </StyledMenuItem>
                )
              })}
            </AddressesContainer>
          </FieldContainer>
        )
      }}
    </PlacesAutocomplete>
  )
}

export const TextField = styled(MuiTextField)`
  ${sharedInputStyled}
`

const FieldContainer = styled.div`
  position: relative;
  width: 100%;
`

const AddressesContainer = styled.div`
  position: absolute;
  z-index: 999;
  left: -25%;
  top: 70px;
  width: 440px;
  border-radius: 5px;
  overflow: hidden;
`
