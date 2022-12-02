import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList} from 'react-native';

import Login from './src/components/Login'
import TasksCard from './src/components/TasksCard';

export default function App(){
  
  const [user, setUser] = useState('user');
  const [newTask, setNewTask] = useState('');
  
  const tasks = [
    { key: '1', task: 'Ir no mercado'},
    { key: '1', task: 'Estudar'},
   ]

  if (!user){
    return( <Login changeStatus={(user) => setUser(user)}/> );
  }

  return(
    <SafeAreaView style={styles.container}>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            placeholder='Informe uma tarefa'
            value={newTask}
            onChangeText={(value)=>setNewTask(value)}
          />

          <TouchableOpacity style={styles.buttonAdd}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={ item => item.key} 
          renderItem={({ item }) => ( <TasksCard data={item}/> ) }
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6FC'
  },
  containerInput:{
    flexDirection: 'row',
  },
  input:{
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 4,
    height: 50
  },
  buttonAdd:{
    backgroundColor: '#141414',
    height: 50,
    paddingHorizontal: 20,
    marginLeft: 5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText:{
    color: 'white',
    fontSize: 20
  }
})