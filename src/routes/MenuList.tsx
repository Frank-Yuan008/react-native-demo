import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab'
import DrawerNavigator from './DrawerNavigator'
import MaterialTop from './MaterialTopTabNavigator'
import Sample from '../screens/Sample'
import Bill from '../screens/bottomTab/mine/BillScreen'
import StackNavigator from './StackNavigator'
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import NestingNavigator from './NestingNavigator'

function HomeScreen(prop: any) {
    return (
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
            <View><Text style={styles.text}>Menu List</Text></View>
            <View style={styles.Button}>
                <Button title={'跳转到Sample页面'}
                    onPress={() => prop.navigation.navigate('Bill')} />
            </View>
            <View style={styles.Button}>
                <Button title={'跳转到BottomTab页面'}
                    onPress={() => prop.navigation.navigate('BottomTab')} />
            </View>
            <View style={styles.Button}>
                <Button title={'跳转到DrawerNavigator页面'}
                    onPress={() => prop.navigation.navigate('DrawerNavigator')} />
            </View>
            <View style={styles.Button}>
                <Button title={'跳转到MaterialTop页面'}
                    onPress={() => prop.navigation.navigate('MaterialTop')} />
            </View>
            <View style={styles.Button}>
                <Button title={'跳转到StackNavigator页面'}
                    onPress={() => prop.navigation.navigate('StackNavigator')} />
            </View>
            <View style={styles.Button}>
                <Button title={'跳转到NestingNavigator页面'}
                    onPress={() => prop.navigation.navigate('NestingNavigator')} />
            </View>
        </View>
    );
}

const Stack = createNativeStackNavigator();

export default class MenuList extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Sample" component={Sample} />
                <Stack.Screen name="Bill" component={Bill} />
                <Stack.Screen name="BottomTab" component={BottomTab} />
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
                <Stack.Screen name="MaterialTop" component={MaterialTop} />
                <Stack.Screen name="StackNavigator" component={StackNavigator} />
                <Stack.Screen name="NestingNavigator" component={NestingNavigator} />
            </Stack.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    Button: {
        marginTop: 5,
        paddingTop: 5,
    },
    text: {
        fontSize: 40,
    },
});