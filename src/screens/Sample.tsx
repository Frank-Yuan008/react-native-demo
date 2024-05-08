import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, RefreshControl, ActivityIndicator } from 'react-native';

const CON_ITEMS: string[] = ["Content1", "Content2", "Content3", "Content4", "Content5", "Content6", "Content7"];

type Props = {};
interface StateType {
    dataArray: string[]
    isLoading: boolean
}
interface Sample {
    props: any;
    state: StateType
}
class Sample extends Component<Props> {

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: CON_ITEMS //デフォルトデータ
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataArray}
                    renderItem={(data) => this.renderItemView(data)}
                    //プール（下向き）
                    refreshControl={
                        <RefreshControl
                            title={"Loading"} //android
                            colors={["red"]} //android
                            tintColor={"red"} //ios
                            titleColor={"red"}
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this.loadData(); //データを読み込み
                            }}
                        />
                    }
                    //プール（上向き）
                    ListFooterComponent={() => this.renderLoadMoreView()}
                    onEndReached={() => this.loadMoreData()}
                />
            </View>
        );
    }

    //アイテム設定
    renderItemView(data: any) {
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{data.item}</Text>
            </View>)
    }

    //プール（下向き）
    loadData() {
        this.setState({
            isLoading: true
        })
        //データのリクエスト（シミュレート）
        setTimeout(() => {
            let newArray: string[] = [];
            for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                newArray.push(this.state.dataArray[i]);
            }
            this.setState({
                isLoading: false,
                dataArray: newArray
            })
        }, 2000);
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
            <Text>Loading...</Text>
        </View>
    }

    //プール（上向き）
    loadMoreData() {
        //データのリクエスト（シミュレート）
        // let dataUrl = "http://10.9.0.193:8080/demo/hello";
        // fetch(dataUrl)
        // .then(response => response.json())
        // .then(data => {
        //   let newArray = [];
        //   for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
        //     newArray = this.state.dataArray.concat(data)
        //   }
        //   this.setState({
        //     dataArray: newArray
        //   })
        // })
        // .catch(error => {
        //   console.log("fetch data error!" + error);
        // });

        setTimeout(() => {
            let newArray: string[] = [];
            for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                newArray = this.state.dataArray.concat(CON_ITEMS)
            }
            this.setState({
                dataArray: newArray
            })
        }, 2000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: "#169",
        height: 200,
        margin: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "red",
        fontSize: 40,
    },

    loadMore: {
        alignItems: "center"
    },
    indicator: {
        color: "red",
        margin: 10
    }
});

export default Sample;
