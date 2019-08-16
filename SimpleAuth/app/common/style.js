import React, { 
    Platform, 
    Dimensions, 
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback, 
} from 'react-native'

const win = Dimensions.get('window');

let imageHeight = Math.round( (win.height * 0.65) );
let imageWidth = Math.round( (win.width * 0.65) );

const Styles = StyleSheet.create({
    blockPadding: {
        paddingTop: 30, 
    },
    container: {
        flex: 1,
        padding: 10, 
    },
    formButton: {
        width: 100,
        backgroundColor: '#007BFF',
        padding: 15,
        marginTop: 10,
        paddingTop: 10,
        alignItems: 'center',
        alignSelf: 'center',
    },
    formButtonText: {
        color: '#FFFFFF',
        fontSize: 22,
        textAlign: 'center'
    },
    formContainer: {
        padding: 20,
        marginTop: 0,
        //backgroundColor: 'lime', // use color to find block during design 
    },
    formHeader: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    formInput: {
        borderColor: '#CCCCCC',
        borderWidth: 1, 
        margin: 8,
        height: 50,
        width: 310, // was 90%; is better to be explicit for control of UI elements ; 
        fontSize: 22,
        padding: 12,
    },
    header: {
        height: Platform.OS === 'ios' ? 70 : 40, 
        marginTop: Platform.OS === 'ios' ? 70 : 10, 
            ...Platform.select({
              ios: { backgroundColor: '#fff', paddingTop: 24},
              android: { backgroundColor: 'red'}
            }),
    },
    hr: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    hrTop: {
        width: 350,
        fontSize: 22,
        paddingBottom: 10, 
        paddingTop: Platform.OS === 'ios' ? 10 : 20,
        paddingLeft: 20, 
    },
    linkAbout: {
        width: 60,
        padding: 10, // padding needed to make LARGER touch area
        right: Platform.OS === 'ios' ? 0 : 0, 
    },
    linkLanding: {
        width: 75,
        padding: 10, // padding needed to make LARGER touch area
        left: Platform.OS === 'ios' ? 11 : 11, 
    },
    linkLogin: {
        width: 60,
        padding: 10, // padding needed to make LARGER touch area
        right: Platform.OS === 'ios' ? 5 : 5, 
    },
    linkLogout: {
        width: 70,
        padding: 10, 
        right: Platform.OS === 'ios' ? 5 : 5, 
    },
    loginContainer:{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navBar: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        height: 60,
        top: Platform.OS === 'ios' ? 45 : 10, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navLeft: {
        width: 100,
        left: Platform.OS === 'ios' ? 11 : 11, 
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    navRight: {
        width: 150,
        right: Platform.OS === 'ios' ? 15 : 10, 
        flexDirection: 'row', 
        justifyContent: 'flex-end',
    },
    text: {
        paddingBottom: 5, 
        justifyContent: 'center',
        alignItems: 'center', 
        fontWeight: Platform.OS === 'ios' ? '400' : '400', 
        color: '#000000',
        fontSize: 32,
    },
    textCenter: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    textBlock: {
        top: Platform.OS === 'ios' ? 45 : 10, 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    textFooter: {
        color: '#000',
        fontSize: 14,
        bottom: Platform.OS === 'ios' ? -45 : -40, 
        alignSelf: 'center',
        textAlign: 'center',
    },
    textRed: {
        color: "red", 
        padding: 2,
    },
        textRegular: {
        alignItems: 'center',
        alignSelf: 'center',
        color: '#000',
        fontSize: 18,
    },
    textUi: {
        top: Platform.OS === 'ios' ? -8 : 10,
        fontSize: Platform.OS === 'ios' ? 12 : 14, 
    },
})

export default Styles;
