import React from 'react';
import { setCurrentUser } from '../../redux/user/user.actions';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import axios from 'axios';
import './sign-in.styles.scss';
import { connect } from 'react-redux';
class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    
  }

  handleSubmit = event => {
    const { setCurrentUser } = this.props;
    event.preventDefault();

    this.setState({ email: '', password: '' });
   const { email , password } = this.state;
    axios.post('https://interview-test-node-deploy.herokuapp.com/users/login', {
      email: email,
      password:password,
    })
    .then(function (response) {
      console.log(response.data);
      if(response.data.message === "Auth failed"){
        alert("UserName Or Password Invaid")
        return;
      }
      setCurrentUser(response.data);
    
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='Email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='Password'
            required
          />
          <CustomButton type='submit'> Sign in </CustomButton>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default 
connect(
  null,
  mapDispatchToProps
)
(SignIn);