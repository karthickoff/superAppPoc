const WATCHLISTHEADERS = 'WATCHLISTHEADERS';
const WATCHLISTSYMBOLS = 'WATCHLISTSYMBOLS';
const WATCHLISTSEARCHSYMBOLS = 'WATCHLISTSEARCHSYMBOLS';
export function storewatchlistHeaders(data) {
    console.log("inside Action Headers ", data);
    return {
        type: WATCHLISTHEADERS,
        payload: data
    }
}
export function storewatchlistSymbols(data) {
    console.log("inside Action storewatchlistSymbols ", data);
    return {
        type: WATCHLISTSYMBOLS,
        payload: data
    }
}


export function storewatchlistSearchSymbols(data) {
    console.log("inside Action storewatchlistSearchSymbols ", data);
    return {
        type: WATCHLISTSEARCHSYMBOLS,
        payload: data
    }
}