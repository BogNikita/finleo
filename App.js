import 'react-native-gesture-handler';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './src/screens/LoginScreen';
import PositionScreen from './src/screens/PositionScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DrawerContent from './src/screens/DrawerContent';

import defaultAvatar from './assets/avatar.png';
import { AvatarContext, AuthContext } from './src/components/Context';
import { LOCATION_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from './src/components/constants/routes';

const Drawer = createDrawerNavigator();

export default function App() {
  const [profileAvatar, setProfileAvatar] = useState(defaultAvatar);
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <AvatarContext.Provider value={{ profileAvatar, setProfileAvatar }}>
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
      </AvatarContext.Provider>
    </AuthContext.Provider>
  );
}
