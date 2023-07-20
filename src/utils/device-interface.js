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