import React, { Component } from 'react';
import axios from 'axios';
import autoBind from 'react-autobind';

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			search: 'San Francisco',
			dataset: []
		}
		autoBind(this)
	}

	componentWillMount() {
		const ref = this;
		axios.get('https://tan-breeze.glitch.me/data')
			.then((res) => {
				if (res.data.length > 0) {
					ref.setState({
						dataset: res.data
					})
				}
			})
			.catch((err) => {
				console.log(err)
			})
		
	}

	setGoing() {
		if (this.state.dataset.length > 0 && this.state.data.length > 0) {
			this.state.dataset.map((el) => {
				document.getElementById(`${el.place_id}`).textContent = "1 Going"
			})
		}
	}

	submitForm(e) {
		e.preventDefault();
		const ref = this;
		axios.get(`https://fcc-yelp-backend.herokuapp.com/city/${ref.state.search}`)
			.then((res) => {
				ref.setState({
					data: res.data,
					search: '',
					isGoing: '0 Going'
				})
				this.setGoing();
			})
			.catch((err) => {
				console.log(err)
			})
	}

	go(id) {
		let name = localStorage.getItem('author_name');
		if (!name) {
			alert("Login required");
			window.location.href = `${window.location.href}login`;
		} else {
			axios.post('https://fcc-yelp-backend.herokuapp.com/data', {
				name: name,
				place_id: id
			})
			.then((res) => {
				if (res.data !== "Data removed") {
					document.getElementById(id).textContent = "1 Going";
				} else {
					document.getElementById(id).textContent = "0 Going";
				}
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}

    render() {
    	let places = [], length;
    	if (this.state.data.length > 0) {
    		this.state.data.map((el, i) => {
    			length = el.categories.length - 1;
    			return places.push(
    				<div className="box" key={i}>
	    				<div className="box-inner">
	    					<h3 className="name">{el.name}</h3>
	    					<div className="reviews_and_category">
		    					<span className="categorys">
		    						<b>Category: </b>
		    						{
		    							el.categories.map((elm, i) => {
		    								if (i < length) {
		    									return <span key={i}> {elm.alias},</span>
		    								} else {
		    									return <span key={i}> {elm.alias}</span>
		    								}
		    							})
		    						}
		    					</span>
		    					<span className="review">&nbsp; || &nbsp; <b>Total Reviews:</b> {el.review_count}</span>
		    					<span className="rating">&nbsp; || &nbsp; <b>Rating:</b> {el.rating}</span>
		    					<span className="isClosed">&nbsp; || &nbsp; <b>isClosed:</b> {el.is_closed ? 'Yes' : 'No'}</span>
	    					</div>
							<div className="locations text-big">
								<b>Location:</b> {el.location.display_address[0]}, {el.location.display_address[1]}
							</div>
							<div className="locations text-big">
								<b>Phone Numbers:</b> {el.display_phone}
							</div>
	    				</div>
	    				<div className="box-outter">
	    					<button className={`btn btn-primary`} id={el.id} onClick={() => this.go(el.id)}>{this.state.isGoing}</button>
	    				</div>
    				</div>
    			)
    		})
    	}
        return (
            <div className="Homepage">
            	<br/>
            	<br/>
            	<br/>
                <form onSubmit={this.submitForm} className="text-right form-inline">
					<input type="text" placeholder="Name of place" className="form-control" value={this.state.search} onChange={(e) => this.setState({search: e.target.value})}/> <br/>
					<button className="btn btn-primary">Search</button>
                </form>
                <br/>
                <hr/>
                <br/>
                <div className="places">{places}</div>
            </div>
        );
    }
}

export default Homepage;