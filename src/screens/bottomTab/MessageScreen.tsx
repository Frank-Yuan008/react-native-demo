import { Text, StyleSheet, View, Button, Alert, TouchableOpacity } from 'react-native';
import CodePush from 'react-native-code-push';
import packageInfo from '../../../package.json'
import mainStyle from '../../static/styles/mainStyle'

const Section = ({ children, title }: { children: any, title: string }) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionDescription}>{children}</Text>
        </View>
    )
}

const checkForUpdate = () => {
    CodePush.checkForUpdate().then((update) => {
        if (update) {
            CodePush.sync({
                updateDialog: {
                    appendReleaseDescription: false,
                    descriptionPrefix: '\n\n更新内容：\n',
                    title: '发现新版本',
                    mandatoryUpdateMessage: '更新内容：\n' + update.description,
                    mandatoryContinueButtonLabel: '确定'
                },
                installMode: CodePush.InstallMode.IMMEDIATE,
            },
                (status) => {
                    switch (status) {
                        case CodePush.SyncStatus.UP_TO_DATE:
                            console.log("DOWNLOADING_PACKAGE");
                            Alert.alert("已更新到最新版本");
                            break;
                        case CodePush.SyncStatus.UPDATE_INSTALLED:
                            console.log("DOWNLOADING_PACKAGE");
                            Alert.alert("最新版本已安装");
                            break;
                        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                            console.log("DOWNLOADING_PACKAGE");
                            Alert.alert("从服务器下载可用更新");
                            break;
                        case CodePush.SyncStatus.INSTALLING_UPDATE:
                            console.log(" INSTALLING_UPDATE");
                            Alert.alert("已下载更新，即将安装");
                            CodePush.restartApp();
                            break;
                    }
                },
                (progress) => {
                    console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
                    const percent = Math.floor((progress.receivedBytes / progress.totalBytes) * 100);
                }
            )
        } else {
            Alert.alert("当前已经是最新版本");
            CodePush.notifyAppReady()
        }
    })
};

function MessageScreen(prop: any) {
    return (
        <View>
            <View style={{ backgroundColor: "#ff9eb1", width: "100%", height: 115, marginBottom: 10 }}>
                <Text style={{ color: "#4D4D4D" }}>Dummy Header</Text>
            </View>
            <View style={[mainStyle.borderView, { paddingBottom: 10 }]}>
                <Text style={[styles.text]}>Version Info</Text>
                <View>
                    <Section title="项目名称">
                        <Text style={styles.highlight}>{packageInfo.name}</Text>
                    </Section>
                    <Section title="版本号">
                        <Text style={styles.highlight}>{packageInfo.version}</Text>
                    </Section>
                    <Section title="更新操作">
                        <Button title='检查更新' onPress={checkForUpdate} />
                    </Section>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    text: {
        fontSize: 40,
        color: "#4D4D4D"
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: "#4D4D4D"
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: "#4D4D4D"
    },
    highlight: {
        fontWeight: '700',
        color: "#4D4D4D"
    },
    button: {
        borderRadius: 2,
        backgroundColor: "blue"
    }
});

export default MessageScreen;