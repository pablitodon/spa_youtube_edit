import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import './index.css';

function App() {

  return (
    <>
      <Header />
      <div className='container'>
        <Outlet />
      </div>
    </>
  )
}
export default App
