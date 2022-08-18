import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: 85,
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        margin: 1,
    },
    icon: {
        width: 50,
        height: 50,
        alignItems: 'center',
    },
    pressable: {
        position: 'absolute',
        width: 35,
        height: 35,
        zIndex: 10,
        top: 15,
    },
    commentAddition: {
        marginTop: 15,
        overflow: 'visible'
    },
    heartLottie: {
        position: 'absolute',
        top: -5,
        width: 85,
        height: 85,
        overflow: 'visible',
        backgroundColor: 'transparent',
        zIndex: 9,
    },
    bmLottie: {
        width: 50,
        height: 50,
        overflow: 'visible',
        backgroundColor: 'transparent',
        marginTop: 5,
    },
    text: {
        fontSize: 15,
        color: '#FBFBFB',
        fontWeight: '400',
    }
})

export default styles;