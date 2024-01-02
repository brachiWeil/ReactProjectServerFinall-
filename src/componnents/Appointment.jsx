
import {useState, useEffect} from 'react'
import GlobalState from '../store/GlobalState'
import AppointmentView from './AppointmentView'
import { observer } from 'mobx-react';
import axios from 'axios'; 


const Appointment = observer(() => 
  {
  function getappointments() {
    axios.get(`http://localhost:8787/appointments`).then((res) => {
      GlobalState.appointments=res.data;
      sortArr(GlobalState.appointments);

    });
  }
  function sortArr(arrCopy2) {
    return arrCopy2?.sort(function (a, b) {
      return new Date(a.dateTime) - new Date(b.dateTime);
    });
  }
  useEffect(() => {
    getappointments();
  }, []);
  return (
        <>
          {GlobalState.appointments.map((appointment, index) => (
            <AppointmentView key={index} appointment={appointment} />))}
      </>
  );
});
export default Appointment
