import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { sendGetGroupsRequest, getWatchListSymbolData } from './utils/device-interface';
import "./css/watchlistHome.css"
import searchImg from "./assets/images/search.png"
const __internalWindow = window;
var AndroidInterface = __internalWindow['Android'] ? __internalWindow['Android'] : {};
let iosInterface = (window.webkit ? window.webkit.messageHandlers : {});

export default function Child() {
    const navigate = useNavigate();
    const [watchListNames, setWatchListNames] = useState([

    ]);
    const [stockdata, setStockData] = useState([
    ])
    useEffect(() => {
        sendGetGroupsRequest() // check 
        // iosInterface.sendGetGroupsRequest && iosInterface.sendGetGroupsRequest.postMessage("trail");
        // AndroidInterface.sendGetGroupsRequest && AndroidInterface.sendGetGroupsRequest("trail");
        console.log("Message sent from web ");
        handleHeaderResponse()

    }, [])
    const getWatchListSymbolsData = (data) => {
        console.log("inside  getWatchListSymbolData", data);
        getWatchListSymbolData(data) //check 
        // iosInterface.sendGetSymbolsRequest && iosInterface.sendGetSymbolsRequest.postMessage(data);
        // AndroidInterface.sendGetSymbolsRequest && AndroidInterface.sendGetSymbolsRequest(data);
        handleWatchListResponse()
    }
    const handleHeaderResponse = () => {
        if (!window.hasOwnProperty('getGroupsResponse')) {
            Object.defineProperty(window, 'getGroupsResponse', {
                value: (response) => {
                    console.log("getGroupsResponse function called in web ",);
                    if (response) {
                        let Grpresponse = JSON.parse(response)
                        if (Grpresponse && Grpresponse.status) {
                            console.log("inside success  Grpresponse.status");
                            setWatchListNames(Grpresponse.data.watchlists);
                            let headerArr = Grpresponse.data.watchlists;
                            let req = JSON.stringify({
                                "wId": headerArr[0].wId,
                            })
                            console.log("intial json ", req);
                            getWatchListSymbolsData(req)

                        }
                        else {
                            setWatchListNames([])
                            console.log("inside failure  Grpresponse.status");
                        }
                    }

                },
                writable: false,
            });
        }
    }
    const handleWatchListClick = (id) => {
        let req = JSON.stringify({
            "wId": id,
        })
        console.log("req", req);
        getWatchListSymbolsData(req)
        handleWatchListResponse()

    }
    const handleWatchListResponse = () => {
        if (!window.hasOwnProperty('getWatchListSymbolsResponse')) {
            Object.defineProperty(window, 'getWatchListSymbolsResponse', {
                value: (response) => {
                    console.log("getWatchListSymbolsResponse function called in web ", response);
                    let watchListrRes = JSON.parse(response);
                    if (watchListrRes.status) {
                        setStockData(watchListrRes.data.symbols)

                    } else {
                        console.log("inside failure getWatchListSymbolsResponse.status");
                    }

                },
                writable: false,
            });
        }
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
