import React, { Component } from 'react';
import axios from 'axios';
import autoBind from 'react-autobind';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			pastData: []
		}
		autoBind(this);
	}

	submitForm(e) {
		e.preventDefault();
		const ref = this;
		axios.post('https://tan-breeze.glitch.me/auth/register', {
			username: ref.state.username,
			password: ref.state.pasword
		})
		.then((res) => {
			localStorage.setItem('author_name', ref.state.username);
			window.location.href = `${window.location.href.substring(0, window.location.href.length-5)}`;
		})
		.catch((err) => {
			console.log(err)
			alert("Try Again");
			window.location.reload();
		})
	}

    render() {
        return (
            <div className="Signup">
                <div className="container">
                	<br/>
	                <br/>
	                <h2>Create New Account</h2>
	                <hr/>
	                <form onSubmit={this.submitForm}>
	                	<label>Username</label>
	                	<input type="text" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} className="form-control"/>
	                	<br/>
	                	<label>Username</label>
	                	<input type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} className="form-control"/>
	                	<br/>
	                	<button className="btn btn-success">Signup</button>
	                </form>
                </div>
            </div>
        );
    }
}

export default Signup;