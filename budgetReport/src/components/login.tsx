
import {Component, ReactNode} from 'react';
import './styles.css'



type loginState = {
    username: string
    password: string
}

const domain = 'https://budgetreportapi.herokuapp.com'


class LoginForm extends Component<{},loginState>{

    constructor(props : any) {
        super(props);
        this.state = {username: '',password:''};

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserNameChange(event : any) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event : any) {
        this.setState({password: event.target.value});
    }


    handleSubmit(event : any) {
        var body = this.state
        fetch(domain + '/auth', {
            method: 'POST', 
            credentials: 'include',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(body)

        }).then((res)=>{
            if(res['status'] === 204){
                this.setState({username: '',password:''});
                window.location.replace("/reportingtool");
            }
        })
    }

    render(): ReactNode {
        return(
            <form onSubmit={(event) => event.preventDefault()} className='form'>
                
                <input type="text" className="basic-input" value = {this.state.username} placeholder='Username' onChange={this.handleUserNameChange}/>
                <input type="password" className="basic-input" maxLength={50} value = {this.state.password} placeholder='Password' onChange={this.handlePasswordChange}/>
                <button type='submit' className="loginSubmit" onClick={this.handleSubmit}>Login</button>
            </form>
        )
    }
}

export default class LoginPage extends Component{
    render(): ReactNode {
        return( 
            <div className="App">
                <h1>Hi Vivek Anand, please give me access to my Heroku account</h1>
            <div className="loginContainer">
                    Login
                    
                    <LoginForm></LoginForm>
                </div>
            </div>
        )
    }
}
