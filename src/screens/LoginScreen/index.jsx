import { useContext, useState } from 'react';
import { StyleSheet, View, Image, TextInput } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import Button from '../../components/Button';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import { AuthContext } from '../../store/Context';
import { auth } from '../../../firebase';
import { LOCATION_ROUTE } from '../../navigation/routes';

import logo from '../../../assets/logo.png';

const initialState = { email: '', password: '' };

export default function LoginScreen({ navigation }) {
  const [userData, setUserData] = useState(initialState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useContext(AuthContext);

  const onChange = (key) => (text) => {
    if (error) {
      setError('');
    }
    setUserData((prev) => ({ ...prev, [key]: text }));
  };

  const onSubmit = (type) => async () => {
    setError('');

    const { email, password } = userData;
    if (!email || !password) {
      setError('Заполните все поля');
    } else {
      setIsLoading(true);

      const actionType =
        type === 'signUp' ? createUserWithEmailAndPassword : signInWithEmailAndPassword;

      try {
        const { user } = await actionType(auth, email.trim(), password);

        setAuth(user);
        setUserData(initialState);
        navigation.navigate(LOCATION_ROUTE);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />

      <Image style={styles.logo} source={logo} />
      <TextInput
        style={styles.input}
        value={userData.email}
        placeholder="Email"
        onChangeText={onChange('email')}
        editable={!isLoading}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={userData.password}
        onChangeText={onChange('password')}
        placeholder="Пароль"
        secureTextEntry={true}
        editable={!isLoading}
      />
      <Error error={error} />
      <Button title="Войти" onPress={onSubmit('signIn')} disabled={isLoading} />
      <Button title="Зарегистрироваться" onPress={onSubmit('signUp')} disabled={isLoading} />
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
