const IntialState = {
    appTheme: {
        color: '#279EFF',
        backgroundColor: "#F5F5F5",
    },
    lightTheme: {
        color: '#279EFF',
        backgroundColor: "white",
    },
    darkTheme: {
        color: '#952323',
        backgroundColor: "black",
    }
};

export default function AppReducer(state = IntialState, action) {
    switch (action.type) {
        case 'APPTHEME':
            return { ...state, appTheme: action.payload }
        case 'LIGHTTHEME':
            return { ...state, appTheme: state.lightTheme }
        case 'DARKTHEME':
            return { ...state, appTheme: state.darkTheme }
        default:
            return state;
    }

}