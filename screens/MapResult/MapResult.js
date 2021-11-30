import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {Divider, Flex, Image, ScrollView, Spinner, Text} from "native-base";
import * as Location from 'expo-location';
import MapView, {Marker} from "react-native-maps";
import {userState} from "../../Atoms/userAtom";
import HospitalPin from '../../assets/Images/pin.png';
import HospitalItem from "../../components/HospitalItem";

const MapResult = ({ handleNextStep }) => {
  const [user, setUser] = useRecoilState(userState);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  const getUserLocation = () => {
    Location.requestForegroundPermissionsAsync()
      .then(permissionResponse => {
        Location.getCurrentPositionAsync({})
          .then(positionResponse => {
            setLocation(positionResponse.coords)
          })
          .catch(() => console.log('Localização não encontrada'));
      })
      .catch(() => console.log('Permissão para localização negada.'));
  }

  useEffect(() => {
    getUserLocation()
    setHospitals([
      {
        id: 0,
        name: 'UPA Jardim América',
        coords: {
         latitude: -22.344876,
         longitude: -49.060491,
        }
      },
      {
        id: 1,
        name: 'Unidade de saúde terra branca',
        coords: {
          latitude: -22.348687,
          longitude: -49.091489,
        }
      },
      {
        id: 2,
        name: 'Hospital - ITE',
        coords: {
          latitude: -22.325118,
          longitude: -49.092425,
        }
      },
    ])
  }, [])

  return (
    <Flex rounded="2xl" my="auto">
      <Text fontSize="xl" mb={4} textAlign="center">
        Kleber, recomendamos que vá até o hospital mais próximo para ter uma ajuda especializada.
      </Text>
      {location ? (
        <MapView
          region={{
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
            latitude: location.latitude,
            longitude: location.longitude
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
            {hospitals.map((item, key) => <HospitalItem key={key.toString()} item={item} userCoords={location} />)}
          </Flex>
        )
      }
    </Flex>
  )
}

export default MapResult;