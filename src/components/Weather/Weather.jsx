import React from 'react';

import './Weather.css';

const Weather = (props) => {
    console.log('weather', props.weather);
    return (
        <>
            {props.weather.length ?
                <div className='weather-cards'>
                    {props.weather.map((w,ind) =>
                        <div className="col-2 p-1" key={ind}>
                            <div className="card-body pb-0">
                                <img className='weather-img' src={`https://www.weatherbit.io/static/img/icons/${w.weather.icon}.png`} alt={w.weather.description} />
                                <div className="d-flex justify-content-between">
                                    <p className="mb-0 h5">{w.low_temp}&deg;</p>
                                    <p className="mb-0 h5">{w.high_temp}&deg;</p>
                                </div>
                                <p>precip: {w.precip}</p>
                                <p>snow: {w.snow_depth}</p>
                                <p className="mb-0 hour"><small>{w.datetime}</small></p>
                            </div>
                            <hr />
                            <div className="card-body pt-0">
                                <h6 className="font-weight-bold mb-1">{props.destination}</h6>
                                <p className="mb-0">{w.weather.description}</p>
                            </div>
                        </div>

                    )}
                </div>
                :
                <h5>No Weather Available</h5>
            }

        </>
    )
}


export default Weather;

// moonrise_ts: 1579604295
// wind_cdir: "NW"
// rh: 77
// pres: 992.08
// high_temp: 36.8
// sunset_ts: 1579647508
// ozone: 347.426
// moon_phase: 0.0422962
// wind_gust_spd: 17.4
// snow_depth: 0
// clouds: 24
// ts: 1579582860
// sunrise_ts: 1579610690
// app_min_temp: 12.9
// wind_spd: 7.5
// pop: 0
// wind_cdir_full: "northwest"
// slp: 1030.56
// valid_date: "2020-01-21"
// app_max_temp: 29.2
// vis: 15
// dewpt: 23.4
// snow: 0
// uv: 4.27298
// weather: {icon: "c02d", code: 802, description: "Scattered clouds"}
// wind_dir: 321
// max_dhi: null
// clouds_hi: 0
// precip: 0
// low_temp: 22.2
// max_temp: 36.8
// moonset_ts: 1579640445
// datetime: "2020-01-21"
// temp: 30
// min_temp: 23.6
// clouds_mid: 0
// clouds_low: 24