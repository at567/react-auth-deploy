import React  from 'react';
import './header.style.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/cube.svg';
import { setCurrentUser } from '../../redux/user/user.actions';


const Header =  ({currentUser}) => {
  console.log('uservalue',currentUser);
  return (
    <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
    {currentUser ? (
      <div className='option' >
      <div className="navigation">
      <Link className="button" onClick = { () => window.location.reload()}>
  	  <image src={currentUser.user[0].userImage} alt="image"></image>
      <div className="logout">LOGOUT</div>
      </Link>
      </div>
      </div>
      ) : (
       <Link className='option' to='/signin'>
        Sign In
      </Link>
      )}
    </div>
  </div>
);
}
const mapStateToProps = state => ({
currentUser: state.user.currentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(
mapStateToProps
,
mapDispatchToProps)(Header);