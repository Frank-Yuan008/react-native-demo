import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import Index from './src/Home'
// import Index from './src/StackNavigator'
import BottomTab from './src/routes/BottomTab'
// import Index from './src/DrawerNavigator'
// import Index from './src/MaterialTopTabNavigator'
// import MenuList from './src/MenuList'
import CodePush from 'react-native-code-push'
// import { useCodePush } from './useCodePush'

interface StateType {
  isUpdate: boolean
}
interface App {
  props: any;
  syncMessage: string;
  state: StateType
}

class App extends Component {
  constructor(props: any) {
    super(props);
    this.syncMessage = "";
    this.state = {
      isUpdate: false,
    }
  }

  UNSAFE_componentWillMount() {
    // 更新重启之后，防止回滚
    CodePush.notifyAppReady();
    // 检查更新
    this.useCodePush();
  }

  render() {
    return (
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    );
  }

  useCodePush() {
    CodePush.checkForUpdate().then((update) => {
      if (update) {
        this.setState({ isUpdate: true });
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
              case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("DOWNLOADING_PACKAGE");
                break;
              case CodePush.SyncStatus.INSTALLING_UPDATE:
                console.log(" INSTALLING_UPDATE");
                break;
            }
          },
          (progress) => {
            console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
          }
          // this.codePushStatusDidChange.bind(this),
          // this.codePushDownloadDidProgress.bind(this)
        )
      } else {
        CodePush.notifyAppReady()
      }
    })
  }

  //下载状态
  codePushStatusDidChange = (syncStatus: any) => {
    if (this.state.isUpdate) {
      switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          this.syncMessage = 'Checking for update'
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          this.syncMessage = 'Downloading package'
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          this.syncMessage = 'Awaiting user action'
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          this.syncMessage = 'Installing update'
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          this.syncMessage = 'App up to date.'
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
          this.syncMessage = 'Update cancelled by user'
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          this.syncMessage = 'Update installed and will be applied on restart.'
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          this.syncMessage = 'An unknown error occurred'
          // 当更新出错时，提示信息并关闭面板
          // this.toast.show('更新出错，请重启应用！');
          this.setState({ modalVisible: false })
          break;
      }
    }
  }

  // 下载进度
  codePushDownloadDidProgress = (Progress: any) => {
    if (this.state.isUpdate) {
      let currProgress = Math.round((Progress.receivedBytes / Progress.totalBytes) * 100) / 100;
      if (currProgress >= 1) {
        this.setState({ modalVisible: false })
      } else {
        this.setState({
          progress: currProgress
        })
      }
    }
  }

}

export default App