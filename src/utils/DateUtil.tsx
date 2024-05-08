const DATE_STR_LOCAL = 1;//5/6/2024,10:15:25 AM
const DATE_STR_SPACE = 2;//2024-05-06 10:15:25
const DATE_STR_ISO = 3;//2024-05-06T10:15:25.000Z
export const getCurTimeStr = (type: number) => {
    let dateStr = "";
    const date = new Date();
    if (type == 1) {
        dateStr = date.toLocaleString();
    } else if (type == 2) {
        dateStr = formatDate(date)
    } else {
        dateStr = date.toISOString();
    }
    return dateStr;
}

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const getBeijingDateTime = () => {
    let curDate = new Date();
    let codeDiff = 8 - getTimeZoneCd();
    return new Date(curDate.getTime() + codeDiff * 60 * 60 * 1000);
}

/**
 * 获取当前时区的Timezone Code
 * @returns 
 */
const getTimeZoneCd = () => {
    let time = new Date();
    let offset = time.getTimezoneOffset();
    return (offset / 60);
}