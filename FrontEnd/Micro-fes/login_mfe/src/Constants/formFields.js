const loginFields = [
  {
    labelText: 'Email address',
    labelFor: 'emailAddress',
    id: 'emailAddress',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
];

const signupFields = [
  {
    labelText: 'UserName',
    labelFor: 'userName',
    id: 'userName',
    name: 'userName',
    type: 'text',
    autoComplete: 'userName',
    isRequired: true,
    placeholder: 'Username',
  },
  {
    labelText: 'Email address',
    labelFor: 'emailAddress',
    id: 'emailAddress',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
  },
  {
    labelText: 'Phone Number',
    labelFor: 'phoneNumber',
    id: 'phoneNumber',
    name: 'phoneNumber',
    type: 'text',
    autoComplete: 'phoneNumber',
    isRequired: true,
    placeholder: 'Enter Your Phone Number',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
];

export { loginFields, signupFields };
