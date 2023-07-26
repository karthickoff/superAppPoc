import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { sendGetGroupsRequest, getWatchListSymbolData } from './utils/device-interface';
import WatchListReducer from './reducers/watchListReducer';
import "./css/watchlistHome.css"
import searchImg from "./assets/images/search.png"


export default function Child() {
    const navigate = useNavigate();
    const [check, setCheck] = useState("hi");
    // let name = useRef(null)
    const [watchListNames, setWatchListNames] = useState([]);
    const [stockdata, setStockData] = useState([]);
    const watchListReducerValues = useSelector(state => state.WatchListReducer);
    console.log("reducer values  ", watchListReducerValues);
    const watchListHeaderValues = watchListReducerValues ? watchListReducerValues.watchListHeaders : [];
    const watchListSymbolValues = watchListReducerValues ? watchListReducerValues.watchListSymbols : []
    console.log("watchListHeaderValues", watchListHeaderValues);
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
        handleHeaderResponse()
    }, [])

    const getWatchListSymbolsData = (data) => {
        getWatchListSymbolData(data)
    }
    const handleHeaderResponse = () => {

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
        <div>
            <div className="headerWatchList">
                <div className="headingWatchlist">
                    <h4>WatchList Component</h4>
                </div>
                <div className="headingSearch" onClick={handleNav}>
                    <img src={searchImg} />
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
        </div>
    )
}
