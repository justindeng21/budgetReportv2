import {Component, ReactNode} from 'react';
import './styles.css'


import logo from '../assets/logo.svg';

import ExpenseForm from './expense'
import ImportForm from './import';

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
        await fetch(domain + '/validateToken',{
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
                
            })
        })
        
        
    }

    logout(){
        var response = fetch(domain + '/endSession',{
            method: 'GET',
            credentials: 'include'
        }).then(() => {
            console.log('log off sucessful')
        });
    }

    async componentDidMount() {

        await this.validateToken()

        await this.getBudgetReport()

        this.setState({isReportGen:true})

    }

    render(): ReactNode {
        if(this.state.isReportGen === false)
            return null;

        var transactions = this.state
        return(


            <div className="apiContainer">
                <div className="expenseContainer">
                <h5 className='postCallHeading'>Api Calls</h5>
                    
                    <ExpenseForm></ExpenseForm>

                    <ImportForm></ImportForm>
                </div>

            

                <div className='reportingTool'>
                    <div className="heading"><h2>Monthly Expense Report</h2><img src={logo} className="App-logo" alt="logo" /></div>

                    
                    

                    <div className="budgetReportContainer">
                    <h3>Income Report</h3>
                        <table >
                            <tbody>
                            <tr>
                                <td >Report Date</td>
                                <td >Income</td>
                            </tr>

                            {transactions.budgetReport.map(data => 
                            <tr key={data.id} className='reportRow'>
                                <td className='reportField'>{data.reportDate.split('T')[0].split('-')[1]+'/'+data.reportDate.split('T')[0].split('-')[2]}</td>
                                <td className='reportField'>{data.income}</td>
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
                                <td className='expenseFieldDate'>{data.transactionDate.split('T')[0].split('-')[1]+'/'+data.transactionDate.split('T')[0].split('-')[2]}</td>
                                <td className='expenseFieldTrans'>{data.expense}</td>
                                <td className='expenseFieldDesc'>{data.transactionDescription}</td>
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
                            bottom: 40,
                        }}
                        >
                        <CartesianGrid />
                        <YAxis tick={{ fill: 'white' }}/>
                        <Line type="monotone" dataKey="expense" stroke="white"  strokeWidth={3} />
                    
                        </LineChart>
                    </ResponsiveContainer>
                </div>


                <button onClick={this.logout}>Log Out</button>


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

