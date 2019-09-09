import React,{useState, useEffect} from 'react';

const Message = ({requiredCountry})=>{
  if(requiredCountry === ''){
    return <p>Nothing to show. Please type something</p>
  }
  return ( 
    <p>Too many countries. Can you be more specific  ?</p>
  )}


const Country = ({theCountry,countries})=>{
  const shownCountry = countries.find(country => country.name.match(theCountry))
  const {name,flag,capital,population,langs,code} = shownCountry
  const[weatherData,setWeatherData] = useState({weather:[{main:'clear',description:'clear' ,icon:'01n'}],wind:{speed : 0, degree:0},main : {temp : 0}})
  useEffect(()=>{
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${capital},${code}&APPID=67bf587d2680b9525ea9b45961de6cc0`)
      .then(response => response.json() )
        .then(data=>{
          setWeatherData(data)
        })
    .catch(error => console.log(error))
  },[capital,code])
  const {weather,wind,main} = weatherData 
  let tempCelsius = `${(main.temp-273.15).toFixed(2)} Celsius`
  let windSpeed = `${(wind.speed * 3.6).toFixed(2)} KpH`
  let weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`
 
  return (
    <div>
      <h1>{name}</h1>
      <img src={flag} alt={name} />
      <h2>Capital :<em> {capital}</em></h2>
      <h2>Population : {population} Citizen </h2>
      <h2>Languages :</h2>
      <ul>
        {langs.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <h2>Weather in {capital} :</h2>
      <h3> Temprature : {tempCelsius}</h3>
      <p>{weather[0].main} : {weather[0].description}</p>
      <img src={weatherIcon} alt={weather[0].description} title={weather[0].description} />
      <h3>Wind : {windSpeed} , direction {wind.deg}</h3>
      
    </div>
  )
}





const App = () => {
  const [requiredCountry, setRequiredCountry] = useState('')
  let [countries, setCountries] = useState([])

  useEffect(()=> {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
        .then(response => setCountries(response))
      .catch(error => console.log(error))
  },[])


  countries = countries.map(country => {
    const langs = country.languages.map(language => language.name)
    return {name : country.name, capital : country.capital , population : country.population, langs, flag : country.flag,code : country.alpha2Code}
  })

  const filterPattern = new RegExp(requiredCountry,'gi')
  const countriesToShow = countries.filter(country => country.name.match(filterPattern))

  

  const listOFCountriesToShow = countriesToShow.map(country => <li key={country.name} >{country.name} <button onClick={()=> setRequiredCountry(country.name)}>Show Country</button> </li>)
  const showList = <ul> {listOFCountriesToShow} </ul> 


  const l = listOFCountriesToShow.length


  
  return (
    <div>
      <h2>Find Your Country</h2>
      <label htmlFor='country' >Type the name of the country : </label>
      <input type='text' value={requiredCountry} id="country" onChange={(event) => setRequiredCountry(event.target.value)} />
      <main>
        {l > 10 ? <Message requiredCountry={requiredCountry} /> : l > 1 ? showList : 
        l === 0 ? "No Country matches your input" : <Country theCountry={countriesToShow[0].name} countries={countries} />}
      </main>
    </div>
  )
}

export default App;
