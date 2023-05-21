import './components/styles.css'
import ReportingToolPage  from './components/reportingtool';
import LoginPage from './components/login'
// UNINSTALL import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';


import ReactDOM from 'react-dom/client';
const domain = 'https://budgetreportapi.herokuapp.com'


function Controller() {
    const pathname = window.location.pathname



        
    fetch(domain + '/validateToken', {
        method: 'GET',
        credentials: 'include', 
    }).then((res)=>{
        if(res['status'] === 200){
            return(
                <ReportingToolPage></ReportingToolPage>
            )
        }
    })  

    return(
        <LoginPage></LoginPage>
    )
    

    
}



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <Controller/>
    </React.StrictMode>
);
  



