import React from 'react';
import {View, Text} from 'react-native';

export default function TasksCard({data}){
    return(
        <View>
           <Text>{data.task}</Text>
        </View>
    )
}