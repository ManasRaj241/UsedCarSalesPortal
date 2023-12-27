import Header from '../Components/Header';
import Signup from '../Components/Signup';

export default function SignupPage() {
  return (
    <div className="bg-gray-800 p-16">
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
      />
      <Signup />
    </div>
  );
}
