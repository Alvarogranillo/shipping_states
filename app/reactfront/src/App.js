import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ShowEnvio from './components/ShowEnvio';
import CreateEnvio from './components/CreateEnvio';
import EditEnvio from './components/EditEnvio';
import ShowUpdate from './components/ShowUpdate';
function App() {
  return (
    <div className="App">
      <BrowserRouter>

      <Routes>
        <Route path='/' element={<ShowEnvio/>}/>
        <Route path='/create' element={<CreateEnvio/>}/>
        <Route path='/edit/:id' element={<EditEnvio/>}  />
        <Route path='/update' element={<ShowUpdate/>}/>
      </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
