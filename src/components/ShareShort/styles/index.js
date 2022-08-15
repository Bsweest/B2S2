import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: 85,
        height: 85,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        margin: 1,
    },
    icon: {
        width: 60,
        height: 60,
        alignItems: 'center',
        zIndex: 10,
    },
    commentAddition: {
        marginTop: 15,
        overflow: 'visible'
    },
    heartLottie: {
        position: 'absolute',
        top: -5,
        width: 100,
        height: 100,
        overflow: 'visible',
        backgroundColor: 'transparent',
        zIndex: 9,
    },
    bmLottie: {
        width: 60,
        height: 60,
        overflow: 'visible',
        backgroundColor: 'transparent',
        marginTop: 5,
    },
    text: {
        fontSize: 20,
        color: '#FBFBFB',
        fontWeight: '400',
    }
})

export default styles;