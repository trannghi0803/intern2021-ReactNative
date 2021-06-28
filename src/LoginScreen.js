import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = e => {
    setIsLoading(true);
    e.preventDefault();
    return fetch('https://qlsc.maysoft.io/server/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.code === 200) {
          //console.warn(responseJson);
          console.log('Thông báo!', 'Bạn đã đăng nhập thành công!');
          navigation.navigate('Home');
        } else {
          // console.warn(responseJson);
          Alert.alert('Thông báo!', 'Bạn đã đăng nhập không thành công!');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require('./img/logo.png')}
          style={{width: 150, height: 150}}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Username"
        placeholderTextColor="black"
        underlineColorAndroid="transparent"
        style={styles.txtInput}
        value={username}
        onChangeText={username => setUserName(username)}
      />
      <TextInput
        placeholder="Password"
        underlineColorAndroid="transparent"
        placeholderTextColor="black"
        secureTextEntry={true}
        style={styles.txtInput}
        value={password}
        onChangeText={password => setPassword(password)}
      />
      {!isLoading ? (
        <TouchableOpacity onPress={onSubmit} style={styles.btnLogin}>
          <Text style={styles.txtLogin}>Login</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
    </View>
  );
};
const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  txtInput: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    width: DEVICE_WIDTH - 130,

    marginHorizontal: 20,
    padding: 8,
    borderRadius: 5,
    color: '#000',
    margin: 10,
  },
  btnLogin: {
    width: DEVICE_WIDTH - 130,
    backgroundColor: 'rgba(0,145,234,1)',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  txtLogin: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default LoginScreen;
