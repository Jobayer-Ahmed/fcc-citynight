import React, { Component } from 'react';
import axios from 'axios';
import autoBind from 'react-autobind';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
		autoBind(this);
	}

	submitForm(e) {
		e.preventDefault();
		const state = this.state;
		if (state.username !== '' && state.password !== '') {
			axios.post('https://tan-breeze.glitch.me/auth/login', {
				username: state.username,
				password: state.password
			})
			.then((res) => {
				localStorage.setItem('author_name', state.username);
				window.location.href = `${window.location.href.substring(0, window.location.href.length-5)}`;
			})
			.catch((err) => {
				console.log(err)
				alert("Username Not found")
			})
		}
	}

    render() {
        return (
            <div className="Login">
                <div className="container">
                	<br/>
	                <br/>
	                <h2>Log in</h2>
	                <hr/>
	                <form onSubmit={this.submitForm}>
	                	<label>Username</label>
	                	<input type="text" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} className="form-control"/>
	                	<br/>
	                	<label>Username</label>
	                	<input type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} className="form-control"/>
	                	<br/>
	                	<button className="btn btn-success">Login</button><br/><br/>
	                	<span className="register text-capitalize text-success"><a href={`${window.location.href.substring(0, window.location.href.length-6)}/signup`}>create new account</a></span>
	                </form>
                </div>
            </div>
        );
    }
}

export default Login;