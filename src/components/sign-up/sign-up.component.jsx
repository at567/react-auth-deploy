import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import firebase from "../../firebase/firebase";
import './sign-up.styles.scss';
import axios from 'axios';
import { setCurrentUser } from '../../redux/user/user.actions';
class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      image:''
     
    };
  
  }

  handleSubmit = async event => {
    const { setCurrentUser } = this.props;
    event.preventDefault();

    const {  password, confirmPassword ,image} = this.state;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

   
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(image.name)
    const imagelist = fileRef.put(image);
    imagelist.snapshot.ref.getDownloadURL().then((url) =>{
      this.setState({
        downloadURL: url
      })
      console.log('sss',this.state);
      const { displayName, email, password,downloadURL} = this.state;
      axios.post('https://interview-test-node-deploy.herokuapp.com/users/signup', {
        name: displayName,
        email: email,
        password:password,
        userImage:downloadURL
      })
      .then(function (response) {
        console.log(response);
        if(response.data.message === "Mail exists"){
          alert("This Email ID Already Exists")
          return;
        }
        setCurrentUser(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }).catch(function (err) {
     console.log(err.message);
     alert("INTERNAL SERVER ERROR");
     return;
    })
  };

  handleChange = event => {
    const { name, value } = event.target;
    
    this.setState({ [name]: value });

  
  };

  imageUpload = e => {
    if(e.target.files[0]){
      this.setState({
      image: e.target.files[0]
    })
  }
  };

  render() {
    const { displayName, email, password, confirmPassword  } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
            <label >Select a file:</label>
            <input type="file" name="image"  onChange={this.imageUpload} required></input><br></br><br></br>
          <CustomButton type='submit'>SIGN UP</CustomButton>
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
(SignUp);