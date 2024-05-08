import { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { getCurTimeStr } from '../../utils/DateUtil'
import { writeFile, readFile } from '../../utils/FlieUtil'
import mainStyle from '../../static/styles/mainStyle'
import RNFS from 'react-native-fs';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        borderBottomColor: '#000', // 横线颜色
        borderBottomWidth: 1, // 横线粗细
        width: '100%', // 横线宽度
        marginVertical: 10 // 横线上下间距
    },
    text: {
        fontSize: 40,
        color: "#4D4D4D"
    },
    text30: {
        marginLeft: 30,
        fontSize: 30,
        color: "#4D4D4D"
    },
    itemTitle: {
        marginTop: 15,
        fontSize: 30,
        color: "#4D4D4D",
        fontWeight: 'bold'
    },
    touchBtn: {
        marginTop: 15,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#00E6FF",
        borderRadius: 10,
        width: 190,
        justifyContent: "center",
        alignItems: "center",
    },
    touchBtnDisable: {
        marginTop: 15,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#00FFCC",
        borderRadius: 10,
        width: 190,
        justifyContent: "center",
        alignItems: "center",
    },
    fixBtn: {
        marginTop: 15,
        marginLeft: 10,
        backgroundColor: "#FFB13D",
        borderRadius: 6,
        width: 105,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonTitle: {
        fontSize: 20,
        color: "#4D4D4D",
        padding: 5
    },
    inputPad: {
        backgroundColor: "white",
        padding: 2,
        borderRadius: 4,
        width: 35,
        height: 30,
    },
    timeSet: {
        marginTop: 15,
        marginLeft: 40,
        width: 220,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    }
});

const HorizontalLine = () => {
    return (
        <View style={styles.line} />
    );
}
const TimeSet = () => {
    return (
        <View style={styles.timeSet}>
            <TextInput style={styles.inputPad} textAlign="center" keyboardType="number-pad" maxLength={2}
                onChangeText={(text) => { SetHour = text; }} />
            <Text style={{ color: "#4D4D4D" }}>时</Text>
            <TextInput style={styles.inputPad} textAlign="center" keyboardType="number-pad" maxLength={2}
                onChangeText={(text) => { SetMiniute = text; }} />
            <Text style={{ color: "#4D4D4D" }}>分</Text>
            <TextInput style={styles.inputPad} textAlign="center" keyboardType="number-pad" maxLength={2}
                onChangeText={(text) => { SetSecond = text; }} />
            <Text style={{ color: "#4D4D4D" }}>秒</Text>
            <TouchableOpacity style={{
                height: 30, width: 40, backgroundColor: "#3D8BFF",
                alignItems: "center", justifyContent: "center"
            }} onPress={setCheckInTime}>
                <Text style={{ fontSize: 15, color: "white" }}>确认</Text>
            </TouchableOpacity>
        </View>
    )
}

type checkInModel = {
    checkInFlg: boolean;
    checkInTime: string;
}

const FilePath = RNFS.DocumentDirectoryPath + '/' + "checkIn.json";
const WorkTime = 9 * 60 * 60 * 1000;
var Opacity = 0.2;
var CheckInTime = "当日还未打卡";
var ButtonStyle = styles.touchBtn;
var ButtonTitle = "点击记录打卡时间";
var SetHour = "00";
var SetMiniute = "00";
var SetSecond = "00";
var SetVisibale = false;

function checkIn() {
    if (Opacity == 1) {
        //已经记录的情况，直接返回
        return;
    }
    ButtonStyle = styles.touchBtnDisable;
    ButtonTitle = "当日已完成打卡";
    Opacity = 1;
    CheckInTime = getCurTimeStr(2);
    let checkInItem = { checkInFlg: true, checkInTime: CheckInTime };
    writeFile(FilePath, JSON.stringify(checkInItem));
}

