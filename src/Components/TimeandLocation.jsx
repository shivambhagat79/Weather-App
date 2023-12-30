import React from 'react'
import { formattolocaltime } from '../Services/WeatherService';

function TimeandLocation({weather: {dt, timezone, name, country}}) {
  return (
    <div>
        <div className="item-center justify-center my-6">
            <p className="text-white text-xl font-extralight">
                {formattolocaltime(dt, timezone)}
            </p>
        </div>
        <div className="flex items-center justify-center my-3">
            <p className="text-white text-3xl font-medium">
                {'${name}, ${country}'}
            </p>
        </div>
    </div>
  )
}

export default TimeandLocation;