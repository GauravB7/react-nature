/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Menubar from './Menubar';
import Footer from './Footer';
import contactService from '../services/contactUs.service';

class contactUs extends React.Component {

    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            query:'',
            nameError:'',
            emailError:'',
            queryError:''
        }
        if(localStorage.getItem('name')&&localStorage.getItem('email')){
            this.state.name=localStorage.getItem('name');
            this.state.email=localStorage.getItem('email');
        }
        this.initialState=this.state;
    }

    stopContactSubmission=(e)=>{
        e.preventDefault()
        const isValid = this.contactUsValidate()
        if(isValid){
            console.log(this.state);
            contactService.addContact(this.state.name,this.state.email,this.state.query).then(res=>{
                alert("Thank you for contacting Us");
            }).catch(err=>{
                alert("Some error occured. Try again");
            })
            this.setState(this.initialState)
        } 
    }

    contactUsValidate=()=>{
        let nameError=""
        let emailError = ""
        let queryError=""
        if(!this.state.name){
            nameError="Name cannot be empty"
        }
        else if(!this.state.name.match(/[A-za-z]+$/)){
            nameError="IName should consists of only characters"
        }
        if(!this.state.email){
            emailError="Email cannot be empty"
        }
        else if(!this.state.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            emailError="Invalid Email"
        }
        if(!this.state.query){
            queryError="Please Enter your query"
        }
        
        if(nameError || emailError || queryError){
            this.setState({nameError:nameError, emailError:emailError,queryError:queryError})
            return false
        }
        return true;
    }

  render() {
    return (
        <div>
            <Header/>
            <Navbar/>
            <Menubar/>
            <div className="contactUsBlock">
                <h3>CONTACT US</h3>
                <div className="contactUsForm">
                    <form name="contactForm" method="POST" onSubmit={this.stopContactSubmission}>
                        <h2>Contact</h2>
                        <div className="form-group">
                            <p>
                            <label htmlFor="cust_name">Name :</label>
                            <input type="text" id="customerName" required="" value={this.state.name} onChange={(e)=>{
                                this.setState({
                                    name:e.target.value
                                })
                            }}/>
                            <span id="nameError">{this.state.nameError}</span>
                            </p>
                        </div>
                        <div className="form-group">
                            <p>
                            <label htmlFor="cust_name">Email : </label>
                            <input type="text" id="customerMail" required="" value={this.state.email} onChange={(e)=>{
                                this.setState({
                                    email:e.target.value
                                })
                            }}/>
                            <span id="emailError">{this.state.emailError}</span>
                            </p>
                        </div>
                        <div className="form-group">
                            <p>
                            <label htmlFor="cust_message" className="query">Query:</label><br />
                            <textarea rows="4" id="customerNote" name="customerNote"  required="" value={this.state.query} onChange={(e)=>{
                                this.setState({
                                    query:e.target.value
                                })
                            }}></textarea><span id="queryError">{this.state.queryError}</span>
                            
                            </p>
                        </div>
                        <a className="formSubmit" href="#"> <input type="submit"  id="submit" value="Submit"/></a>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
  }
}

export default contactUs;