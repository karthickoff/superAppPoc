import React from "react";
import { useDispatch } from 'react-redux';
import { storewatchlistHeaders, storewatchlistSymbols, storewatchlistSearchSymbols } from "../redux/actions/watchListAction";
import { storeAppTheme, storeDarkAppTheme, storeLightAppTheme } from "../redux/actions/themeAction";
class DeviceIdentifier {
    constructor() {
        this._userAgent = navigator.userAgent || "";
        this._platform = navigator.platform || "";
    }

    get isAndroid() {
        return /android/i.test(this._userAgent);
    }

    get isIos() {
        return /iPad|iPhone|iPod/.test(this._platform);
    }

    get isMobile() {
        return /android|iphone|kindle|ipad/i.test(this._userAgent);
    }

    get isDesktop() {
        return !this.isMobile
    }
}
let deviceIdentifier = new DeviceIdentifier();

let iosInterface = (window.webkit ? window.webkit.messageHandlers : {});
const __internalWindow = window;
var AndroidInterface = __internalWindow['Android'] ? __internalWindow['Android'] : {};

export function sendGetGroupsRequest() {
    if (deviceIdentifier.isIos) {
        console.log('entered')
        iosInterface.sendGetGroupsRequest && iosInterface.sendGetGroupsRequest.postMessage("");
        // intializeGlobalVariable()
    } else if (deviceIdentifier.isAndroid) {
        console.log('entered android')
        AndroidInterface.sendGetGroupsRequest && AndroidInterface.sendGetGroupsRequest("");
    }
    return true;
}
export function sendTheme() {
    if (deviceIdentifier.isIos) {
        console.log('sendTheme entered')
        iosInterface.sendTheme && iosInterface.sendTheme.postMessage("");
        // intializeGlobalVariable()
    } else if (deviceIdentifier.isAndroid) {
        console.log('sendTheme entered android')
        AndroidInterface.sendTheme && AndroidInterface.sendTheme("");
    }
    return true;
}


export function getWatchListSymbolData(req) {
    if (deviceIdentifier.isIos) {
        console.log('entered')
        iosInterface.sendGetSymbolsRequest && iosInterface.sendGetSymbolsRequest.postMessage(req);

        // intializeGlobalVariable()
    } else if (deviceIdentifier.isAndroid) {
        console.log('entered android')
        AndroidInterface.sendGetSymbolsRequest && AndroidInterface.sendGetSymbolsRequest(req);
    }
}

export function searchwatchListSymbolsRequest(req) {
    if (deviceIdentifier.isIos) {
        console.log('entered')
        iosInterface.sendSearchSymbolsRequest && iosInterface.sendSearchSymbolsRequest.postMessage(req);
    } else if (deviceIdentifier.isAndroid) {
        console.log('entered android')
        AndroidInterface.sendSearchSymbolsRequest && AndroidInterface.sendSearchSymbolsRequest(req);
    }
}

export function GetGroupsResponseHeader() {
    const dispatch = useDispatch();
    if (!window.hasOwnProperty('getWatchListSymbolsResponse')) {
        Object.defineProperty(window, 'getGroupsResponse', {
            value: (response) => {
                console.log("getGroupsResponse function called in web ",);
                if (response) {
                    let Grpresponse = JSON.parse(response)
                    if (Grpresponse && Grpresponse.status) {
                        dispatch(storewatchlistHeaders(Grpresponse.data.watchlists))
                    }
                    else {
                        console.log("inside failure  Grpresponse.status");
                    }
                }

            },
            writable: false,
        });
    }
    else {
        console.log("showing Cannot redefine property: getGroupsResponse");
    }
}

export function HandleWatchListResponse() {
    const dispatch = useDispatch();

    if (!window.hasOwnProperty('getWatchListSymbolsResponse')) {
        Object.defineProperty(window, 'getWatchListSymbolsResponse', {
            value: (response) => {
                console.log("getWatchListSymbolsResponse function called in web ", response);
                let watchListrRes = JSON.parse(response);
                if (watchListrRes.status) {
                    dispatch(storewatchlistSymbols(watchListrRes.data.symbols))
                } else {
                    dispatch(storewatchlistSymbols([]))
                    console.log("inside failure getWatchListSymbolsResponse.status");
                }

            },
            writable: false,
        });
    }
    else {
        console.log("showing Cannot redefine property: getWatchListSymbolsResponse ",);
    }
}
export function HandleSearchSymbols() {
    const dispatch = useDispatch();
    if (!window.hasOwnProperty('getSearchSymbolsResponse')) {
        Object.defineProperty(window, 'getSearchSymbolsResponse', {
            value: (res) => {
                console.log("getSearchSymbolsResponse function called in web ", res);
                let response = JSON.parse(res)
                dispatch(storewatchlistSearchSymbols(response.data.symbols))
            },
            writable: false,
        });
    }
    else {
        console.log("showing Cannot redefine property: getSearchSymbolsResponse ");
    }
}
export function HandleTheme() {
    const dispatch = useDispatch();
    if (!window.hasOwnProperty('getTheme')) {
        Object.defineProperty(window, 'getTheme', {
            value: (res) => {
                console.log("getTheme function called in web ", res);
                let response = JSON.parse(res)
                if (response.theme == 'custom') {
                    console.log('inside custom ');
                    dispatch(storeAppTheme(response.data))

                }
                else if (response.theme == 'light') {
                    console.log("inside light ");
                    dispatch(storeLightAppTheme())
                }
                else {
                    console.log("inside dark ");
                    dispatch(storeDarkAppTheme())

                }
            },
            writable: false,
        });
    }
    else {
        console.log("showing Cannot redefine property: handleTheme ");
    }
}



