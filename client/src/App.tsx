import { FC, ReactElement, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Login = lazy(() => import('./modules/Login/Login'));
const Homepage = lazy(() => import('./modules/Layout/Homepage'));
//font-SpaceMono
const App: FC = (): ReactElement => {
  return (
    <div className="overflow-hidden">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Homepage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
