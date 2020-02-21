import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const weatherOptions = {
  Thunderstorm: {
    iconName: "weather-lightning",
    gradient: ["#373B44", "#4286f4"],
    title: "폭풍",
    subtitle: "이럴 때 집에 있는게 낫지~"
  },
  Drizzle: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "이슬비",
    subtitle: "기분이 나쁜 비"
  },
  Rain: {
    iconName: "weather-rainy",
    gradient: ["#00C6FB", "#005BEA"],
    title: "비",
    subtitle: "우산 꼭 챙기기"
  },
  Snow: {
    iconName: "weather-snowy",
    gradient: ["#7DE2FC", "#B9B6E5"],
    title: "눈",
    subtitle: "나랑 눈사람 만들래~"
  },
  Atmosphere: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"]
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#FF7300", "#FEF253"],
    title: "맑음",
    subtitle: "날씨 좋으면 꼭 약속이 없더라..."
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#D7D2CC", "#304352"],
    title: "구름",
    subtitle: "어둑어둑한게 비오겠네"
  },
  Mist: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "옅은 안개",
    subtitle: "미세먼지는 아니니 걱정 NO!"
  },
  Dust: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "미세먼지",
    subtitle: "비염환자는 마스크 챙기기"
  },
  Haze: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "짙은 안개",
    subtitle: "구름 안에 있는거 같애.."
  }
};

export default function Weather({ temp, condition }) {
  return (
    <LinearGradient
      colors={weatherOptions[condition].gradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content"/>
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
         size={96} 
         name={weatherOptions[condition].iconName} 
         color="white"/>
        <Text style={styles.temp}>{temp}</Text>
      </View>
      <View style={{...styles.halfContainer, ...styles.textContainer}}>
        <Text style={styles.title}>{weatherOptions[condition].title}</Text>
        <Text style={styles.subtitle}>{weatherOptions[condition].subtitle}</Text>
      </View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
    "Haze",
    "Mist"
  ]).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  temp:{
    fontSize:42,
    color : "white"
  },
  halfContainer : {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  title :{
    color:"white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom : 10
  },
  subtitle : {
    fontWeight : "600",
    color: "white",
    fontSize:24
  },
  textContainer : {
    paddingHorizontal:20,
    alignItems:"flex-start"
  }
});
