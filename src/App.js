import { useEffect, useState } from "react";
import "./App.css";
import Forecast from "./Components/Forecast";
import Inputs from "./Components/Inputs";
import TemperaterandDetail from "./Components/TemperaterandDetail";
import TimeandLocation from "./Components/TimeandLocation";
import Topbuttons from "./Components/Topbuttons";
import getFormattedWeatherData from "./Services/WeatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for" + message);
      const data = await getFormattedWeatherData({
        ...query,
        units,
      });

      setWeather(data);
    };
    fetchWeather();
  }, [query, units]);

  const formatbackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  console.log(weather);

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatbackground()}`}
    >
      <Topbuttons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units setUnits={setUnits} />
      {weather && (
        <div>
          <TimeandLocation weather={weather} />
          <TemperaterandDetail weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
