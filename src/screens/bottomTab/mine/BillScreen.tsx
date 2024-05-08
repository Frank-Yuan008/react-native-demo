import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome6'
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';
import mainStyle from '../../../static/styles/mainStyle'
import BillDetail from './BillDetailScreen'
import { getIconType, getCurJsonData } from '../../../utils/Common'

interface StateType {
    dataArray: any
    isLoading: boolean
}
interface Bill {
    props: any;
    currentData: any;
    state: StateType
}

class Bill extends Component {
    constructor(props: any) {
        super(props);
        this.currentData = "";
        this.state = {
            isLoading: false,
            dataArray: getCurJsonData() //デフォルトデータ
        }
    }

    componentDidMount(): void {
        const items = getCurJsonData();
        this.setState({
            dataArray: items
        });
        this.currentData = items;
    }

    render() {
        var curMonth: number = 0;
        curMonth = new Date().getMonth() + 1;
        return (
            <View style={mainStyle.borderView2}>
                <View style={{ borderBottomWidth: 0.2, padding: 5 }}>
                    <TouchableOpacity style={{}} onPress={unFinish}>
                        <View style={{ flexDirection: "row" }} >
                            <Text style={{ fontSize: 30, color: "#4D4D4D" }}>{curMonth}</Text>
                            <Text style={{ marginTop: "auto", marginLeft: 1, color: "#4D4D4D" }}>月</Text>
                            <Icon name="caret-down-outline" style={{ marginTop: "auto", marginLeft: 3 }} size={15} />
                            <TouchableOpacity style={styles.analyseBtn}>
                                <AwesomeIcon name="chart-line" size={10} style={{ color: "white", padding: 2 }} />
                                <Text style={{ color: "white" }}>收支分析</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={mainStyle.item10Text}>支出656.45    收入4545.26</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={mainStyle.rowCenterTouch} >
                        <Text style={mainStyle.item10Text}>设置支出预算</Text>
                        <Icon name="chevron-forward-outline" style={{ marginTop: 6 }}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={{}}>
                    <FlatList
                        data={this.state.dataArray}
                        renderItem={(data) => this.renderItemView(data)}
                        refreshControl={
                            <RefreshControl
                                title={"Loading"} //android
                                colors={["red"]} //android
                                tintColor={"red"} //ios
                                titleColor={"red"}
                                refreshing={this.state.isLoading}
                            />
                        }
                        //プール（上向き）
                        ListFooterComponent={() => this.renderLoadMoreView()}
                        onEndReached={() => this.loadMoreData()}
                    />
                </View>
            </View>
        )
    }

    //アイテム設定
    renderItemView(data: any) {
        let typeName = getIconType(data.item.type).typeName;
        let iconName = getIconType(data.item.type).iconName;
        let iconColor = getIconType(data.item.type).iconColor;
        return (
            <TouchableOpacity style={{ flexDirection: "row", padding: 5, width: "100%" }} onPress={() => this.toDetail(data.item.itemId)}>
                <Icon name={iconName} style={{ marginTop: 3, width: "10%" }} size={30} color={iconColor} />
                <View style={{ borderBottomWidth: 0.2, borderBottomColor: "#A9A9A9", width: "90%" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={mainStyle.item15Text}>{data.item.name}</Text>
                        <Text style={mainStyle.item20BoldText}>{data.item.cost}</Text>
                    </View>
                    <Text style={{ fontSize: 10, color: "#4D4D4D" }}>{typeName}</Text>
                    <Text style={{ fontSize: 10, marginTop: 5, marginBottom: 8, color: "#4D4D4D" }}>{data.item.time.substring(5)}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    //プール（上向き）のスタイル
    renderLoadMoreView() {
        return <View style={styles.loadMore}>
            <ActivityIndicator
                style={styles.indicator}
                size={"large"}
                color={"red"}
                animating={true}
            />
            <Text style={{ marginBottom: 85 }}>Loading...</Text>
        </View>
    }

    /**
     * 加载更多数据
     * @param
     */
    loadMoreData() {
        // let page = 4;
        // //这里进行网络请求数据
        // let fileUrl = "http://localhost:8081/data/bill_" + page + ".json";
        // fetch(fileUrl)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log("fetch successful!");
        //         let newArray = [];
        //         newArray = this.state.dataArray.concat(data);
        //         this.setState({
        //             dataArray: newArray
        //         })
        //     })
        //     .catch(error => {
        //         console.log("fetch data error!");
        //     });
        // let items = getCurJsonData();
        setTimeout(() => {
            let newArray = [];
            newArray = this.state.dataArray.concat(this.currentData);
            this.setState({
                dataArray: newArray
            })
        }, 2000);
    }

    toDetail = (id: number) => {
        this.props.navigation.navigate('BillDetail', { itemId: id });
    }

}

function unFinish() {
    Alert.alert("未实装功能");
}

const Stack = createStackNavigator();
class BillScreen extends Component {
    render() {
        return (
            <Stack.Navigator screenOptions={
                ({ route, navigation }) => ({
                    title: "",
                    headerStyle: mainStyle.basicColor,
                    headerLeft: () => {
                        return (
                            <View>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Icon name="chevron-back-outline" style={{ marginRight: 10, color: "#4D4D4D" }} size={30} />
                                </TouchableOpacity>
                            </View>
                        );
                    },
                    headerRight: () => {
                        return (
                            <View style={{ flexDirection: "row" }}>
                                <TextInput placeholder="搜索交易记录" placeholderTextColor="#C0C0C0"
                                    inlineImageLeft="search_icon" style={[mainStyle.searchBar, { marginRight: 25 }]}>
                                </TextInput>
                                <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => Alert.alert('未实装')}>
                                    <Icon name="ellipsis-horizontal" style={{ marginRight: 10 }} size={20} />
                                </TouchableOpacity>
                            </View >
                        );
                    }
                })}>
                <Stack.Screen name="Bill" component={Bill} />
                <Stack.Screen name="BillDetail" component={BillDetail} options={
                    ({ route, navigation }) => ({
                        title: "账单详情",
                        headerStyle: mainStyle.basicColor,
                        headerLeft: () => {
                            return (
                                <View>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <Icon name="chevron-back-outline" style={{ color: "#4D4D4D" }} size={30} />
                                    </TouchableOpacity>
                                </View>
                            );
                        },
                        headerRight: () => { return null }
                    })
                } />
            </Stack.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    loadMore: {
        alignItems: "center",
        marginBottom: 100
    },
    indicator: {
        color: "red",
        margin: 10
    },
    analyseBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E90FF",
        borderRadius: 3,
        padding: 4,
        height: "80%",
        marginLeft: 260,
        marginTop: 10
    }
})

export default BillScreen