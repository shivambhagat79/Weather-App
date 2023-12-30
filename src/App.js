
import { useEffect, useState } from 'react';
import './App.css';
import Forecast from './Components/Forecast';
import Inputs from './Components/Inputs';
import TemperaterandDetail from './Components/TemperaterandDetail';
import TimeandLocation from './Components/TimeandLocation';
import Topbuttons from './Components/Topbuttons';
import getFormattedWeatherData from './Services/WeatherService';


function App() {

  const{query, setQuery}= useState({q:'berlin'}) 
  const {units,setUnits}= useState('metric')
  const {weather, setWeather}= useState(null)

  useEffect(() => {
    const fetchWeather=  async () => {
       await getFormattedWeatherData({...query,units}).then((data) =>{
        setWeather(data);
      })
    };
    fetchWeather();
  }, [query, units]);
  
  
  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
    <Topbuttons />
    <Inputs />
    {weather && (
      <div>
        <TimeandLocation weather={weather}/>
        <TemperaterandDetail weather={weather}/>
        <Forecast title="hourly forecast"/>
        <Forecast title="daily forecast"/>
      </div>
    )}
    
    </div>
  );
}

export default App;
   