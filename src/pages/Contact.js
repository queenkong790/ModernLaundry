// import { Form } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import classes from './BookNowPages/Signup.module.css'
function Contact() {
    return (
        <>
        
        <div className="container " style={{maxWidth:'500px',textAlign:'center'}}>
           
                    <h4 style={{color:'#67cbdf'}}>Thank you for your interest<br/>
Please fill out the form below to inquire about our work</h4>
                    <form className="">
                    <div className="row " style={{margin:'10px',padding:'10px'}}>
                            <div className="form-group col-md-6">
                            <label >Name*</label>                    
                            <input className="form-control" style={{border:'1px solid #67cbdf'}} placeholder="John Doe"></input>
                            </div>
                            <div className="form-group col-md-6">
                            <label >Email*</label>                    
                            <input className="form-control" style={{border:'1px solid #67cbdf'}} placeholder="JohnDoe@gmail.com"></input>
                            </div>
                    </div>
                    <div className="row " style={{margin:'10px',padding:'10px'}}>
                            <div className="form-group col">
                            <label >Phone number*</label>                    
                            <input className="form-control" style={{border:'1px solid #67cbdf'}} placeholder="0501234567"></input>
                            </div>
                    </div>
                    <div className="row " style={{margin:'10px',padding:'10px'}}>
                            <div className="form-group col">
                            <label >message</label>                    
                            <textarea className="form-control" style={{border:'1px solid #67cbdf'}} placeholder="Enter your message"></textarea>
                            </div>
                    </div>
                    <div className="text-center">
                    <button type="submit" className={classes.buttons}> Call US</button>
                    </div>
                    </form>
                
               
        </div>

        
        </>
    );
}

export default Contact;