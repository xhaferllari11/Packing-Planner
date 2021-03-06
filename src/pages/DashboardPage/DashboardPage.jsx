import React from "react";
import DestinationInput from '../../components/DestinationInput/DestinationInput';
import Weather from '../../components/Weather/Weather';
import weatherService from '../../utils/weatherService';
import ClosetItem from '../../components/ClosetItem/ClosetItem';
import tripService from '../../utils/tripService';
import tripTokenService from '../../utils/tripTokenService';
import Footer from '../../components/Footer/Footer';

import './DashboardPage.css';

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

    componentDidMount() {
        let tripInfo = tripTokenService.getToken(this.props.user);
        console.log('as', tripInfo);
        if (tripInfo) {
            this.setState(tripInfo);
        };
    }

    getWeather = async (lat, lon, destination, duration, start) => {
        this.setState({
            destination: destination,
            duration: duration,
            date: start
        });
        console.log(lat, lon);
        //get weather and suggest items
        let w = await weatherService.getWeather(lat, lon);
        // need to only keep days i need
        let startDate = new Date(start);
        let maxDate = new Date(start);
        maxDate.setDate(maxDate.getDate() + Number(duration));
        let weatherData = w.data.filter(function (weatherDay) {
            let day = new Date(weatherDay.valid_date);
            return (day >= startDate && day <= maxDate);
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
            function () {
                tripTokenService.setToken(this.state);
            });
    }

    // could run this asyncronously and tell the user we saved it
    saveTrip = async () => {
        try {
            let savedTrip = await tripService.create(this.state);
            // this.setState({savedMessage: returnMsg});
            tripTokenService.removeToken();
            this.props.addTrip(savedTrip);
            this.props.history.push('/trips');
        } catch {
            console.log('did not not save trip');
        };
    };


    render() {
        return (<div className='dashboard-page-container'>
            <DestinationInput
                getWeather={this.getWeather}
                user={this.state.user} />
            <Weather
                weather={this.state.weather}
                destination={this.state.destination}
                duration={this.state.duration}
            />
            {this.state.suggestedItems.length ?
                <div className='cloth-suggestions-dashboard'>
                    <h2>Suggested Clothing</h2>
                    <div className="closet-item-container">
                        {this.state.suggestedItems.map((item, ind) =>
                            <ClosetItem item={item} key={ind} />
                        )}
                    </div>
                    <button
                        className='btn btn-primary'
                        disabled={(this.state.weather.length === 0)}
                        onClick={this.saveTrip}
                    >Save Trip</button>
                </div>
                :
                <div>
                    <p>You have no clothing suggestions for this trip.</p>
                </div>
            }
            {this.state.savedMessage ?
                <p>{this.state.savedMessage}</p>
                :
                <p></p>
            }
            <Footer />
        </div>)
    };
};

export default DashboardPage;