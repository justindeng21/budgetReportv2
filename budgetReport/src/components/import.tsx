
import {Component, ReactNode} from 'react';
import './styles.css'






const domain = 'https://budgetreportapi.herokuapp.com'
type ImportState = {
    file: any

}


export default class ImportForm extends Component<{},ImportState>{
    constructor(props: any){
        super(props)

        this.state = {file:[]};

        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        

    }




    handleFileChange(event : any){
        this.setState({file: event.target.files[0]})
    }


    handleSubmit(event : any){
        const fileReader = new FileReader();

        if (this.state.file) {
            fileReader.onload = function (event : any) {
                const csvOutput = event.target.result;
                const csvRows = csvOutput.slice(csvOutput.indexOf("\n") + 1).split("\n");
                var payload : Array<object>
                payload = []
                for(var i = 0; i < csvRows.length; i++){
                    var obj = {
                        'date':csvRows[i].split(',')[0],
                        'value':csvRows[i].split(',')[1],
                        'description':csvRows[i].split(',')[2]
                    }
                    payload.push(obj)
                }
                fetch(domain + '/importExpenses', {
                    method: 'POST',
                    credentials: 'include', 
                    headers:{
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(payload)
    
                }).then(()=>{
                    
                })
            };
            
            
            fileReader.readAsText(this.state.file)
        }
    }

    render(): ReactNode {

        return(
            <form onSubmit={(event) => event.preventDefault()} className='form'>
                <input type={"file"} accept={".csv"} onChange={this.handleFileChange}/>
                <button type='submit' className="submit" onClick={this.handleSubmit}>Submit</button>
            </form>
        )

    }
}