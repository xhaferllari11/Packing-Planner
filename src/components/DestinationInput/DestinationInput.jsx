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
    // const [start, setStart] = React.useState(Date.now());
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
        props.getWeather(coordinates.lat,coordinates.lng,destination,duration);
        // send to server and get weather
    }

    function isFormInvalid(){
        return (coordinates.lat && coordinates.lng && duration<17)
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

                        {/*need to persist this*/}
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
                <label>Duration days</label>
                <input type="number"
                    value={duration}
                    className='input-destination'
                    max={16}
                    onChange={handleDurationChange}
                    />
                    <button type='submit'
                    disabled={!isFormInvalid()}
                    className='btn btn-primary'>Get Weather and Suggestions</button>
                    </form>
        </div>
    );
}




