import React from 'react'
import HomePage from './pages/Homepage/homepage';
import { Route ,Switch , Redirect } from 'react-router-dom';
import Header from './components/header/header';
import { connect } from 'react-redux';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

const HatsPage = () => (
  <div>
    <h1>OpenWeatherMap</h1>
  </div>
);


function App({currentUser}) {
  console.log('userlatestvalue',currentUser);
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/dashboard' 
                    render={() =>
                      currentUser ? (
                        <HatsPage />
                        ) : (
                        <Redirect to='/signin' />
                      )
                    } />
          <Route
             exact
             path='/signin'
             render={() =>
               currentUser ? (
                 <Redirect to='/dashboard' />
               ) : (
                 <SignInAndSignUpPage />
               )
             }
          
          />
        </Switch>
      </div>
    );
  }
  const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
  });
  export default connect(
    mapStateToProps
  )(App);;
