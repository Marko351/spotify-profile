import { FC, ReactElement } from 'react';

const Login: FC = (): ReactElement => {
  return (
    <div className="text-gray-300 flex items-center justify-center flex-col bg-background-dark min-h-screen relative ">
      <h1>Login to Spotify Profile</h1>
      <button>LOGIN</button>
    </div>
  );
};

export default Login;
