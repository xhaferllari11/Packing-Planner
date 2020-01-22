import React from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

import './DestinationInput.css';

export default function DestinationInput(props) {
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    });

    // at a later time will incorporate start time
    const today = new Date(Date.now());
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 16);
    const [start, setStart] = React.useState(today.toISOString().slice(0,10));
    const [duration, setDuration] = React.useState(1);
    const [destination,setDestination] = React.useState('');

    const handleSelect = async value => {
        setDestination(value);
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
    };

    function handleDurationChange(e){
        setDuration(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('e',e)
        props.getWeather(coordinates.lat,coordinates.lng,destination,duration,start);
        // send to server and get weather
    }

    function isFormInvalid(){
        return (coordinates.lat && coordinates.lng && duration<getMaxDuration())
    }

    function handleStartChange(e){
        setStart(e.target.value);
    }

    function getMaxDuration(){
        let userStartDate = new Date(start);
        let diffTime = Math.abs(maxDate - userStartDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    console.log('start',duration);

    return (
        
        <div className='destination-input-area'>
           <form onSubmit={handleSubmit}>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className='destination-input-area'>
                        <p>Latitude: {coordinates.lat}</p>
                        <p>Longitude: {coordinates.lng}</p>
                        <input className='input-destination' {...getInputProps({ placeholder: "Vacation Spot" })} />
                        <div>
                            {loading ? <div>...loading</div> : null}
                            {suggestions.map(suggestion => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                };

                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
                {/* <label>Date: </label>
                <input type="date" 
                    value={start}
                    className='input-destination' 
                    onChange={setStart}
                /> */}
                <div>
                    <label>From: </label>
                <input type="date"
                    value={start}
                    className='input-destination'
                    min={today.toISOString().slice(0,10)}
                    max={maxDate.toISOString().slice(0,10)}
                    onChange={handleStartChange}
                    />
                    <small>*can only predict 16 day weather</small>
                    </div>

                <div>
                <label>Duration (days): </label>
                <input type="number"
                    value={duration}
                    className='input-destination'
                    max={getMaxDuration()}
                    onChange={handleDurationChange}
                    />
                </div>

                    <button type='submit'
                    disabled={!isFormInvalid()}
                    className='btn btn-primary'>Get Weather and Suggestions</button>
                    </form>
        </div>
    );
}




