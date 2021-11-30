import React, {useEffect, useState} from "react";
import axios from "axios";
import { orderBy } from 'lodash';
import {useRecoilState} from "recoil";
import * as Location from 'expo-location';
import {userState} from "../../Atoms/userAtom";
import MapView, {Marker} from "react-native-maps";
import HospitalPin from '../../assets/Images/pin.png';
import {Flex, Image, Spinner, Text} from "native-base";
import HospitalItem from "../../components/HospitalItem";

const MapResult = ({ handleNextStep }) => {
  const [user, setUser] = useRecoilState(userState);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
  });

  const rad = (number) => {
    return number * Math.PI / 180;
  }

  const getDistance = (userCoords, hospitalCoord) => {
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
    return R * c;
  }

  const getUserLocation = () => {
    Location.requestForegroundPermissionsAsync()
      .then(permissionResponse => {
        Location.getCurrentPositionAsync({})
          .then(positionResponse => {
            setLocation(positionResponse.coords)
            setRegion({
              ...region,
              ...positionResponse.coords
            })
            getHospitals(positionResponse.coords);
          })
          .catch(() => console.log('Localização não encontrada'));
      })
      .catch(() => console.log('Permissão para localização negada.'));
  }

  const getHospitals = (userCoords) => {
    axios.get('http://3571-187-85-18-193.ngrok.io/api/hospitals')
      .then(response => {
        let hospitalsWithDistance = [];
        response.data.map(hospital => {
          const hospitalWithDistance = hospital
          hospitalWithDistance.realDistance = getDistance(userCoords, hospital.coords)
          if (hospitalWithDistance.realDistance < 1) {
            hospitalWithDistance.distance = `${hospitalWithDistance.realDistance.toFixed(3).split('.')[1]} M`
          } else {
            hospitalWithDistance.distance = `${hospitalWithDistance.realDistance.toFixed(0)} KM`
          }
          hospitalsWithDistance.push(hospitalWithDistance)
        })
        setHospitals(orderBy(hospitalsWithDistance, 'realDistance'))
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  return (
    <Flex rounded="2xl" my="auto" w="full">
      {location && (
        <Text fontSize="xl" mb={4} textAlign="center">
          {user.nome.split(' ')[0]}, esses são os hospitais mais próximos a você.
        </Text>
      )}
      {location ? (
        <MapView
          region={{
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
            latitude: region.latitude,
            longitude: region.longitude
          }}
          showsUserLocation={true}
          style={{height: 250, width: 'auto', borderRadius: 18}}
        >
          {hospitals.map((hospital, index) => (
            <Marker
              key={index}
              title={hospital.name}
              coordinate={hospital.coords}
            >
              <Image source={HospitalPin} size="xs" />
            </Marker>
          ))}
        </MapView>
      ) : (
        <Flex my={4} flexDireciton="column" justifyContent="center" alignItems="center">
          <Spinner size="lg" />
          <Text fontSize="lg" mt={6} bold>
            Buscando hospitais nas proximidades
          </Text>
        </Flex>
      )}
      {
        location && (
          <Flex flexDirection="column" mt={4}>
            {hospitals.map((item, key) => (
              <HospitalItem
                item={item}
                id={item.id}
                region={region}
                key={key.toString()}
                setRegion={setRegion}
                userCoords={location}
              />
            ))}
          </Flex>
        )
      }
    </Flex>
  )
}

export default MapResult;