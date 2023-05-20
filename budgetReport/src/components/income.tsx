
import {Component, ReactNode} from 'react';
import './styles.css'






const domain = 'https://budgetreportapi.herokuapp.com'
type incomeState = {
    income: string
}


export default class IncomeForm extends Component<{},incomeState>{
    constructor(props: any){
        super(props)

        this.state = {income:''};

        this.handleIncomeChange = this.handleIncomeChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleIncomeChange(event : any){
        this.setState({income: event.target.value})
    }


    handleSubmit(event : any){
        var body = this.state
        fetch(domain + '/createReport', {
            method: 'POST', 
            credentials: 'include',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(body)

        })
    }

    render(): ReactNode {

        return(
            <form onSubmit={(event) => event.preventDefault()} className='form'>
                <h5 className='postCallHeading'>Report Income</h5>
                <input type="text" className="basic-input" value = {this.state.income} pattern="[0-9]*\.[0-9]{2}" placeholder='income' onChange={this.handleIncomeChange}/>
                <button type='submit' className="submit" onClick={this.handleSubmit}>Submit</button>
            </form>
        )


    }
}