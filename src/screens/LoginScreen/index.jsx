import { useContext, useState } from 'react';
import { StyleSheet, View, Image, TextInput } from 'react-native';

import Button from '../../components/Button';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import { AuthContext } from '../../components/Context';
import { LOCATION_ROUTE } from '../../components/constants/routes';

import logo from '../../../assets/logo.png';

const mockUserData = { name: 'admin', password: 'admin' };
const initialState = { name: '', password: '' };

export default function LoginScreen({ navigation }) {
  const [userData, setUserData] = useState(initialState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useContext(AuthContext);

  const handleChange = (key) => (text) => {
    if (error) {
      setError('');
    }
    setUserData((prev) => ({ ...prev, [key]: text }));
  };
  const submitHandler = () => {
    if (error) return;

    const { name, password } = userData;
    if (!name || !password) {
      setError('Заполните все поля');
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (userData.name === mockUserData.name && userData.password === mockUserData.password) {
          setAuth(true);
          setUserData(initialState);
          navigation.navigate(LOCATION_ROUTE);
        } else {
          setError('Неверный логин или пароль');
        }
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />

      <Image style={styles.logo} source={logo} />
      <TextInput
        style={styles.input}
        value={userData.name}
        placeholder="Логин"
        onChangeText={handleChange('name')}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        value={userData.password}
        onChangeText={handleChange('password')}
        placeholder="Пароль"
        secureTextEntry={true}
        editable={!isLoading}
      />
      <Error error={error} />
      <Button title="Войти" onPress={submitHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: 40,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: '#4986cc',
    marginTop: 10,
  },
});
