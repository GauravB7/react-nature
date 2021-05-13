import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Menubar from './Menubar';
import Footer from './Footer';
import feedbackService from '../services/feedback.service';

class Feedback extends React.Component {

    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            feedback:'',
            nameError:'',
            emailError:'',
            feedbackError:''
        }
        if(localStorage.getItem('name')&&localStorage.getItem('email')){
            this.state.name=localStorage.getItem('name');
            this.state.email=localStorage.getItem('email');
        }
        this.initialState=this.state;
    }

    stopFeedbackSubmission=(e)=>{
        e.preventDefault()
        const isValid = this.feedbackValidate()
        if(isValid){
            console.log(this.state);
            feedbackService.addFeedback(this.state.name,this.state.email,this.state.feedback).then(res=>{
                alert("Thank You for your valuable feedback");
            }).catch(err=>{
                alert("Some error occured. Try again");
            })
            this.setState(this.initialState);
            
            
        } 
    }

    feedbackValidate=()=>{
        let nameError=""
        let emailError = ""
        let feedbackError=""
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
        if(!this.state.feedback){
            feedbackError="Please Enter your query"
        }
        
        if(nameError || emailError || feedbackError){
            this.setState({nameError:nameError, emailError:emailError,feedbackError})
            return false
        }
        return true;
    }


  render() {
    const { name, email, feedback } = this.state;
    const isEnabled = name.length > 0 && email.length > 0 && feedback.length > 0;
    return (
       <div>
           <Header/>
           <Navbar/>
           <Menubar/>
           <div className="feedbackBlock">
                <h3>FEEDBACK</h3>
                <div className="feedbackForm">
                    <form name="feedbackForm" method="POST" onSubmit={this.stopFeedbackSubmission}>
                        <h2>Your Feedback</h2>
                        <div className="form-group">
                            <p>
                            <label htmlFor="cust_name">Name :</label>
                            <input placeholder="e.g. Mahendra Dhoni" type="text" id="customerName" required="" value={this.state.name} onChange={(e)=>{
                                this.setState({
                                    name:e.target.value
                                })
                            }}/>
                            <span id="nameError">{this.state.nameError}</span>
                            </p>
                        </div>
                        <div className="form-group">
                            <p>
                            <label htmlFor="cust_name">Email :</label>
                            <input type="text" placeholder="e.g. md123@gmail.com" id="customerMail" required="" value={this.state.email} onChange={(e)=>{
                                this.setState({
                                    email:e.target.value
                                })
                            }}/>
                            <span id="emailError">{this.state.emailError}</span>
                            </p>
                        </div>
                        <div className="form-group">
                            <p className="formfield">
                            <label htmlFor="cust_message">Comment:</label><br />
                            <textarea rows="5" id="customerNote" name="customerNote" placeholder="Write something here..." value={this.state.feedback} onChange={(e)=>{
                                this.setState({
                                    feedback:e.target.value
                                })
                            }}></textarea>
                            <span id="feedbackError">{this.state.feedbackError}</span>
                            </p>
                        </div>
                        <a href=" # " className="feedbackSubmit"><input disabled={!isEnabled} type="submit" id="submit" value="Post comment"/></a>
                    </form>
                </div>
            </div>
           <Footer/>
       </div>
    );
  }
}

export default Feedback;