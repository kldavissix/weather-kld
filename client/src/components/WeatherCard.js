import { HStack } from "@chakra-ui/react"
import dayjs from "dayjs"
import React, { useState, useEffect, useCallback } from "react"
import { titleCase } from "./utils"
import WeatherIcon from "./WeatherIcon"
import {
  faWind,
  faCloudRain,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "./Card"

export const WeatherCard = ({ weather }) => {
  const {
    temp,
    feels_like: feelsLike,
    clouds,
    wind_speed: windSpeed,
    dt: currentTime,
    sunset,
    sunrise,
  } = weather.current

  const { main: mainDescription, description } = weather.current.weather[0]
  const { areaName, currentLocation } = weather

  const { min, max } = weather.daily[0].temp
  const { timezone } = weather
  const { pop } = weather.daily[0]

  const [localDateTime, setLocalDateTime] = useState(null)
  const isDay = currentTime >= sunrise && currentTime <= sunset

  const getLocalDateTime = useCallback(() => {
    const date = new Date()
    const convertedDate = date.toLocaleString("en-US", {
      timeZone: timezone,
    })
    const dayJsDate = dayjs(convertedDate)
    setLocalDateTime(dayJsDate.format("ddd h:mm A"))
  }, [timezone])

  useEffect(() => {
    getLocalDateTime()
  }, [weather, getLocalDateTime])

  const roundedTemp = Math.round(temp)
  const tempMax = Math.round(max)
  const tempMin = Math.round(min)
  const tempFeelsLike = Math.round(feelsLike)
  const weatherDesc = titleCase(description)
  const windMPH = Math.round(windSpeed)
  const precip = Math.round(pop * 100)

  return (
    <div style={{ zIndex: 2 }}>
      <Card>
        <HStack justifyContent={"space-between"} w={"100%"}>
          <div>
            <p
              style={{
                fontWeight: "normal",
                fontSize: "48px",
                padding: 0,
                margin: 0,
              }}
            >{`${roundedTemp}°F`}</p>
          </div>
          <div>
            <WeatherIcon
              isDay={isDay}
              mainDescription={mainDescription}
              description={description}
              clouds={clouds}
              color={"white"}
              size={96}
            />
          </div>
        </HStack>
        <div>
          <HStack>
            <h2 style={{ fontSize: "18pt" }}>{areaName}</h2>
            {currentLocation && <FontAwesomeIcon icon={faLocationDot} />}
          </HStack>
          <p>{localDateTime}</p>
        </div>
        <div>
          <h3>{weatherDesc}</h3>
          <p>{`${tempMax}° / ${tempMin}° Feels Like: ${tempFeelsLike}°`}</p>
        </div>

        <div>
          <HStack>
            <FontAwesomeIcon icon={faWind} />
            <p>{`${windMPH} mph`}</p>
          </HStack>
          <HStack>
            <FontAwesomeIcon icon={faCloudRain} />

            <p>{`${precip}%`}</p>
          </HStack>
        </div>
      </Card>
    </div>
  )
}
