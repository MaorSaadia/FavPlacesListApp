import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import { init } from './util/database';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: Colors.primary200 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.primary50 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Favorites Places',
              presentation: 'modal',
              animation: 'slide_from_left',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add-to-photos"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen
            options={{
              presentation: 'modal',
              animation: 'slide_from_right',
              title: 'Add New Place',
            }}
            name="AddPlace"
            component={AddPlace}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="Place Details"
            component={PlaceDetails}
            options={{
              title: 'Loading Place',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
