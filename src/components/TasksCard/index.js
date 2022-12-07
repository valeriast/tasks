import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

export default function TasksCard({ data, deleteTask, editTask, isselected }){
    
    return(
        <TouchableWithoutFeedback onPress={()=> editTask(data)}>
            <View style={[styles.container, 
            {backgroundColor: isselected === data.key ? '#9e46d9' : 'black'}]}>
            <TouchableOpacity onPress={() => deleteTask(data.key)}>
                <Feather
                    name='trash'
                    size={30}
                    color={isselected === data.key ? 'black' : 'white'}
                />
            </TouchableOpacity>
                <Text style={[styles.text, {color: isselected === data.key ? 'black' : 'white'}]}>{data.task}</Text>
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