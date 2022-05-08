import React from "react"
import ReactAnimatedWeather from "react-animated-weather"

/*
CLEAR_DAY
CLEAR_NIGHT
PARTLY_CLOUDY_DAY
PARTLY_CLOUDY_NIGHT
CLOUDY
RAIN
SLEET
SNOW
WIND
FOG
*/

const WeatherIcon = ({
  mainDescription,
  description,
  isDay,
  clouds,
  color,
  size,
}) => {
  const iconMap = (mainDescription, description, isDay, clouds) => {
    switch (mainDescription.toLowerCase()) {
      case "clear":
        return isDay ? "CLEAR_DAY" : "CLEAR_NIGHT"

      case "clouds":
        if (clouds > 59) return "CLOUDY"
        return isDay ? "PARTLY_CLOUDY_DAY" : "PARTLY_CLOUDY_NIGHT"

      case "rain":
      case "drizzle":
      case "thunderstorm":
      case "tornado":
        return "RAIN"

      case "snow":
        return String(description).includes("sleet") ? "SLEET" : "SNOW"

      default:
        return "FOG"
    }
  }

  const icon = iconMap(mainDescription, description, isDay, clouds)

  const defaults = {
    icon,
    color,
    size,
    animate: true,
  }

  return <ReactAnimatedWeather {...defaults} />
}

export default WeatherIcon
