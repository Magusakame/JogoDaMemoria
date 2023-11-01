
import React from 'react';
import {View, Button, StyleSheet,ImageBackground} from 'react-native';

const Inicio = ({ navigation }) => {
  const Joguinho = () => {
    navigation.navigate('Joguinho');
  };

  return (
    <ImageBackground
      source={require('./imagens/ini.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Button title="Entrar" onPress={Joguinho} 
 />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
});

export default Inicio;
