import Appointment from "./Appointment";
import Service from "./Service";
import { Outlet, Link } from "react-router-dom"

function ServicesMain()
{
    return(
<>
<Link to=''></Link>
<Link to='Service'>Services</Link>|
<Link to='Appointment'>Appointments</Link>
<br></br>
<br></br>

<Outlet/>
</>)
}
export default ServicesMain
