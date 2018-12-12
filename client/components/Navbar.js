import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
// import query from '../queries/User/fetchCurrentUser';
// import mutation from '../queries/User/Logout';
import icon from './img/15422176017692580.png';


class Navbar extends Component {
	// User Login Functions
	// onLogoutClick() {
	//     this.props.mutate({
	//         refetchqueries: [{ query }],
	//         awaitRefetchQueries: true
	//     })
	//         .then(hashHistory.push('/'));
	// }

	// renderButtons() {
	//     const { loading, user } = this.props.data;
	//     if (loading) { return <div />; }
	//     if (user) {
	//         return (
	//             <li><a className="blue-text" onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
	//         );
	//     } else {
	//         return (
	//             <div>
	//                 <li>
	//                     <Link className="blue-text" to="/signup">Register</Link>
	//                 </li>
	//                 <li>
	//                     <Link className="blue-text" to="/login">Login</Link>
	//                 </li>
	//             </div>
	//         )
	//     }
	// }

	render() {
		return (
		
				<nav className="nav-extended blue-text color orange lighten-5">
					<div className="nav-wrapper blue-text">
						<div className="row">
							<div className="col md6">
								<Link to="/" className="brand-logo right">
									<img src={icon} />
								</Link>
							</div>
							<div className="col md6">
								<ul className="left hide-on-med-and-down">
									<li>
										<Link to="/nonconformances" className="blue-text">
											Nonconformances
										</Link>
									</li>
									<li>
										<Link to="/capas" className="blue-text">
											CAPAs
										</Link>
									</li>
									<li>
										<Link to="/changecontrols" className="blue-text">
											Change Controls
										</Link>
									</li>
									<li>
										<Link to="/searchnc">Search</Link>
									</li>
								</ul>
								{/*<ul className="left">{this.renderButtons()}</ul>
						</div>
					</div>
					{/*<Link to="/" className="brand-logo green-text center">
                        Cognate QA</Link>*/}
							</div>
						</div>
					</div>
				</nav>
				
			
		);
	}
}

export default Navbar;
