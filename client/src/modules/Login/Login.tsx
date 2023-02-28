import { FC, ReactElement } from 'react';
import { useLogin } from './loginApiRoutes';

const Login: FC = (): ReactElement => {
  const { mutate: loginMutation } = useLogin();

  return (
    <div className="text-gray-300 flex items-center justify-center flex-col bg-background-dark min-h-screen relative ">
      <h1>Spotify Profile</h1>
      <button onClick={() => loginMutation()}>LOGIN TO SPOTIFY PROFILE</button>
    </div>
  );
};

export default Login;
