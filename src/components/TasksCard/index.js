import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

export default function TasksCard({ data, deleteTask, editTask }){
    return(
        <TouchableWithoutFeedback onPress={()=> editTask(data)}>
            <View style={styles.container}>
            <TouchableOpacity onPress={() => deleteTask(data.key)}>
                <Feather
                    name='trash'
                    size={30}
                    color={'#cc3434'}
                />
            </TouchableOpacity>
                <Text style={styles.text}>{data.task}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container:{
       flex: 1,
       flexDirection: 'row',
       height: 45,
       width: '100%',
       backgroundColor: 'black',
       marginBottom: 2,
       marginTop: 2,
       alignItems: 'center',
       paddingLeft: 10,
       borderRadius: 4
    },
    text:{
        marginHorizontal: 10,
        color: '#FFF'
    }
})