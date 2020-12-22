import React from 'react'
import './App.css'
import { Search, Compass } from 'react-bootstrap-icons'
class Card extends React.Component {
    constructor() {
        super()
        this.state = {
            showData: false,
            city: "city", 
            country: "country",
            temp: "temp",
            feels_like: "feels like",
            max: "max",
            min: "min",
            pressure: "pressure",
            humidity: "humidity",
            weather: "weather",
            icon: "icon",
            description: "description",
            visibility: "visibility",
            wind_speed: "windspeed",
            wind_direction: "winddirection"
        }
    }

    
    getDataGeo = (e) => {

        var lat = 0
        var lon = 0
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude
            lon = position.coords.longitude
            console.log(lat)
            console.log(lon)
            let api = 'https://api.openweathermap.org/data/2.5/weather?'
            let key = '&APPID=11c8e92be9bd346ea62a9e154d1b617c&units=metric'
            let url = api + 'lat=' + lat + '&lon=' + lon + key

            fetch(url)
            .then(res => res.json())
            .then(result => {
                
            })
            });
    }

    getDataCity = (e) => {
        let searchTerm = document.getElementById("searchTerm")
        if (searchTerm.value == "" || searchTerm.value == undefined) 
            return
        
        let api = 'https://api.openweathermap.org/data/2.5/weather?'
        let key = '&APPID=11c8e92be9bd346ea62a9e154d1b617c&units=metric'
        let url = api + 'q=' + searchTerm.value + key
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {
                this.setState({
                showData: true,
                city: result.name, 
                country: result.sys.country,
                temp: Math.round(result.main.temp),
                feels_like: Math.round(result.main.feels_like),
                max: Math.round(result.main.temp_max),
                min: Math.round(result.main.temp_min),
                pressure: Math.round(result.main.pressure),
                humidity: Math.round(result.main.humidity),
                weather: result.weather[0].main,
                icon: "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png",
                description: result.weather[0].description,
                visibility: result.visibility,
                wind_speed: result.wind.speed,
                wind_direction: result.wind.deg
                })
            },
            error => {
                console.log(error)
                return
            });
    }

    render() {
        return (
            <>
            <div className = "searchdiv">
                <input id = "searchTerm" type = "search" placeholder = "Search for a city"></input>
                <button type = "button" onClick = {this.getDataCity}><Search /></button>
                <button type = "button" onClick = {this.getDataGeo}><Compass /></button>
            </div>
            <div className = "card row">
                {!this.state.showData && <h3>Start searching</h3>}
                {this.state.showData && 
                    <>
                    <h4>{this.state.city}, {this.state.country}</h4>
                    <div id = "div1" className = "col-lg-6 col-md-12 col-sm-12">
                        <h1><b>{this.state.temp} &deg; C</b></h1>
                        <h5>Feels like {this.state.feels_like} &deg; C</h5><br></br>
                        <h5>{this.state.max} &deg; C / {this.state.min} &deg; C</h5>
                        <h5>Pressure {this.state.pressure} mb</h5>
                        <h5>Humidity {this.state.humidity} %</h5>
                    </div>
                    <div id = "div2" className = "col-lg-6 col-md-12 col-sm-12">
                        <h3>{this.state.weather}</h3>
                        <img src = {this.state.icon}></img>
                        <h5>{this.state.description}</h5>
                        <h5>Visibility {this.state.visibility} m</h5>
                        <h5>Wind {this.state.wind_speed} m/s {this.state.wind_direction} &deg;</h5>
                    </div>
                    </>
                }
            </div>
            </>
        )
    }
}

export default Card