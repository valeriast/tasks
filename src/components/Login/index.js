import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity}  from 'react-native';

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  async function login(){
    alert('logado')
  }
  

  return(
    <SafeAreaView style={styles.container}>
        <TextInput
            placeholder='Seu e-mail'
            style={styles.input}
            value={email}
            onChangeText={(text)=> setEmail(text)}
        />
        <TextInput
            placeholder='****'
            style={styles.input}
            value={password}
            onChangeText={(text)=> setPassword(text)}
        />

        <TouchableOpacity style={styles.btnLogin} onPress={login}>
            <Text style={styles.logintext}>Acessar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity >
            <Text style={{ textAlign: 'center'}}>Criar uma conta</Text>
        </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F2F6FC',
    paddingHorizontal: 10,
  },
  input:{
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#141414'
  },
  btnLogin:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141414',
    height: 45,
    marginBottom: 10
  },
  logintext:{
    color: '#FFF',
    fontSize: 17
  }
})