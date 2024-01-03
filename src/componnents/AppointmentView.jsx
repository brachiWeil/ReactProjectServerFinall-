import { useState } from 'react'
import GlobalState from '../store/GlobalState';
import { observer } from "mobx-react"
import './Appoitment.css'

const AppointmentView = (observer(({ appointment }) => {

    function funDay(date) {
        const myDate = new Date(date);
        return new Date(
            myDate.getFullYear(),
            myDate.getMonth(),
            myDate.getDate() -1,
        );
    }
        
function funWeek(date) {
    const myDate = new Date(date);
    return new Date(
        myDate.getFullYear(),
        myDate.getMonth(),
        myDate.getDate() - 7,
    );
}
   
    return (
            <div className={ funDay(appointment.dateTime) <= new Date()? "red" : funWeek(appointment.dateTime) <= new Date() ? "orange" : "green"}>          
                <p>id:{appointment.id}</p>
                <p>serviceType:{appointment.serviceType}</p>
                <p>dateTime:{appointment.dateTime}</p>
                <p>clientName:{appointment.clientName}</p>
                <p>clientPhone:{appointment.clientPhone}</p>
                <p>clientEmail:{appointment.clientEmail}</p>
            </div>

    )

}))

export default AppointmentView

