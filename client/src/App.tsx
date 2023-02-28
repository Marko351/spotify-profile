import { FC, ReactElement, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const Login = lazy(() => import('./modules/Login/Login'));
const Homepage = lazy(() => import('./modules/Layout/Homepage'));
//font-SpaceMono

const queryClient = new QueryClient();

const App: FC = (): ReactElement => {
  return (
    <div className="overflow-hidden">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Homepage />}></Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
