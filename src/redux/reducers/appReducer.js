const IntialState = {
    appTheme: {
        color: '#FFCC70',
        backgroundColor: "#fff",
    },
    lightTheme: {
        color: '#279EFF',
        backgroundColor: "#F5F5F5",
    },
    darkTheme: {
        color: '#FFCC70',
        backgroundColor: "#fff",
    }
};

export default function AppReducer(state = IntialState, action) {
    switch (action.type) {
        case 'APPTHEME':
            return { ...state, appTheme: action.payload }
        default:
            return state;
    }

}