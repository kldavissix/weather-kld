import axios from "axios"
import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import GetPlaces from "./components/GetPlaces"
import useGetCurrentLocation from "./hooks/useGetCurrentLocation"
import { WeatherCard } from "./components/WeatherCard"
import { VStack, HStack, IconButton, CircularProgress } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"

import imgCold from "./assets/cold-bg.jpg"
import imgWarm from "./assets/warm-bg.jpg"

const App = () => {
  const [placeText, setPlaceText] = useState("")
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null })
  const [weather, setWeather] = useState(null)
  const usingCurrentLocation = useRef(true)
  const [isLoading, setIsLoading] = useState(false)

  const {
    isError: currentLocationError,
    currentCoordinates,
    refreshCurrentLocation,
  } = useGetCurrentLocation()

  if (currentLocationError) {
    alert("Unable to determine current location.")
  }

  useEffect(() => {
    setCoordinates(currentCoordinates)
  }, [currentCoordinates])

  useEffect(() => {
    setIsLoading(true)
    const { lat, lng: lon } = coordinates

    const fetchData = async () => {
      // Fetch Reverse Geo

      let areaName = null

      try {
        const { data } = await axios("/api/geo", {
          params: { lat, lon },
        })
        areaName = data.name
      } catch (error) {
        console.log(error)
      }

      // Fetch Weather

      try {
        const { data } = await axios("/api", {
          params: { lat, lon },
        })
        setWeather({
          ...data,
          areaName,
          currentLocation: usingCurrentLocation.current,
        })
        usingCurrentLocation.current = false
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    if (!lat || !lon) return

    fetchData()
  }, [coordinates])

  const handleRefreshCurrentLocation = () => {
    refreshCurrentLocation()
    setPlaceText("")
    usingCurrentLocation.current = true
  }

  const isWarm = Math.round(weather?.current.temp || 0) >= 60

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {isLoading && (
        <div style={{ zIndex: 5, position: "absolute", top: "140px" }}>
          <CircularProgress
            size="55px"
            color={isWarm ? "#AC518F" : "#6CB1FB"}
            isIndeterminate
          />
        </div>
      )}

      {isWarm && (
        <motion.div
          animate={{ opacity: 0.9 }}
          transition={{ duration: 2 }}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundImage: `url(${imgWarm})`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            height: "100vh",
            width: "430px",
            paddingTop: "10px",
          }}
        />
      )}
      {!isWarm && (
        <motion.div
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundImage: `url(${imgCold})`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            height: "100vh",
            width: "430px",
            paddingTop: "10px",
          }}
        />
      )}

      <VStack>
        <HStack style={{ marginTop: "15px" }}>
          <GetPlaces
            setCoordinates={setCoordinates}
            placeText={placeText}
            setPlaceText={setPlaceText}
          />

          <IconButton
            aria-label="Current Location"
            icon={<FontAwesomeIcon icon={faLocationDot} />}
            size="xs"
            onClick={handleRefreshCurrentLocation}
            border="none"
          />
        </HStack>

        {!!weather && <WeatherCard weather={weather} />}
      </VStack>
    </div>
  )
}

export default App
