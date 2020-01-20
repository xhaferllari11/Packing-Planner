import React from "react";
import DestinationInput from '../../components/DestinationInput/DestinationInput';
import Weather from '../../components/Weather/Weather';
import weatherService from '../../utils/weatherService';

class DashboardPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            destination: '',
            duration: 1,
            weather: [],
            suggestedItems: []
        }
    }


    getWeather = async (lat, lon, destination, duration) => {
        console.log(this);
        this.setState({
            destination: destination,
            duration: duration
        });
        console.log(lat, lon);
        //get weather and suggest items
        let w = await weatherService.getWeather();
        console.log('www', w);
    }




    render() {
        return (<>
            <DestinationInput
                getWeather={this.getWeather} />
            <Weather />
        </>)
    };
};

export default DashboardPage;