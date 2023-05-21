import './components/styles.css'
import ReportingToolPage  from './components/reportingtool';
import LoginPage from './components/login'
// UNINSTALL import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from 'react';


import ReactDOM from 'react-dom/client';
import { response } from 'express';
const domain = 'https://budgetreportapi.herokuapp.com'



type ControllerState = {
    validated : boolean,
    validToken : boolean
}

class Controller extends Component<{},ControllerState> {
    


    constructor(props:any){
        super(props)
        this.state = {validated:false,validToken:false}
    }
        
    validateToken() {
        fetch(domain + '/validateToken', {
            method: 'GET',
            credentials: 'include', 

        }).then((res)=>{
            if(res['status'] === 200){
                this.setState({validated:true,validToken:true})
            }
            else{
                this.setState({validated:true,validToken:false})
            }
        })
    
    }
     
   
    render(): React.ReactNode {
        if(this.state.validated === false)
            return null;
        
        else if(this.state.validToken === true){
            return(
                <ReportingToolPage></ReportingToolPage>
            )
        }

        else if(this.state.validToken === false){
            return(
                <LoginPage></LoginPage>
            )
        }
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
  



