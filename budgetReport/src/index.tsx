import './components/styles.css'
import ReportingToolPage  from './components/reportingtool';
import LoginPage from './components/login'
// UNINSTALL import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';


import ReactDOM from 'react-dom/client';


function Controller() {
    const pathname = window.location.pathname
    
    if(pathname === '/reportingtool'){
        return(
            <ReportingToolPage></ReportingToolPage>
        )
    }

    else{
        return(
            <LoginPage></LoginPage>
        )
    }
}



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <Controller/>
    </React.StrictMode>
);
  



