import React, { Component } from "react";
import Field from "./field";
import './form.css';
import '../App.css'
import { Link } from 'react-router-dom'
import Dropdown from "../dropdown/dropDown";
import axios from "../axiosInstance";

class Form extends Component {

    state = {
        issues: [],
        titleInput: '',
        commentInput: '' 
    };

    //form input validation here

    inputChangeHandler = (event, key) => {
        if (key === 'title') {
            let val = event.target.value;
            this.setState({
                titleInput: val
            });
        } else if (key === 'comment') {
            let val = event.target.value;
            this.setState({
                commentInput: val
            });
        } else {};
    }

    issueSubmitHandler = (event) => {
    const issue = {
        title: this.state.titleInput,
        comment: this.state.commentInput 
    }    
    
    axios.post('/issues.json', issue)
        .then((response) => {
            const issuesAll = this.state.issues.concat(issue);
            this.setState({
                issues: issuesAll
            });
        });
    }


    render() {
        console.log(this.state);
        return (
            <div>
            <h1 className="header">yashHub</h1>
            <Link className="switchbtn" to="/">Issue List</Link>
                <Field 
                    label='Title' 
                    type='text' 
                    name='title' 
                    placeHolder='Insert Title Here'
                    value={this.state.titleInput}
                    changed={(e) => this.inputChangeHandler(e, 'title')}/>
                <Field 
                    label='Comment' 
                    type='text' 
                    name='comment' 
                    placeHolder='Leave a Comment'
                    value={this.state.commentInput}
                    changed={(e) => this.inputChangeHandler(e, 'comment')}/>
                    <Dropdown name="Asignees" />
                    <Dropdown name="Labels" />
                <button className='submitbtn' onClick={this.issueSubmitHandler}>Submit</button>
            </div>
    )
}
}

export default Form;


