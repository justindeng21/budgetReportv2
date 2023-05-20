
import {Component, ReactNode} from 'react';
import './styles.css'


const domain = 'https://budgetreportapi.herokuapp.com'
type expenseState = {
    expense : string
    transactionDescription : string
}
export default class ExpenseForm extends Component<{},expenseState>{

        constructor(props : any) {
            super(props);
            this.state = {expense: '',transactionDescription:''};

            this.handleExpenseChange = this.handleExpenseChange.bind(this);
            this.handleDescChange = this.handleDescChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleExpenseChange(event : any) {
            this.setState({expense: event.target.value});
        }

        handleDescChange(event : any) {
            this.setState({transactionDescription: event.target.value});
        }


        handleSubmit(event : any) {
            var body = this.state
            console.log(body)
            fetch(domain + '/createTransaction', {

                method: 'POST', 
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(body)

            }).then(()=>{
                window.location.reload();
            })
        
        }


    render(): ReactNode {
        return(
            <form onSubmit={(event) => event.preventDefault()} className='form'>
                <h5 className='postCallHeading'>Report Expense</h5>
                <input type="text" className="basic-input" value = {this.state.expense} pattern="[0-9]*\.[0-9]{2}" placeholder='Expense' onChange={this.handleExpenseChange}/>
                <input type="text" className="basic-input" maxLength={50} value = {this.state.transactionDescription} placeholder='Desc.' onChange={this.handleDescChange}/>
                <button type='submit' className="submit" onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}