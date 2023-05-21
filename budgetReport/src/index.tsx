import './components/styles.css'
import ReportingToolPage  from './components/reportingtool';
import LoginPage from './components/login'
// UNINSTALL import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from 'react';


import ReactDOM from 'react-dom/client';
import { response } from 'express';
const domain = 'https://budgetreportapi.herokuapp.com'




function Controller() {
    var path = window.location.pathname

    if(path == '/reportingtool'){
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
  



