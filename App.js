import React, { Component } from "react";
import Loading from "./Loading";
import TodayWeather from "./todayWeather";
import TomorrowWeather from "./tomorrowWeather.js";
import * as Location from "expo-location";
import { Alert } from "react-native";
import axios from "axios";

const API_KEY = "7e4d022a8f8f27f57eedbbea0442952b";
const cnt = 2;

export default class extends React.Component {
  state = {
    isLoading: true
  };
  //오늘의 날씨
  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather
      }
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp
    });
  };
  //내일의 날씨
  getTomorrow = async (latitude, longitude) => {
    const {
      data: {
        temp: { day },
        weather
      }
    } = await axios.get(
      `api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=${cnt}&appid=${API_KEY}`
    );
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      day
    });
  };
  //위치 탐색
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Sorry.", "I can find u! :/");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <TodayWeather temp={Math.round(temp)} condition={condition} />
        <TomorrowWeather temp={Math.round(temp)} condition={condition} />
      </React.Fragment>
    );
  }
}

class ErrorCatch extends Component {
  state = {
    error: false
  };

  //에러 처리
  componentDidCatch(error, info) {
    this.state({
      error: false
    });
    console.log({ error, info });
  }
  render() {
    if (this.state.error)
      return <React.Fragment>에러가 발생했어요 세상에</React.Fragment>;
    return this.props.children;
  }
}
