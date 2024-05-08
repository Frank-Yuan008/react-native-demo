import { Text, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
function OrderunpayScreen() {
    return (
        <View style={[styles.container]}>
            <Text style={[styles.text]}>待付款画面</Text>
        </View>
    );
}

function OrderPaidScreen() {
    return (
        <View style={[styles.container]}>
            <Text style={[styles.text]}>待发货画面</Text>
        </View>
    );
}

function OrderSentScreen() {
    return (
        <View style={[styles.container]}>
            <Text style={[styles.text]}>待收货画面</Text>
        </View>
    );
}

function OrderFinishScreen() {
    return (
        <View style={[styles.container]}>
            <Text style={[styles.text]}>待评价画面</Text>
        </View>
    );
}

const MTab = createMaterialTopTabNavigator();

export default class MaterialTop extends Component {
    render() {
        // tabBarPosition 导航条的位置top|bottom默认是top
        return (
            <MTab.Navigator
                tabBarPosition="bottom"
                screenOptions={{
                    // tabBar的整体样式
                    tabBarStyle: {
                        borderWidth: 1,
                        borderColor: 'grey',
                    },
                    // 标签样式
                    tabBarLabelStyle: {
                        fontSize: 20,
                    },
                    tabBarActiveTintColor: 'red', // 当前标签页标签激活时的颜色
                    tabBarInactiveTintColor: '#666', // 当前标签页标签未激活时的颜色
                    tabBarShowIcon: true, //是否显示图标
                }}>
                <MTab.Screen
                    name="OrderUnpay"
                    component={OrderunpayScreen}
                    options={{
                        title: '待付款',
                        tabBarIcon: ({ focused, color }) => {
                            let iconName = '';
                            iconName = focused ? "hammer" : "hammer-outline";
                            return <Icon name={iconName} color={color} size={20} />;
                        },
                    }}
                />
                <MTab.Screen
                    name="OrderPaid"
                    component={OrderPaidScreen}
                    options={{
                        title: '待发货',
                        tabBarIcon: ({ focused, color }) => {
                            let iconName = '';
                            iconName = focused ? "arrow-redo-circle" : "arrow-redo-circle-outline";
                            return (
                                <Icon name={iconName} color={color} size={20} />
                            );
                        },
                    }}
                />
                <MTab.Screen
                    name="OrderSent"
                    component={OrderSentScreen}
                    options={{
                        title: '待收货',
                        tabBarIcon: ({ focused, color }) => {
                            let iconName = '';
                            iconName = focused ? "arrow-redo" : "arrow-redo-outline";
                            return <Icon name={iconName} color={color} size={20} />;
                        },
                    }}
                />
                <MTab.Screen
                    name="OrderFinish"
                    component={OrderFinishScreen}
                    options={{
                        title: '待评价',
                        tabBarIcon: ({ focused, color }) => {
                            let iconName = '';
                            iconName = focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline";
                            return (
                                <Icon name={iconName} color={color} size={20} />
                            );
                        },
                    }}
                />
            </MTab.Navigator>
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
});
