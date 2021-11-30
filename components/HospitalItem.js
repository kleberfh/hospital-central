import React from "react";
import {ArrowForwardIcon, Flex, Pressable, Text} from "native-base";
import {Linking, Platform} from "react-native";

const HospitalItem = ({item, userCoords, region, setRegion}) => {

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
      <Pressable w="2/3" onPress={() => {
        setRegion({
          ...region,
          ...item.coords
        })
      }}>
        <Text w="full" color="#000" fontWeight="semibold" isTruncated>
          {item.name}
        </Text>
      </Pressable>
      <Text bold>
        {item.distance}
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