import React, {useState, useEffect, useRef} from 'react';
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

import Feather from 'react-native-vector-icons/Feather'

export default function App(){
  
  const [user, setUser] = useState('');
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTasKey, setEditTaskKey] = useState('');
  const inputref = useRef(null);


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
    firebase.database().ref('tarefas').child(user).child(key).remove()
    .then(()=>{
      const filteredTasks = tasks.filter(item => item.key !== key);
      setTasks(filteredTasks);
    })
    setEditTaskKey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  function editTask(editTask){
    if (editTasKey === editTask.key){
      setEditTaskKey('');
      return;
    }
    setEditTaskKey(editTask.key);
    setNewTask(editTask.task);
    inputref.current.focus();
  }

  function cancelEdit(){
    setEditTaskKey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  function addNewTask(){
    if(newTask === ''){
      return;
    }

    if(editTasKey !== ''){

      firebase.database().ref('tarefas').child(user).child(editTasKey).update({
        task: newTask
      })
      .then(()=>{
        const indexTask = tasks.findIndex( item => item.key === editTasKey);
        const taskclone = tasks;
        taskclone[indexTask].task = newTask;
        setTasks( [...taskclone] );
      })
      Keyboard.dismiss();
      setNewTask('');
      setEditTaskKey('');
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

      { editTasKey.length > 0 && (
        <View style={{flexDirection: 'row', marginBottom: 8, alignItems:'center',
                      backgroundColor: 'red', borderRadius: 4, height: 40,
                      paddingHorizontal: 10}}>
          <TouchableOpacity>
            <Feather
              name={'x-circle'}
              size={25}
              color={'white'}
              onPress={cancelEdit}
            />
          </TouchableOpacity>
          <Text style={{marginLeft: 8, color: 'white'}}>Voce esta editando uma tarefa!</Text>
        </View>
      )}

        

        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            placeholder='Informe uma tarefa'
            value={newTask}
            onChangeText={(value)=>setNewTask(value)}
            ref={inputref}
          />

          <TouchableOpacity style={styles.buttonAdd} onPress={()=> addNewTask()}>
            { editTasKey.length > 0 ? 
            (<Feather name='edit-2' size={20} color='white'/>) : 
            (<Text style={styles.buttonText}>+</Text> )}
            
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={ item => item.key} 
          renderItem={({ item }) => ( <TasksCard data={item} deleteTask={deleteTask} editTask={editTask} isselected={editTasKey} /> ) }
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