import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchwatchListSymbolsRequest } from '../utils/device-interface';
import { storewatchlistSearchSymbols } from '../redux/actions/watchListAction';
import WatchListReducer from '../redux/reducers/watchListReducer';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../components/searchBar';
import BackImg from "../assets/images/left-arrow.png";
import "../css/searchScreen.css"

export default function WatchListSearchScreen() {
    const [stockList, setStockList] = useState([])
    const watchListReducerValues = useSelector(state => state.WatchListReducer);
    const searchWatchListSymbolValues = watchListReducerValues ? watchListReducerValues.searchedWatchListSymbol : [];
    console.log("searchWatchListSymbolValues", searchWatchListSymbolValues);
    useEffect(() => {
        dispatch(storewatchlistSearchSymbols([]))
    }, [])
    useEffect(() => {
        if (searchWatchListSymbolValues && searchWatchListSymbolValues.length)
            setStockList(searchWatchListSymbolValues)
    }, [searchWatchListSymbolValues])
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSearchInput = (e) => {
        if ((e.target.value) && (e.target.value).length > 1) {
            let req = JSON.stringify({
                'symbol': (e.target.value).toUpperCase()
            })
            console.log("req", req);
            searchwatchListSymbolsRequest(req);
        }
        else {
            setStockList([])
            dispatch(storewatchlistSearchSymbols([]))
        }
    }
    const handleBack = () => {
        dispatch(storewatchlistSearchSymbols([]))
        navigate(-1)

    }
    return (
        <div>
            <div className="searchHeader">
                <div className="searchBack" onClick={handleBack}>
                    <img src={BackImg} alt='back_arrow' />
                </div>
                <div className="searchBanner">
                    Search component
                </div>
            </div>
            {/* searc bar  */}
            <SearchBar name={'stock'} handleSearch={handleSearchInput} />
            <div className="stockDataList">
                {stockList && stockList.length > 0 && stockList.map((item) => {
                    return <div className="searchStockConatiner">
                        <div className="searchCompanyName">{item['Company Name']}</div>
                        <div className="rightsidenum">..</div>

                    </div>
                })}
                {stockList && stockList.length == 0 ?
                    <div className='empty_stockData'>
                        <p>search stock  to Display</p>
                    </div> : ''}

            </div>
        </div>
    )
}
