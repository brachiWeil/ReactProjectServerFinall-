import { observable, makeObservable, action } from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';
class GlobalState {

    business = {
        id: "",
        name: "",
        address: "",
        phone: "",
        owner: "",
        logo: "",
        description: "good",
    }
    appointments = [
        {
            id: "",
            serviceType: "",
            dateTime: "",//מבנה של תאריך ושעה סטנדרטי בjs
            clientName: "",
            clientPhone: "",
            clientEmail: "",
        },
        {
            id: "",
            serviceType: "",
            dateTime: "",//מבנה של תאריך ושעה סטנדרטי בjs
            clientName: "",
            clientPhone: "",
            clientEmail: "",
        }
       ];
    services = [

        {
            id: "12",
            name: "פגישת ייעוץ פרונטלית",
            description: "פגישת ייעוץ פרטנית בקליניקה",
            price: 500,
            duration: 60,

        },
        {
            id: "12",
            name: "פגישת ייעוץ פרונטלית",
            description: "פגישת ייעוץ פרטנית בקליניקה",
            price: 500,
            duration: 60,

        },
        {
            id: "12",
            name: "פגישת זום",
            description: "פגישת ייעוץ פרטנית בקליניקה",
            price: 500,
            duration: 60,

        }];
        isLogin = false;
    setIsLogin = (val) => { this.isLogin = val }
    initBusiness = async () => {
        const response = await fetch("http://localhost:8787/businessData");
        const data = await response.json();
        console.log(this.business);
        console.log(this.business.id);

    }
    initServices = async () => {
        const response = await fetch("http://localhost:8787/services");
        const data = await response.json();
        this.setServices(data)
        console.log(this.services);
        console.log(this.services.id);
    }
   
    constructor() {
        makeObservable(this, {
            isLogin: observable,
            setIsLogin: action,
            business: observable,
            initBusiness: action,
            setBusiness: action,
            edit: observable,
            sentToEdit: action,
            isAdmin: observable,
            setIsAdmin: action,
            services: observable,
            addService: action,
            addAppointment: action,
            appointments: observable,
           
        })
    }
    setServices(val) {
        this.service = val;
    }
    setBusiness(val) {
        this.business = val;
    }
    addService = (val) => {
        this.services.push(val);
    }
    addAppointment = (val) => {
        this.appointments.push(val);
    }

    edit = false;
    sentToEdit = (val) => {
        this.edit = val;
    }

   
    isAdmin = false;
    setIsAdmin = (val) => {
        this.isAdmin = val;
    }


}
export default new GlobalState();
  