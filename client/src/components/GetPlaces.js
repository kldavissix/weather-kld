// import React, { useState } from "react"

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"

const GetPlaces = ({ setCoordinates, placeText, setPlaceText }) => {
  const handleSelect = async (value) => {
    // Get lat & lng from Google Places

    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setPlaceText(value)
    setCoordinates(latLng)
  }
  const handleNoMatch = (e) => {
    console.log(e)
  }

  return (
    <PlacesAutocomplete
      value={placeText}
      onChange={setPlaceText}
      onSelect={handleSelect}
      onError={handleNoMatch}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <div>
            <input
              {...getInputProps({
                placeholder: "Type location",
                style: {
                  width: "200px",
                  position: "relative",
                  borderRadius: "2px",
                },
              })}
            />
            <div style={{ position: "absolute", zIndex: 1000 }}>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "lightblue" : "#fff",
                  cursor: "pointer",
                }
                return (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                )
              })}
            </div>
          </div>
        )
      }}
    </PlacesAutocomplete>
  )
}

export default GetPlaces
