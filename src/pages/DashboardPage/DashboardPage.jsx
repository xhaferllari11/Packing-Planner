import React from "react";
import DestinationInput from '../../components/DestinationInput/DestinationInput';
import Weather from '../../components/Weather/Weather';
import weatherService from '../../utils/weatherService';
import ClosetItem from '../../components/ClosetItem/ClosetItem';
import tripService from '../../utils/tripService';
import tripTokenService from '../../utils/tripTokenService';

class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            destination: '',
            duration: 1,
            weather: [],
            suggestedItems: [],
            date: '',
            savedMessage: ''
        };
    };

    componentDidMount(){
        let tripInfo = tripTokenService.getToken(this.props.user);
        console.log('as',tripInfo);
        if (tripInfo){
            this.setState(tripInfo);
        }
    }

    getWeather = async (lat, lon, destination, duration, start) => {
        console.log(this);
        this.setState({
            destination: destination,
            duration: duration,
            date: start
        });
        console.log(lat, lon);
        //get weather and suggest items
        let w = await weatherService.getWeather(lat, lon);
        console.log('www', w);
        // need to only keep days i need
        let startDate = new Date(start);
        let maxDate = new Date(start);
        maxDate.setDate(maxDate.getDate() + Number(duration));
        let weatherData = w.data.filter(function(weatherDay){
            let day = new Date(weatherDay.valid_date);
            return (day > startDate && day < maxDate);
        })
        this.setState({ weather: weatherData }, this.getSuggestions);
    }

    getSuggestions() {
        //suggest items
        // 1. calculate average high weather temp
        let avgTemp = this.state.weather.reduce((acc, w) => {
            return acc + (w.high_temp + w.low_temp) / 2
        }, 0) / this.state.weather.length;
        let avgRain = this.state.weather.reduce((acc, w) => {
            return acc + w.precip
        }, 0) / this.state.weather.length;
        // 2. classify as hot/cold and rainy
        let conditions = [
            (avgTemp > 60) ? 'hot' : 'cold',
            'essentials']
        if (avgRain > 10) { conditions.push('rain') }
        // 3. add items that have that classification
        console.log('items in dash', this.props.items);
        let suggItems = [];
        this.props.items.forEach(item => {
            item.typeWeather.forEach(w => {
                if (conditions.includes(w)) {
                    suggItems.push(item);
                };
            });
        });
        this.setState(
            { suggestedItems: suggItems },
            function(){
                tripTokenService.setToken(this.state);
            });
    }

    // could run this asyncronously and tell the user we saved it
    saveTrip = async () => {
        console.log('click')
        try {
            let returnMsg = await tripService.create(this.state);
            this.setState({savedMessage: returnMsg});
            tripTokenService.removeToken();
            this.props.history.push('/trips');
        } catch {
            console.log('did not not save trip');
        };
    };


    render() {
        return (<>
            <DestinationInput
                getWeather={this.getWeather} />
            <h2>Weather</h2>
            <Weather
                weather={this.state.weather}
                destination={this.state.destination}
                duration={this.state.duration}
            />
            <h2>Suggested Clothing</h2>
            {this.state.suggestedItems.length ?
                <div className="closet-item-container">
                    {this.state.suggestedItems.map((item, ind) =>
                        <ClosetItem item={item} key={ind} />
                    )}
                </div>
                :
                <div>
                    <h4>You have no Items fit for this weather</h4>
                </div>
            }
            <button
                className='btn btn-primary'
                disabled={(this.state.weather.length === 0)}
                onClick={this.saveTrip}
            >Save Trip</button>
            {this.state.savedMessage ?
                <p>{this.state.savedMessage}</p>
                :
                <p></p>
            }
        </>)
    };
};

export default DashboardPage;