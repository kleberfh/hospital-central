import React from "react";
import {ArrowForwardIcon, Flex, Pressable, Text} from "native-base";
import {Linking, Platform} from "react-native";

const HospitalItem = ({item, userCoords}) => {

  const rad = (number) => {
    return number * Math.PI / 180;
  }

  const getDistance = (hospitalCoord) => {
    const lat2 = hospitalCoord.latitude;
    const lon2 = hospitalCoord.longitude;
    const lat1 = userCoords.latitude;
    const lon1 = userCoords.longitude;

    const R = 6371; // km
    const x1 = lat2-lat1;
    const dLat = rad(x1);
    const x2 = lon2-lon1;
    const dLon = rad(x2);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    if (distance < 1) {
      return `${distance.toFixed(3).split('.')[1]} M`
    } else {
      return `${distance.toFixed(0)} KM`
    }
  }

  const handleGetDirection = async () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${item.coords.latitude},${item.coords.longitude}`;
    const label = item.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    }
  }

  return (
    <Flex bgColor="rgba(82, 82, 82, 0.2)" flexDirection="row" py={2} px={4} my={2} rounded="2xl" justifyContent="space-between" alignItems="center">
      <Text color="#000" fontWeight="semibold" isTruncated>
        {item.name}
      </Text>
      <Text bold>
        {getDistance(item.coords)}
      </Text>
      <Pressable flexDirection="column" alignItems="center" onPress={handleGetDirection}>
        <ArrowForwardIcon size="sm" color="#000" />
        <Text bold>
          Rota
        </Text>
      </Pressable>
    </Flex>
  )
}

export default HospitalItem;