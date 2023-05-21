import {Component, ReactNode} from 'react';
import './styles.css'


import logo from '../assets/logo.svg';

import ExpenseForm from './expense'
import IncomeForm from './income';

import{
    LineChart,
    Line,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";





const domain = 'https://budgetreportapi.herokuapp.com'

interface transactionData {
    data: Array<any>
    budgetReport : Array<any>

    isReportGen : Boolean
}


class ReportingTool extends Component<{},transactionData>{

    constructor(props:any) {
        super(props);
    
        this.state = {data:[],budgetReport:[],isReportGen:false};

    }

    async validateToken(){
        var response = await fetch(domain + '/validateToken',{
            method: 'GET',
            credentials: 'include'
        }).then((res)=>{
            if(res['status'] !== 200){
                window.location.replace("/login");
            }
        })
    }

    async getMonthlyTransactions(){
        var response = await fetch(domain + '/monthlyexpenses',{
            method: 'GET',
            credentials: 'include'
        });
        var res = await response.json();
        this.setState({data: res})
    }

    calcCurrentBalence(){



        var balance = this.state.budgetReport[0].income
        for(var i = 0; i< this.state.data.length; i++){
            balance -= this.state.data[i].expense
        }
        

    }

    async getBudgetReport(){
        var response = await fetch(domain + '/budgetReport',{
            method: 'GET',
            credentials: 'include'
        });
        await response.json().then((res)=>{
            this.setState({budgetReport: res})
        }).then(()=>{
            this.getMonthlyTransactions().then(()=>{
                this.render()
                this.setState({isReportGen:true})
            })
        })
        
        
    }

    async componentDidMount() {

        await this.validateToken()

        await this.getBudgetReport()
    }

    render(): ReactNode {
        if(this.state.isReportGen === false)
            return null;

        var transactions = this.state
        return(


            <div className="temp">
                <div className="expenseContainer">
                <h5 className='postCallHeading'>Api Calls</h5>
                    
                    <ExpenseForm></ExpenseForm>

                    <IncomeForm></IncomeForm>
                </div>

            

                <div className='reportingTool'>
                    <div className="heading"><h2>Monthly Expense Report</h2><img src={logo} className="App-logo" alt="logo" /></div>

                    
                    

                    <div className="budgetReportContainer">
                    <h3>Budget Report</h3>
                        <table >
                            <tbody>
                            <tr>
                                <td >Budget Date</td>
                                <td >Budget</td>
                                <td >Current Balence</td>
                            </tr>

                            {transactions.budgetReport.map(data => 
                            <tr key={data.id} className='reportRow'>
                                <td className='reportField'>{data.reportDate.split('T')[0].split('-')[1]+'/'+data.reportDate.split('T')[0].split('-')[2]}</td>
                                <td className='reportField'>{data.income}</td>
                                <td className='reportField'>N/A</td>
                            </tr>)}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="expenseReportContainer">
                        <h3>Expenses</h3>
                        <table >
                            <tbody>
                            <tr>
                                <td >Transaction Date</td>
                                <td >Expense</td>
                                <td >Details</td>
                            </tr>
                            {transactions.data.map(data => 
                            <tr key={data.id} className='expenseRow'>
                                <td className='expenseField'>{data.transactionDate.split('T')[0].split('-')[1]+'/'+data.transactionDate.split('T')[0].split('-')[2]}</td>
                                <td className='expenseField'>{data.expense}</td>
                                <td className='expenseField'>{data.transactionDescription}</td>
                            </tr>)}
                            
                            </tbody>
                        </table>
            
                    </div>
                    <footer className='footer'><br /><br /></footer>
                                
                </div>

                <div style={{ width: "30vw", 
                  height: "30vh",
                  backgroundColor: "#005F6B" ,borderRadius:"10px",margin:"10vh 10vh auto"}}>

                <ResponsiveContainer width="100%" 
                                    height="100%">
                    <LineChart
                    width={500}
                    height={300}
                    
                    data={transactions.data}
                    margin={{
                        top: 40,
                        right: 40,
                        left: 40,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid />
                    <YAxis tick={{ fill: 'white' }}/>
                    <Line type="monotone" dataKey="expense" stroke="white"  strokeWidth={3} dot={{ stroke: 'red'}} />
                   
                    </LineChart>
                </ResponsiveContainer>
                </div>


            </div>
        
        )
    }    
}

export default class ReportingToolPage extends Component{
    render(): ReactNode {
        return (
        
            <div className="App">
            <header className="App-header">
                <ReportingTool></ReportingTool>
            </header>
    
           
            </div>
        );
    }
}

