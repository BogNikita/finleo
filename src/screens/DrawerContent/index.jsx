import React, { useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import { AuthContext, AvatarContext } from '../../components/Context';
import { LOCATION_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from '../../components/constants/routes';

import defaultAvatar from '../../../assets/avatar.png';

export default function DrawerContent(props) {
  const { profileAvatar } = useContext(AvatarContext);
  const { setAuth } = useContext(AuthContext);

  const logoutHandler = () => {
    setProfileAvatar(defaultAvatar);
    setAuth(null);
    props.navigation.navigate(LOGIN_ROUTE);
  };

  const activeRoute = (routeName) => {
    const { index, routes } = props.navigation.getState();

    return routes[index].name === routeName;
  };

  const navigateHandler = (routeName) => () => props.navigation.navigate(routeName);

  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userAvatarSection}>
          <Image source={profileAvatar} style={styles.userAvatar} />
        </View>

        <DrawerItem
          icon={({ color, size }) => <Entypo name="map" size={size} color={color} />}
          label="Местоположение"
          onPress={navigateHandler(LOCATION_ROUTE)}
          focused={activeRoute(LOCATION_ROUTE)}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="face-man-profile" size={size} color={color} />
          )}
          label="Профиль"
          onPress={navigateHandler(PROFILE_ROUTE)}
          focused={activeRoute(PROFILE_ROUTE)}
        />
        <DrawerItem
          icon={({ color, size }) => <Entypo name="login" size={size} color={color} />}
          label="Выйти"
          onPress={logoutHandler}
        />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userAvatarSection: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  userAvatar: {
    paddingLeft: 20,
    width: 100,
    height: 100,
    borderRadius: 100,
    marginVertical: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
});
