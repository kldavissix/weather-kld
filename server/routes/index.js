const url = require("url")
const express = require("express")
const router = express.Router()
const axios = require("axios")
const needle = require("needle")

// Env Vars

const API_BASE_WEATHER_URL = process.env.API_BASE_WEATHER_URL
const API_BASE_REVERSE_GEO_URL = process.env.API_BASE_REVERSE_GEO_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// Get Reverse Geo

router.get("/geo", async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    })

    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${API_BASE_REVERSE_GEO_URL}?${params}`)
    }

    const { data } = await axios.get(API_BASE_REVERSE_GEO_URL, { params })

    if (data.length && data[0].name) {
      res.status(200).json({ name: data[0].name })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get Weather

router.get("/", async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      units: "imperial",
      exclude: "hourly,minutely,alerts",

      //   q: "Denver",
      ...url.parse(req.url, true).query,
    })

    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${API_BASE_WEATHER_URL}?${params}`)
    }

    const apiRes = await needle("get", `${API_BASE_WEATHER_URL}?${params}`)
    const data = apiRes.body
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }

  //   const {data} = await axios()
})

module.exports = router
