import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import WatchListReducer from '../redux/reducers/watchListReducer';
import AppReducer from '../redux/reducers/appReducer';
import "../css/watchlistHome.css";
import { sendGetGroupsRequest, getWatchListSymbolData, sendTheme } from '../utils/device-interface';

import searchImg from "../assets/images/search.png";


export default function WatchListDashboardScreen() {
    const navigate = useNavigate();
    const [watchListNames, setWatchListNames] = useState([]);
    const [stockdata, setStockData] = useState([]);
    const appReducerValues = useSelector(state => state.AppReducer);
    const [appTheme, setAppTheme] = useState({});
    const watchListReducerValues = useSelector(state => state.WatchListReducer);
    const watchListHeaderValues = watchListReducerValues ? watchListReducerValues.watchListHeaders : [];
    const watchListSymbolValues = watchListReducerValues ? watchListReducerValues.watchListSymbols : [];
    const appThemeValues = appReducerValues.appTheme;
    console.log("appThemeValues", appThemeValues);
    useEffect(() => {
        console.log("inside comp recieved appTheme");
        setAppTheme(appThemeValues)
    }, [appThemeValues])

    useEffect(() => {
        setWatchListNames(watchListHeaderValues)
        if (watchListHeaderValues && watchListHeaderValues.length) {
            let req = JSON.stringify({
                "wId": watchListHeaderValues[0].wId,
            })
            getWatchListSymbolData(req)
        }


    }, [watchListHeaderValues])
    useEffect(() => {
        setStockData(watchListSymbolValues)
    }, [watchListSymbolValues])
    useEffect(() => {
        sendGetGroupsRequest();
        console.log("Message sent from web ");
        sendTheme()
        console.log('message sent from web for theme');
    }, [])

    const getWatchListSymbolsData = (data) => {
        getWatchListSymbolData(data)
    }

    const handleWatchListClick = (id) => {
        let req = JSON.stringify({
            "wId": id,
        })
        getWatchListSymbolsData(req)

    }

    const handleNav = () => {
        navigate('/search')
    }
    return (
        <div style={appTheme}>
            <div className="headerWatchList" >
                <div className="headingWatchlist">
                    <h4 >WatchList Component</h4>
                </div>
                <div className="headingSearch" onClick={handleNav}>
                    <img src={searchImg} alt='search-icon' />
                </div>

            </div>
            <ul className='watclistNames_container'>
                {watchListNames && watchListNames.length > 0 && watchListNames.map((item) => {
                    return <li onClick={() => handleWatchListClick(item['wId'])}>{item['wName']} </li>
                })}

            </ul>
            <div className='stockDataParent'>
                {stockdata && stockdata.length > 0 && stockdata.map((item) => {
                    return <div className='stockConatiner'>
                        {console.log("inside data  stock div")}
                        <div className="firstRow">
                            <div className="symbol">{item.symbol}</div>
                            <div className="num1">..</div>
                        </div>

                        <div className="secondRow">
                            <div className="companyName">{item.companyName}</div>
                            <div className="num2">..</div>

                        </div>

                    </div>
                })}
                {stockdata.length == 0 && <div className='empty_stockData'>
                    <p>No Stocks to Display </p>
                </div>}
            </div>
        </div >
    )
}
