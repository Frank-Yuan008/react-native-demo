import { ConsuType } from './Constants'
import { getBeijingDateTime } from './DateUtil'

type IconPros = {
    typeName: string;
    iconName: string;
    iconColor: string
}

/**
 * Icon样式设定
 * @param type 
 * @returns 
 */
export const getIconType = (type: number) => {
    let icon: IconPros = {} as IconPros;
    let typeName = "";
    let iconName = "";
    let iconColor = "";
    switch (type) {
        case 1://日用百货
            typeName = ConsuType.DAILY_NECE;
            iconName = "bowling-ball";
            iconColor = "red";
            break;
        case 2://餐饮美食
            typeName = ConsuType.CATE_DELI;
            iconName = "cafe";
            iconColor = "red";
            break;
        case 3://转账红包
            typeName = ConsuType.TRAN_ENVE;
            iconName = "stop-circle";
            iconColor = "#1E90FF";
            break;
        case 4://投资理财
            typeName = ConsuType.INVE_MANA;
            iconName = "basket";
            iconColor = "#1E90FF";
            break;
        case 5://交通出行
            typeName = ConsuType.TRANS_TVL;
            iconName = "car-outline";
            iconColor = "red";
            break;
        case 6://数码电器
            typeName = ConsuType.DGT_APPLI;
            iconName = "card-outline";
            iconColor = "red";
            break;
        default:
            typeName = ConsuType.CATE_DELI;
            iconName = "bowling-ball";
            iconColor = "red";
    }
    icon.typeName = typeName;
    icon.iconName = iconName;
    icon.iconColor = iconColor;
    return icon;
}

/**
 * 显示到现在的距离时间
 * @param time 时间格式:yyyy-MM-dd HH:mm:ss
 * @returns 
 */
export const compareNow = (time: string) => {
    let content = "";
    let diff = getBeijingDateTime().getTime() - new Date(time).getTime();
    let hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) {
        if (hours == 0) {
            content = "刚刚";
        } else {
            content = hours + "小时前";
        }
    } else {
        let days = Math.floor(hours / 24);
        if (days < 30) {
            content = days + "天前";
        } else {
            content = "一个月前";
        }
    }
    return content;
}

export const getCurJsonData = () => {
    const items = require("../static/data/bill_5.json");
    return items;
}