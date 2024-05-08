import { StyleSheet } from 'react-native'

const mainStyle = StyleSheet.create({
    body: {
        backgroundColor: "#FF9EB1"
    },
    basicBody: {
        backgroundColor: "#F2F2F2",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    basicColor: {
        backgroundColor: "#F2F2F2"
    },
    basicFontColor: {
        color: "#4D4D4D"
    },
    basicFont12: {
        fontSize: 12,
        color: "#4D4D4D"
    },
    item10Text: {
        fontSize: 10,
        marginTop: 5,
        color: "#4D4D4D"
    },
    item15Text: {
        fontSize: 15,
        color: "#4D4D4D"
        // marginLeft: 3
    },
    item15DtlText: {
        fontSize: 15,
        marginLeft: 40,
        color: "#4D4D4D"
    },
    item15GrayText: {
        fontSize: 15,
        color: "#A9A9A9"
    },
    item15BoldText: {
        fontSize: 15,
        padding: 5,
        color: "#4D4D4D",
        fontWeight: 'bold'
    },
    item20BoldText: {
        fontSize: 20,
        color: "#4D4D4D",
        fontWeight: 'bold'
    },
    item30BoldText: {
        fontSize: 30,
        color: "#4D4D4D",
        fontWeight: 'bold'
    },
    appsTouch: {
        alignItems: "center",
        marginTop: 15,
        width: 80
    },
    rowTouch: {
        marginTop: 0.5,
        width: '100%',
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 10,
    },
    rowCenterTouch: {
        flexDirection: "row",
        alignItems: "center",
    },
    rowTouchBottomBorder: {
        marginTop: 0.5,
        width: '100%',
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: "#A9A9A9"
    },
    headerView: {
        width: "100%",
        height: 115
    },
    rowView: {
        flexDirection: "row",
        alignItems: "center"
    },
    rowItemView: {
        flexDirection: "row",
        alignItems: "center",
        padding: 6
    },
    rowFlexStartView: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        alignItems: "flex-start"
    },
    rowSpaceAroundView: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    borderView: {
        marginTop: 10,
        backgroundColor: "white",
        borderRadius: 15
    },
    borderView2: {
        backgroundColor: "white",
        borderRadius: 10
    },
    itemView: {
        width: "100%",
        height: 35,
        flexDirection: "row",
        alignItems: "center"
    },
    searchBar: {
        width: 300,
        height: 30,
        backgroundColor: "white",
        fontSize: 10,
        padding: 2,
        borderRadius: 4
    },
    normalIcon: {
        marginLeft: 2,
        marginTop: 4
    }
});

export default mainStyle;