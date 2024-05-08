/* eslint-disable react/no-unstable-nested-components */
import { Text, StyleSheet, View, Button, TouchableOpacity, Alert } from 'react-native';
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FinanceScreen from '../screens/bottomTab/FinanceScreen'
import MessageScreen from '../screens/bottomTab/MessageScreen'
import MineScreen from '../screens/bottomTab/MineScreen'
import BillScreen from '../screens/bottomTab/mine/BillScreen'
import HomeScreen from '../screens/bottomTab/HomeScreen'

function getTitleName(routeName: string) {
    let titleName = '';
    if (routeName === 'Home') {
        titleName = "首页";
    } else if (routeName === 'Finance') {
        titleName = "打卡";
    } else if (routeName === 'Message') {
        titleName = "消息";
    } else if (routeName === 'Mine') {
        titleName = "我的";
    }
    return titleName;
}

const Tab = createBottomTabNavigator();

function MainScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Finance') {
                        iconName = focused ? 'alarm' : 'alarm-outline';
                    } else if (route.name === 'Message') {
                        iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
                    } else if (route.name === 'Mine') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: { backgroundColor: "#FFDEAD", position: "absolute" },
                title: getTitleName(route.name),
            })}
        >
            <Tab.Screen name="Finance" component={FinanceScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Message" component={MessageScreen} />
            <Tab.Screen name="Mine" component={MineScreen} />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();
export default class BottomTab extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={MainScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Group>
                    <Stack.Screen name="BillScreen" component={BillScreen} options={{ headerShown: false }} />
                </Stack.Group>
            </Stack.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
    },
    touch: {
        width: '100%',
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 10,
        backgroundColor: "#DDDDDD",
        borderWidth: 0.3,
        borderColor: "#A9A9A9"
    }
});
