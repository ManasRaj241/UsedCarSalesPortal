import Header from '../Components/Header';
import Login from '../Components/Login';

export default function LoginPage() {
  return (
    <div className="bg-gray-800 p-16">
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
      <Login />
    </div>
  );
}
