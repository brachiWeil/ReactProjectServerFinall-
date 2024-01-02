import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import './AdminPersonalDetails.jsx'
import './AdminListAppointmet.css'
export default function ListAppoitments() {

    const [data, setData] = useState([]);
    const [password, setPassword] = useState("")
    const [filterData, setFilterData] = useState([])

    const now = new Date();
    const day = now.getDay()
    const week = now.getDay() + 7

    let nav = useNavigate()

    useEffect(() => {
        getAllAppoiments()
    }, [])

    const getAllAppoiments = () => {
        axios
            .get("http://localhost:8787/appointments")
            .then((response) => {
                setFilterData(data.sort = (a, b) => { return a.dateTime - b.dateTime })

            })
            .catch((error) => {
            });

    };
    return (
        <div>
            {filterData && filterData.map(item => {
                return <li
                    class={item.dateTime.getDay() == day ? "red" : item.dateTime.getDay() <= week//שבוע 
                        ? "orange" : "green"}>
                    {item.name}</li>
            })}
        </div>
    );

}