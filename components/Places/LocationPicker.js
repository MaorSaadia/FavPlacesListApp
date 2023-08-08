import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';

import OutlineButton from '../UI/OutlineButton';
import { Colors } from '../../constants/colors';
import { getMapPreview } from '../../util/location';

function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLoction = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLoction);
    }
  }, [route, isFocused]);

  useEffect(() => {
    onPickLocation(pickedLocation);
  }, [pickedLocation, onPickLocation]);

  //   const [locationPermissionInformation, requestPremission] =
  //     useForegroundPermissions();

  //   async function verifyPermissions() {
  //     if (
  //       locationPermissionInformation.status === PermissionStatus.UNDETERMINED
  //     ) {
  //       const permissionResponse = await requestPremission();

  //       return permissionResponse.granted;
  //     }
  //     if (locationPermissionInformation.status === PermissionStatus.DENIED) {
  //       Alert.alert(
  //         'Insufficient Permissions!',
  //         'You Need To Able Location Permissions To Use This App'
  //       );
  //       return false;
  //     }
  //     return true;
  //   }

  async function getLocationHandler() {
    // const hasPermission = await verifyPermissions();
    // if (!hasPermission) {
    //   return;
    // }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });

    //console.log(location);
  }

  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No Location Picked Yet</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick On Map
        </OutlineButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    //borderRadius: 4,
  },
});
