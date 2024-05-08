import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome6'
import mainStyle from '../../static/styles/mainStyle'
import { getIconType, compareNow, getCurJsonData } from '../../utils/Common'

type ItemModel = {
    type: number;
    name: string;
    time: string;
}
type AppIconModel = {
    type: number;
    appName: string;
    iconName: string;
    color: string
}

const HeaderIcon = ({ type, fncName, iconName }: { type: number, fncName: string, iconName: string }) => {
    if (type == 1) {//AntIcon
        return (
            <TouchableOpacity style={{ alignItems: "center" }} onPress={unFinish}>
                <AntIcon name={iconName} size={25} style={{ color: "white" }} />
                <Text style={{ fontSize: 12, color: "white" }}>{fncName}</Text>
            </TouchableOpacity>
        )
    } else {//Ionicons
        return (
            <TouchableOpacity style={{ alignItems: "center" }} onPress={unFinish}>
                <Icon name={iconName} size={25} style={{ color: "white" }} />
                <Text style={{ fontSize: 12, color: "white" }}>{fncName}</Text>
            </TouchableOpacity>
        )
    }
}

const AppIcon = ({ type, appName, iconName, color }: AppIconModel) => {
    if (type == 1) {//AntIcon
        return (
            <TouchableOpacity style={mainStyle.appsTouch} onPress={unFinish}>
                <AntIcon name={iconName} size={25} color={color} />
                <Text style={mainStyle.basicFont12}>{appName}</Text>
            </TouchableOpacity>
        )
    } else if (type == 2) {//Ionicons
        return (
            <TouchableOpacity style={mainStyle.appsTouch} onPress={unFinish}>
                <Icon name={iconName} size={25} color={color} />
                <Text style={mainStyle.basicFont12}>{appName}</Text>
            </TouchableOpacity>
        )
    } else {//AwesomeIcon
        return (
            <TouchableOpacity style={mainStyle.appsTouch} onPress={unFinish}>
                <AwesomeIcon name={iconName} size={25} color={color} />
                <Text style={mainStyle.basicFont12}>{appName}</Text>
            </TouchableOpacity>
        )
    }
}

function HomeScreen(prop: any) {
    const [items, setItems] = useState({} as ItemModel[]);
    useEffect(() => {
        const items = getCurJsonData();
        setItems(items);
        // let curMonth = new Date().getMonth() + 1;
        // let fileUrl = "http://localhost:8081/src/static/data/bill_" + curMonth + ".json";
        // let fileUrl = "./src/static/data/bill_" + curMonth + ".json";
        // fetch(fileUrl)
        //     .then(response => response.json())
        //     .then(data => {
        //         setItems(data);
        //     })
        //     .catch(error => {
        //         console.log("fetch data error!");
        //     });
    }, []);

    return (
        <View style={mainStyle.body}>
            <View style={mainStyle.headerView}>
                <View style={mainStyle.rowView}>
                    <TouchableOpacity style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 13, color: "white", marginLeft: 10 }}>上海</Text>
                            <Icon name="chevron-down-outline" size={15} style={{ marginLeft: 2, marginTop: 4, color: "white" }}></Icon>
                        </View>
                        <View><Text style={{ fontSize: 9, color: "white", marginLeft: 10 }}>多云  21℃</Text></View>
                    </TouchableOpacity>
                    <TextInput placeholder="领消费券" placeholderTextColor="#C0C0C0"
                        inlineImageLeft="search_icon" style={[mainStyle.searchBar, styles.searchBarSup]}>
                    </TextInput>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={unFinish}>
                        <Icon name="add-circle-outline" size={20} style={{ marginTop: 10, color: "white" }}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={[mainStyle.rowSpaceAroundView, { marginTop: 12 }]}>
                    <HeaderIcon type={1} fncName="扫一扫" iconName="scan1" />
                    <HeaderIcon type={1} fncName="收付款" iconName="pay-circle-o1" />
                    <HeaderIcon type={2} fncName="出行" iconName="car-sport-outline" />
                    <HeaderIcon type={2} fncName="扫一扫" iconName="file-tray-full-outline" />
                </View>
            </View>
            <View style={mainStyle.basicBody}>
                <View style={mainStyle.rowFlexStartView}>
                    <AppIcon type={3} appName="饿了么" iconName="bowl-food" color="#1E90FF" />
                    <AppIcon type={1} appName="口碑团购" iconName="caretcircleoup" color="tomato" />
                    <AppIcon type={1} appName="菜鸟" iconName="aliwangwang" color="#1E90FF" />
                    <AppIcon type={1} appName="飞猪旅行" iconName="earth" color="gold" />
                    <AppIcon type={1} appName="淘票票" iconName="gift" color="tomato" />
                    <AppIcon type={1} appName="转账" iconName="pay-circle1" color="#1E90FF" />
                    <AppIcon type={2} appName="余额宝" iconName="logo-edge" color="tomato" />
                    <AppIcon type={3} appName="蚂蚁森林" iconName="tree" color="#32CD32" />
                    <AppIcon type={3} appName="芭芭农场" iconName="tractor" color="#32CD32" />
                    <AppIcon type={3} appName="充值中心" iconName="mobile-screen" color="tomato" />
                    <AppIcon type={2} appName="医疗健康" iconName="heart" color="#1E90FF" />
                    <AppIcon type={2} appName="更多" iconName="grid" color="gray" />
                </View>
                <View style={{ marginTop: 15, backgroundColor: "white", borderRadius: 10 }}>
                    <TouchableOpacity style={{}} activeOpacity={0.7} onPress={unFinish}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 30 }}>
                            <Text style={{ marginLeft: 8, color: "#4D4D4D" }}>最近消息</Text>
                            <Icon name="chevron-forward-outline" style={{ marginLeft: "auto", marginTop: 2 }}></Icon>
                        </View>
                        {items[0] != null ?
                            <View>
                                <View style={styles.contentView}>
                                    <Icon name={getIconType(items[0].type).iconName} style={{ marginTop: 3 }} size={15} color={getIconType(items[0].type).iconColor} />
                                    <Text style={{ marginLeft: 5, color: "#4D4D4D" }}>{items[0].name}</Text>
                                    <Text style={{ marginLeft: "auto", marginTop: 4, color: "#4D4D4D" }}>{compareNow(items[0].time)}</Text>
                                </View>
                                <View style={styles.contentView}>
                                    <Icon name={getIconType(items[1].type).iconName} style={{ marginTop: 3 }} size={15} color={getIconType(items[1].type).iconColor} />
                                    <Text style={{ marginLeft: 5, color: "#4D4D4D" }}>{items[1].name}</Text>
                                    <Text style={{ marginLeft: "auto", marginTop: 4, color: "#4D4D4D" }}>{compareNow(items[1].time)}</Text>
                                </View>
                            </View>
                            : null}
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

function unFinish() {
    Alert.alert("未实装功能");
}

const styles = StyleSheet.create({
    contentView: {
        flexDirection: "row",
        alignItems: "center",
        padding: 3
    },
    searchBarSup: {
        marginTop: 10,
        marginRight: 15,
        marginLeft: 12,
        borderRadius: 6
    }
});

export default HomeScreen