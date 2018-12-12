import React, { Component } from 'react';
import { Icon, NavItem, Navbar } from 'react-materialize';
import { Link } from 'react-router';

export default class NonconDashboard extends Component {
	render() {
		return (
			<div>
            <Navbar brand='Nonconformances' left>
            
					<NavItem><span><Link to="/nonconformances/create">
						Create NC
                    </Link></span></NavItem>
                    <NavItem><Link to="/nonconformances/open">
						Open NC
					</Link></NavItem>
                    <NavItem><Link to="/nonconformances/closed">
						Closed NC
					</Link></NavItem>
                    
				</Navbar>
			</div>
		);
	}
}
