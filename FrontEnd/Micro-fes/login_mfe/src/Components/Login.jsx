import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { loginFields } from '../Constants/formFields';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './Input';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  const authenticateUser = async () => {
    const postData = {
      username: loginState.emailAddress,
      password: loginState.password,
    };
    console.log(JSON.stringify(postData));
    const response = await fetch('https://localhost:7009/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    try {
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const token = data.result.token;
        Cookies.set('token', token, { expires: 1 });
        Cookies.set('user', loginState.emailAddress);
        console.log('Authentication successful');
        window.location.href = 'http://localhost:8080/home';
      } else {
        console.error('Authentication failed:', data.message);
        setErrorMessage(
          'Please check your credentials. error : ' + data.message
        );
      }
    } catch (error) {
      console.error('Error during authentication:', error.message);
      setErrorMessage(
        'Error during authentication. Please try again.' + error.message
      );
    }
  };

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>

        <FormExtra />
        <FormAction handleSubmit={handleSubmit} text="Login" />
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
