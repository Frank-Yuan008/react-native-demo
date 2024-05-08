import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import mainStyle from '../../../static/styles/mainStyle'
import NewSwitch from '../../../components/NewSwitch'
import { getCurJsonData, getIconType } from '../../../utils/Common'

type ItemModel = {
    id: number;
    type: number;
    name: string;
    cost: string;
    typeName: string;
    payMethod: string;
    comment: string;
    oppAccount: string;
    time: string;
    acqu: string
}
type StateType = {
    dataItem: ItemModel;
    isCompute: boolean
}

interface BillDetailScreen {
    props: any;
    state: StateType
}

class BillDetailScreen extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            isCompute: true,
            dataItem: {} as ItemModel
        }
    }

    render() {
        // const { itemId } = this.props.route.params;
        // this.loadData(itemId);
        let type = this.state.dataItem.type;
        return (
            <View>
                <View style={mainStyle.borderView}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Icon name={getIconType(type).iconName} style={{ marginTop: 3 }} size={45} color={getIconType(type).iconColor} />
                        <Text style={[mainStyle.item15Text, { marginBottom: 5 }]}>{this.state.dataItem.name}</Text>
                        <Text style={mainStyle.item30BoldText}>{this.state.dataItem.cost}</Text>
                        <Text style={[mainStyle.item15Text, { marginTop: 5, marginBottom: 15 }]}>交易成功</Text>
                    </View>
                    <View>
                        <View style={mainStyle.rowItemView}>
                            <Text style={mainStyle.item15GrayText}>支付时间</Text>
                            <Text style={[mainStyle.item15DtlText, { marginTop: 4 }]}>{this.state.dataItem.time}</Text>
                        </View>
                        <View style={mainStyle.rowItemView}>
                            <Text style={mainStyle.item15GrayText}>付款方式</Text>
                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={mainStyle.item15DtlText}>{this.state.dataItem.payMethod}</Text>
                                <Icon name="chevron-forward-outline" style={mainStyle.normalIcon}></Icon>
                            </TouchableOpacity>
                        </View>
                        <View style={mainStyle.rowItemView}>
                            <Text style={mainStyle.item15GrayText}>{this.state.dataItem.type == 3 ? "转账备注" : "商品说明"}</Text>
                            <Text style={mainStyle.item15DtlText}>{this.state.dataItem.comment}</Text>
                        </View>
                        {this.state.dataItem.type == 3 ?
                            <View style={mainStyle.rowItemView}>
                                <Text style={mainStyle.item15GrayText}>对方账户</Text>
                                <Text style={mainStyle.item15DtlText}>{this.state.dataItem.oppAccount}</Text>
                            </View>
                            : null}
                        <View style={mainStyle.rowItemView}>
                            <Text style={mainStyle.item15GrayText}>支付奖励</Text>
                            <TouchableOpacity style={{ flexDirection: "row" }}>
                                <Text style={mainStyle.item15DtlText}>已领取2积分，去兑换生活好物</Text>
                                <Icon name="chevron-forward-outline" style={mainStyle.normalIcon}></Icon>
                            </TouchableOpacity>
                        </View>
                        {this.state.dataItem.type != 3 && this.state.dataItem.type != 4 ?
                            <View style={mainStyle.rowItemView}>
                                <Text style={mainStyle.item15GrayText}>收单机构</Text>
                                <Text style={mainStyle.item15DtlText}>{this.state.dataItem.acqu}</Text>
                            </View>
                            : null}
                        <TouchableOpacity style={{ flexDirection: "row", padding: 10, justifyContent: "center" }}>
                            <Text style={mainStyle.item15GrayText}>更多</Text>
                            <Icon name="chevron-down-outline" style={mainStyle.normalIcon}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={mainStyle.borderView}>
                    <Text style={mainStyle.item15BoldText}>账单管理</Text>
                    <TouchableOpacity style={mainStyle.rowItemView}>
                        <Text style={mainStyle.item15Text}>账单分类</Text>
                        <Text style={[mainStyle.item15GrayText, { marginLeft: "auto" }]}>{this.state.dataItem.typeName}</Text>
                        <Icon name="chevron-forward-outline" style={mainStyle.normalIcon}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={mainStyle.rowItemView}>
                        <Text style={mainStyle.item15Text}>标签和备注</Text>
                        <Text style={[mainStyle.item15GrayText, { marginLeft: "auto" }]}>添加</Text>
                        <Icon name="chevron-forward-outline" style={mainStyle.normalIcon}></Icon>
                    </TouchableOpacity>
                    <View style={mainStyle.rowItemView}>
                        <Text style={mainStyle.item15Text}>计入收支</Text>
                        <NewSwitch value={this.state.isCompute}
                            onValueChange={(value: boolean) => this.setToggle(value)} />
                    </View>
                </View>
            </View>
        )
    }

    /**
     * 组件挂载后处理
     */
    componentDidMount() {
        const { itemId } = this.props.route.params;
        this.loadData(itemId);
    }

    setToggle(switchValue: boolean) {
        this.setState({
            toggle: switchValue,
        })
    }

    /**
     * 请求数据
     * @param id 
     */
    loadData(id: number) {
        let item: ItemModel = {} as ItemModel;
        // let page = new Date().getMonth() + 1;
        // //这里进行网络请求数据
        // let fileUrl = "http://localhost:8081/src/static/data/bill_" + page + ".json";
        // fetch(fileUrl)
        //     .then(response => response.json())
        //     .then(data => {
        //         for (let i = 0; i < data.length; i++) {
        //             if (id == data[i].itemId) {
        //                 item = data[i];
        //                 break;
        //             }
        //         }
        //         this.setState({
        //             dataItem: item
        //         })
        //     })
        //     .catch(error => {
        //         console.log("fetch data error!");
        //     });
        let items = getCurJsonData();
        for (let i = 0; i < items.length; i++) {
            if (id == items[i].itemId) {
                item = items[i];
                break;
            }
        }
        this.setState({
            dataItem: item
        })
    }
}

export default BillDetailScreen;