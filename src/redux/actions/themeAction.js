
const APPTHEME = 'APPTHEME';

export function storeAppTheme(data) {
    console.log("inside Action storeAppTheme ", data);
    return {
        type: APPTHEME,
        payload: data
    }
}