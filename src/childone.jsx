import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/searchBar';
import { searchwatchListSymbolsRequest } from './utils/device-interface';
import BackImg from "./assets/images/left-arrow.png";
import "./css/searchScreen.css"

export default function SearchComp() {
    const [stockList, setStockList] = useState([])
    const navigate = useNavigate();
    const handleSearchInput = (e) => {
        console.log("eeeeeeeeeeeeeeeeee", e.target.name, e.target.value);
        if ((e.target.value).length > 1) {
            let req = JSON.stringify({
                'symbol': (e.target.value).toUpperCase()
            })
            console.log("req", req);
            searchwatchListSymbolsRequest(req);
            if (!window.hasOwnProperty('getSearchSymbolsResponse')) {
                Object.defineProperty(window, 'getSearchSymbolsResponse', {
                    value: (res) => {
                        console.log("getSearchSymbolsResponse function called in web ", res);
                        let response = JSON.parse(res)
                        setStockList(response.data.symbols)
                        // return JSON.parse(response);
                    },
                    writable: false,
                });
            }
        }
    }
    return (
        <div>
            <div className="searchHeader">
                <div className="searchBack" onClick={() => navigate(-1)}>
                    <img src={BackImg} />
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
                {stockList.length == 0 ?
                    <div className='empty_stockData'>
                        <p>search stock  to Display</p>
                    </div> : ''}

            </div>
        </div>
    )
}
