import { RouterProvider } from 'react-router';
import { router } from './components/routes/wireframe';
import './App.css';

function App() {
  return (
    <div className="App w-full h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
