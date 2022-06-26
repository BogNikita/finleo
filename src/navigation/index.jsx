import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '../screens/LoginScreen';
import PositionScreen from '../screens/PositionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DrawerContent from '../screens/DrawerContent';
import { LOCATION_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from './routes';
import { AuthContext } from '../store/Context';

const Drawer = createDrawerNavigator();

export default function Navigate() {
  const { auth } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        screenOptions={{
          swipeEnabled: !!auth,
        }}
        drawerContent={(props) => <DrawerContent {...props} />}>
        {auth ? (
          <>
            <Drawer.Screen
              name={LOCATION_ROUTE}
              component={PositionScreen}
              options={{ title: 'Местоположение' }}
            />
            <Drawer.Screen
              name={PROFILE_ROUTE}
              component={ProfileScreen}
              options={{ title: 'Профиль' }}
            />
            <Drawer.Screen
              name={LOGIN_ROUTE}
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Drawer.Screen
            name={LOGIN_ROUTE}
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
