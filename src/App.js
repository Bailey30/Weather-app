import { useEffect, useState } from "react"

import Rain from "./images/Rain.png"
import Clear from "./images/Clear.png"
import LightDrizzleAndRain from "./images/Light drizzle and rain.png"
import LightRainShower from "./images/Light rain shower.png"
import LightRain from "./images/Light rain.png"
import PartlyCloudy from "./images/Partly cloudy.png"
import PatchyRainPossible from "./images/Patchy rain possible.png"
import Sunny from "./images/Sunny.png"
import Wind from "./images/wind.png"





const App = () => {
  const [weather, setWeather] = useState("")

  const [city, setCity] = useState("")
  const [saveCity, setSaveCity] = useState("")
  const [error, setError] = useState(
    {
      error: false,
      message: ""
    }
  )
  const [showResults, setShowResults] = useState(false)
  const [d, setD] = useState(new Date().toUTCString())

  const [dayOfWeek, setDayOfWeek] = useState(new Date().getDay())
  const [dayNames, setDayNames] = useState(["sun", "mon", "tues", "wed", "thurs", "fri", "sat",])
  // "mon","tues","wed","thurs", "fri", "sat", "sun"
  const [day1, setDay1] = useState("")
  const [day2, setDay2] = useState("")
  const [day3, setDay3] = useState("")
    

  console.log(dayOfWeek);
  const handler = async (city) => {

    try {
      setShowResults(true)
      const response = await fetch(`https://goweather.herokuapp.com/weather/${city}`)

      setCity(saveCity)

      


      if (response.status !== 200) {
        throw new Error("oops")
      } const data = await response.json()
      setWeather(data)
      console.log(weather.forecast);
    }
    catch (error) {
      setError({ error: true, message: error.message })
    }

  }
  if (error.error) {
    console.log(error.message);
    return <h1>{error.message}</h1>
  }


  const cityHandler = (e) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowDay = tomorrow.getDay()

    const dayAfterTomorrow = new Date(today)
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
    const dayAfterTomorrowDay = dayAfterTomorrow.getDay()

    const inTwoDays = new Date(today)
    inTwoDays.setDate(inTwoDays.getDate() + 3)
    const inTwoDaysDay = inTwoDays.getDay()

    setDay1(tomorrowDay)
    setDay2(dayAfterTomorrowDay)
    setDay3(inTwoDaysDay)

    setSaveCity(e.target.value)

  }



  return (
    <div className="app">
        {showResults ? <City city={city} /> &&
      
      <div className="resultscont">
        <Results weather={weather} city={saveCity} d={d} />
      <div className="forecastcont">
        {weather && weather.forecast.map((weather, index) => {
          return <DayForecast weather={weather} dayOfWeek={dayOfWeek} dayNames={dayNames} day1={day1} day2={day2} day3={day3}></DayForecast>
        })}</div>
      </div>

      : null}

      <div className="cityInput">
        <input className="input" type="text" onChange={(e) => cityHandler(e)}></input>
        <button className="btn" onClick={() => handler(saveCity)}>ENTER CITY</button>
      </div>
    </div>
  )
}

const DayForecast = (props) => {
  const { temperature, day } = props.weather
  return (
    <div className="forecast">
      <p className="dayfont">{
      day === "1" ? props.dayNames[props.day1] :
        day === "2" ? props.dayNames[props.day2] :
          day === "3" ? props.dayNames[props.day3] : null
          } </p>
      <p className="forecasttempfont">{temperature}</p>
    </div>
  )
}

const City = (props) => {
  return (
    <h1>{props.city}</h1>
  )
}

const Results = (props) => {
  const { description, temperature, wind } = props.weather

  return (
  <>
    <img className="weatherimg" src={description === "Partly cloudy" ? PartlyCloudy
      : description === "Rain" ?
        Rain
        : description === "Sunny" ?
          Sunny
          : description === "Patchy rain possible" ?
            PatchyRainPossible
            : description === "Light Rain" ?
              LightRain
              : description === "Light rain shower" ?
                LightRainShower
                : description === "Light drizzle and rain" ?
                  LightDrizzleAndRain
                  : description === "Clear" ?
                    Clear : null} alt="weather" />
    <p className="descriptionfont">{description}</p>
    <p className="datefont">{props.d}</p>
    <p className="tempfont">{temperature}</p>
    <div className="wind"><div className="windcont m10"><img className="windimg" src={Wind} alt="wind" /></div><p className="m10">{wind}</p></div>
  </>
  )
}

export default App