function setCheckInTime() {
    let curDate = getCurTimeStr(2).substring(0, 10);
    let hours = ('0' + SetHour).slice(-2);
    let minutes = ('0' + SetMiniute).slice(-2);
    let seconds = ('0' + SetSecond).slice(-2);
    CheckInTime = `${curDate} ${hours}:${minutes}:${seconds}`;
    let checkInItem = { checkInFlg: true, checkInTime: CheckInTime };
    writeFile(FilePath, JSON.stringify(checkInItem));
    SetVisibale = false;
}

function FinanceScreen(prop: any) {
    const [curTime, setCurTime] = useState(getCurTimeStr(2));
    useEffect(() => {
        RNFS.exists(FilePath)
            .then(exists => {
                if (exists) {
                    RNFS.readFile(FilePath, 'utf8')
                        .then((data) => {
                            const jsonData = JSON.parse(data);
                            if (getCurTimeStr(2).substring(0, 10) == jsonData.checkInTime.substring(0, 10)) {
                                //当日已经打卡过了 
                                Opacity = 1;
                                ButtonTitle = "当日已完成打卡";
                                ButtonStyle = styles.touchBtnDisable;
                                CheckInTime = jsonData.checkInTime;
                            }
                            setCurTime(diffTime(CheckInTime));
                        })
                        .catch((error) => {
                            console.log("文件读取出错：" + error);
                        });
                } else {
                    console.log("file not exists");
                    let checkInItem: checkInModel = { checkInFlg: true, checkInTime: "1970-01-01 00:00:00" };
                    writeFile(FilePath, JSON.stringify(checkInItem));
                }
            })
            .catch(error => {
                console.log("检查文件时出错：", error);
            });
        const intervalId = setInterval(() => {
            setCurTime(diffTime(CheckInTime));
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <View>
            <View style={{ backgroundColor: "#ff9eb1", width: "100%", height: 115, marginBottom: 10 }}>
                <Text style={{ color: "#4D4D4D" }}>Dummy Header</Text>
            </View>
            <View style={mainStyle.borderView}>
                <Text style={styles.itemTitle}>今日打卡时间</Text>
                <Text style={styles.text30}>{CheckInTime}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.fixBtn} onPress={() => { SetVisibale = true; }}>
                    <Text style={{ fontSize: 15, color: "#4D4D4D", alignSelf: "center" }}>手动修正时间</Text>
                </TouchableOpacity>
                {SetVisibale && (<TimeSet />)}
            </View>
            <HorizontalLine />
            <View style={mainStyle.borderView}>
                <Text style={styles.itemTitle}>距离下班还有</Text>
                <Text style={styles.text30}>{curTime}</Text>
            </View>
            <HorizontalLine />
            <TouchableOpacity style={ButtonStyle} onPress={checkIn} activeOpacity={Opacity}>
                <Text style={styles.buttonTitle}>{ButtonTitle}</Text>
            </TouchableOpacity>
        </View>
    );
}

function diffTime(checkInTime: string) {
    let OffWorkTime = "当日还未打卡";
    if (Opacity == 0.2) {
        return OffWorkTime;
    }
    if (getCurTimeStr(2).substring(0, 10) != checkInTime.substring(0, 10)) {
        //新的一天，重新刷新状态
        Opacity = 0.2;
        ButtonTitle = "点击记录打卡时间";
        ButtonStyle = styles.touchBtn;
        CheckInTime = "当日还未打卡";
        return OffWorkTime;
    }
    let diff = new Date(checkInTime).getTime() + WorkTime - new Date().getTime();
    if (diff <= 0) {
        OffWorkTime = "愉快的下班时间到了";
        return OffWorkTime;
    }
    let hours = Math.floor(diff / (60 * 60 * 1000));
    let miniutes = Math.floor((diff - hours * 60 * 60 * 1000) / (60 * 1000));
    let seconds = Math.floor((diff - hours * 60 * 60 * 1000 - miniutes * 60 * 1000) / 1000);
    OffWorkTime = hours + "时" + miniutes + "分" + seconds + "秒";
    return OffWorkTime;
}

export default FinanceScreen;