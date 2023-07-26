const IntialState = {
    watchListHeaders: [],
    watchListSymbols: [],
    searchedWatchListSymbol: [],
}

export default function WatchListReducer(state = IntialState, action) {
    console.log("Inside reducers ", action);
    switch (action.type) {
        case 'WATCHLISTHEADERS':
            return { ...state, watchListHeaders: action.payload }
        case 'WATCHLISTSYMBOLS':
            return { ...state, watchListSymbols: action.payload }
        case 'WATCHLISTSEARCHSYMBOLS':
            return { ...state, searchedWatchListSymbol: action.payload }
        default:
            return state
    }
}