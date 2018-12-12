import React from 'react';
import Navbar from './Navbar';


const App = props => {
	// materialize assumes a root component with className of container
	return (
		<div className="container">
			<Navbar />
			
			{props.children}
		</div>
	);
};

export default App;
