import { useState } from 'react';
import { signupFields } from '../Constants/formFields';
import FormAction from './FormAction';
import Input from './Input';

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  const createAccount = async () => {
    const postData = {
      userName: signupState.userName,
      email: signupState.emailAddress,
      phoneNumber: signupState.phoneNumber,
      password: signupState.password,
      role: 'User',
    };
    console.log('PostData ' + postData);
    try {
      const registerResponse = await fetch('https://localhost:7009/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const data = await registerResponse.json();
      console.log(data);
      if (registerResponse.ok) {
        console.log('Account created successfully');
        setErrorMessage('Account Created Successfully');
        const assignRoleResponse = await fetch('https://localhost:7009/Role', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        const dataa = await assignRoleResponse.json();
        console.log(dataa);
        if (assignRoleResponse.ok) {
          console.log('Role assigned successfully');
        } else {
          console.error('Error assigning role:', assignRoleResponse.message);
          setErrorMessage(
            'Error while creating account. Error : ' +
              assignRoleResponse.message
          );
        }
      } else {
        console.error('Error creating account:', registerResponse.message);
        setErrorMessage(
          'Error while creating account. Error : ' + registerResponse.message
        );
      }
    } catch (error) {
      console.error('Error during account creation:', error.message);
      setErrorMessage('Error while creating account. Error : ' + error.message);
    }
  };

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
