import React,{useState} from 'react';
import './App.css';
import Weather from './components/weatherbox'
import Form from './components/Form'
import axios from 'axios'

function App() {
  const APi_key="429736441cf3572838aa10530929f7cd"

// state
  const [weather, setweather] = useState({
    city:undefined,
    icon:undefined,
    celsius:undefined,
    temp_max:undefined,
    temp_min:undefined,
    description:"",
    forecast:[]
  })

  const [Error, setError] = useState(false)

  const [weatherdetail, setweatherdetail] = useState(false)

  const [value, setvalue] = useState("")

  const handlechange=e=>{
    setvalue(e.target.value)
    if(value===""){
      setweatherdetail(false)
     setError(false)
    }
  }
  //fonctions
  //  convertit temperature en °C
  const calcelsius=(temp)=>{
    let cel=Math.floor(temp-273.15)
    return cel
  }
   // get date
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  // get weather from Api
 const getapi =async(e)=>{
  e.preventDefault()
    const city = e.target.elements.City.value;
    if (city) 
    {
     const weather =axios.get (`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APi_key}`);
     const forecast =axios.get (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${APi_key}&units=metric`);
     axios
     .all([weather,forecast])
     .then(axios.spread((res,res1) => {
       setweather(
        {
          city: `${res.data.name}`,
          icon:res.data.weather[0].icon,
         celsius:calcelsius(res.data.main.temp),
         temp_max:calcelsius(res.data.main.temp_max),
         temp_min:calcelsius(res.data.main.temp_min),
         description:res.data.weather[0].description,
         forecast:res1.data.list
      }
      

        )
        setweatherdetail(true)
        setError(false)
      } )
      
      ).catch(()=>{
        setError(true)
        setweatherdetail(false)

      })
      

   } else {
       alert("      Please Enter City and Country...! ")
      
      }  } 
      
  
  return (
    <div className="App">
      <Form loadweather={getapi} handlechange={handlechange} value={value} />
      <Weather key={Math.random}  weather={weather}  dateBuilder={dateBuilder} weatherdetail={weatherdetail} Error={Error} value={value}/>
    </div>
  )

  }
export default App;
