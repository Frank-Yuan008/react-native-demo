import { Text, StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign'
import mainStyle from '../../static/styles/mainStyle'

type TouchItemModel = {
    itemName: string;
    iconType: number;
    iconName: string;
    iconColor: string;
    touchStyle: any;
    onPress: any;
}
const TouchItem = ({ itemName, iconType, iconName, iconColor, touchStyle, onPress }: TouchItemModel) => {
    if (iconType == 1) {//AntIcon
        return (
            <TouchableOpacity style={touchStyle} activeOpacity={0.7} onPress={onPress}>
                <AntIcon name={iconName} style={{ marginTop: 3 }} size={15} color={iconColor} />
                <Text style={{ marginLeft: 5, color: "#4D4D4D" }}>{itemName}</Text>
                <Icon name="chevron-forward-outline" style={{ marginLeft: "auto", marginTop: 4, color: "#4D4D4D" }}></Icon>
            </TouchableOpacity>
        )
    } else {//Ionicons
        return (
            <TouchableOpacity style={touchStyle} activeOpacity={0.7} onPress={onPress}>
                <Icon name={iconName} style={{ marginTop: 3 }} size={15} color={iconColor} />
                <Text style={{ marginLeft: 5, color: "#4D4D4D" }}>{itemName}</Text>
                <Icon name="chevron-forward-outline" style={{ marginLeft: "auto", marginTop: 4, color: "#4D4D4D" }}></Icon>
            </TouchableOpacity>
        )
    }
}

function MineScreen(prop: any) {
    return (
        <View style={mainStyle.body}>
            <View style={mainStyle.headerView}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                        <Text style={{ fontSize: 13, color: "white", marginLeft: 10 }}>用户保护中心</Text>
                        <Icon name="chevron-forward-outline" size={15} style={{ marginLeft: 2, marginTop: 4, color: "white" }}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="headset-outline" size={20} style={{ marginLeft: 245, marginTop: 10, color: "white" }}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="settings-outline" size={20} style={{ marginLeft: 10, marginTop: 10, color: "white" }}></Icon>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 8 }}>
                    <Image source={require('../../static/images/gojou.jpg')} style={styles.tinyLogo}></Image>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, color: "white" }}>Alice</Text>
                        <Text style={{ color: "snow" }}>134******98</Text>
                    </View>
                    <View style={{ justifyContent: "center", marginLeft: 242 }}>
                        <Icon name="chevron-forward-outline" size={15} style={{ marginLeft: "auto", color: "white" }}></Icon>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={mainStyle.basicBody}>
                <View style={mainStyle.borderView}>
                    <TouchItem itemName="支付宝会员" iconType={2} iconName="chevron-down-circle" iconColor="#1E90FF"
                        touchStyle={[mainStyle.rowTouch, { borderRadius: 8 }]} onPress={unFinish} />
                </View>
                <View style={mainStyle.borderView}>
                    <TouchItem itemName="账单" iconType={2} iconName="reader" iconColor="#F4A460"
                        touchStyle={mainStyle.rowTouchBottomBorder} onPress={() => toDetail(prop)} />
                    <TouchItem itemName="总资产" iconType={1} iconName="piechart" iconColor="#1E90FF"
                        touchStyle={mainStyle.rowTouchBottomBorder} onPress={unFinish} />
                    <TouchItem itemName="余额宝" iconType={2} iconName="globe" iconColor="red"
                        touchStyle={mainStyle.rowTouchBottomBorder} onPress={unFinish} />
                    <TouchItem itemName="花呗" iconType={2} iconName="disc" iconColor="#1E90FF"
                        touchStyle={mainStyle.rowTouchBottomBorder} onPress={unFinish} />
                    <TouchItem itemName="银行卡" iconType={2} iconName="browsers" iconColor="#F4A460"
                        touchStyle={mainStyle.rowTouch} onPress={unFinish} />
                </View>
                <View style={mainStyle.borderView}>
                    <TouchItem itemName="芝麻信用" iconType={2} iconName="contrast" iconColor="#1E90FF"
                        touchStyle={mainStyle.rowTouchBottomBorder} onPress={unFinish} />
                    <TouchItem itemName="借呗" iconType={2} iconName="paw" iconColor="#1E90FF"
                        touchStyle={mainStyle.rowTouch} onPress={unFinish} />
                </View>
            </View>
        </View >
    );
}

function unFinish() {
    Alert.alert("未实装功能");
}

function toDetail(prop: any) {
    prop.navigation.navigate('BillScreen')
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyLogo: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 10,
    }
});

export default MineScreen;