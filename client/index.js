import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
//dependencies for storing local state
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-client-preset';

import App from './components/App';
// import LoginForm from './components/LoginForm';
// import SignupForm from './components/SignupForm';
// import Dashboard from './components/Dashboard';
// import requireAuth from './components/RequireAuth';
// import DeviationList from './components/DeviationList';
import NonconCreate from './components/NonconCreate';
import NonconUpdate from './components/NonconUpdate';
import NonconList from './components/NonconList';
import NonconClosedList from './components/NonconClosedList';
import NonconDetail from './components/NonconDetail';
import NonconDashboard from './components/NonconDashboard'
// import CapaCreate from './components/CapaCreate';
// import CapaDetail from './components/CapaDetail';
// import ChangeControlCreate from './components/ChangeControlCreate';

// import DeviationSearch from './components/DeviationSearch';

const networkInterface = createNetworkInterface({
	uri: '/graphql',
	opts: {
		credentials: 'same-origin'
	}
});
//set up Cache
const cache = new InMemoryCache();

//const client = new ApolloClient({});
const client = new ApolloClient({
	dataIdFromObject: o => o.id,
	networkInterface,
	link: ApolloLink.from([]),
	cache: cache,
	credentials: 'include'
});

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					{/*-- <IndexRoute component={LoginForm} />
					  <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
  <Route path="/dashboard" component={requireAuth(Dashboard)} /> */}
					<Route path="/nonconformances" component={NonconDashboard} />
					<Route path="/nonconformances/open" component={NonconList} />
					<Route path="/nonconformances/closed" component={NonconClosedList} />
					<Route path="/nonconformances/create" component={NonconCreate} />
					<Route
						exact
						path="/nonconformances/:id/update"
						component={NonconUpdate}
					/>
					<Route path="/nonconformances/:id" component={NonconDetail} />
					{/*-- 
					<Route path="/capas" component={(CapaCreate)} />
					<Route path="/capas/:id" component={(CapaDetail)} />
					<Route path="/changecontrols" component={ChangeControlCreate} />
					<Route path="/searchdeviations" component={DeviationSearch} />--*/}
				</Route>
			</Router>
		</ApolloProvider>
	);
};

ReactDOM.render(<Root />, document.querySelector('#root'));
