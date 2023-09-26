import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const images = [
  require('./img/1.png'),
  require('./img/2.png'),
  require('./img/3.png'),
  require('./img/4.png'),
  require('./img/5.png'),
  require('./img/6.png'),
  require('./img/7.png'),
  require('./img/8.png'),
  
];

class WeatherApp extends Component {
  constructor() {
    super();
    this.state = {
      cityName: '',
    };
  }

  getCity = async () => {
    const { cityName } = this.state;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${"5974155a3dedabce7ffe86774d538062"}`
      );
      console.log(response.data);
      this.setState({ weatherData: response.data });
      
      
    } catch (error) {
      console.error(error);
      
    }
  };

  render() {
    const { cityName, weatherData } = this.state;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const number = weatherData && weatherData.weather && weatherData.weather[0].id ? weatherData.weather[0].id.toString()[0] : '';
    let num = Number(number)-1; 
    



    return (
      <View style={styles.container}>
        <View style={styles.info_container}>
          {weatherData && (
            <View style={styles.render_info}>
               <Image
                  style={{ width: 80, height: 80, backgroundColor:'blue' }}
                  source={images[num]}
                />
              <Text style={styles.textV2}>{weatherData.name}</Text>
              <Text style={styles.textV1}>{weatherData.main.temp}°C</Text>
              <View>
                <Text style={styles.textV2}>{day}  </Text>
                <Text style={styles.textV1}>{month} </Text>
               
              </View>
            </View>
          )}
        </View>
        <View style={styles.activ}>
          <TextInput style={styles.inputV1}
            placeholder="City..."
            value={cityName}
            onChangeText={(text) => this.setState({ cityName: text })}
          />
          <View style={styles.button_container}>
            <TouchableOpacity
              onPress={this.getCity}
              style={styles.buttonV1}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    paddingTop:30,
    backgroundColor: "blue",
    justifyContent: 'space-between',
  },
  textV1: {
    textAlign: "center",
    color: 'white',
    fontSize: 22,
    fontWeight: "bold",
  },
  textV2: {
    textAlign: "center",
    color: 'red',
    fontSize: 32,
    fontWeight: "bold",
  },
  info_container: {
    paddingTop:50,
    justifyContent: "space-between",
    alignItems: 'center',
    height: 400,
  },
  render_info: {
    alignItems:'center',
    gap: 30,
  },
  activ: {
    paddingBottom: 30,
  },
  inputV1: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
  },
  button_container: {
    marginTop: 20,
    alignItems: 'center',

  },
  buttonV1: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 35,
  }
})

export default WeatherApp;
