import React, {useState, useEffect} from 'react';
import {View, 
        Text, 
        StyleSheet,
        SafeAreaView, 
        TextInput, 
        TouchableOpacity, 
        FlatList,
        Keyboard,
      } from 'react-native';

import Login from './src/components/Login'
import TasksCard from './src/components/TasksCard';

import firebase from './src/services/firebaseConnection'

export default function App(){
  
  const [user, setUser] = useState('');
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    if(user === ''){
      return;
    }

    async function buscarTarefas(){
      setTasks([]);
      await firebase.database().ref('tarefas').child(user).once('value', (snapshot)=>{
        snapshot?.forEach((childItem)=>{
          let data = {
            key: childItem.key,
            task: childItem.val().task
          }
  
          setTasks(oldTasks => [...oldTasks, data] )
        })
        
        
      } )

    }

    buscarTarefas();
  },[user])
  
  function deleteTask(key){
    console.log(key);
  }

  function editTask(task){
    console.log(task);
  }

  function addNewTask(){
    if(newTask === ''){
      return;
    }

    let tarefas = firebase.database().ref('tarefas').child(user);
    let chaveTarefa = tarefas.push().key;

    tarefas.child(chaveTarefa).set({
      task: newTask
    })
    .then(()=>{
      let data = {
        key: chaveTarefa,
        task: newTask
      }

    setTasks( oldTasks => [...oldTasks, data]);

    })
    .catch((e)=>{
      console.log(e)
    })

    setNewTask('');
    Keyboard.dismiss();
  }

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

          <TouchableOpacity style={styles.buttonAdd} onPress={()=> addNewTask()}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={ item => item.key} 
          renderItem={({ item }) => ( <TasksCard data={item} deleteTask={deleteTask} editTask={editTask}/> ) }
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