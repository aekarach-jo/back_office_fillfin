import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Account from './components/account/Account';
import Analytics from './components/analytics/Analytics';
import Content from './components/content/Content';
import Review from './components/review/Review';
import Setting from './components/setting/Setting';
import Login from './components/signin/login';
import Register from './components/signin/register';
import Store from './components/store/Store';
import Home from './pages/Home';
import SideList from './pages/SideList';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <div className="flex">
              <SideList />
              <Home />
            </div>
          } />
          <Route path='/content' element={
            <div className="flex">
              <SideList />
              <Content />
            </div>
          } />
          <Route path='/account' element={
            <div className="flex">
              <SideList />
              <Account />
            </div>
          } />
          <Route path='/store' element={
            <div className="flex">
              <SideList />
              <Store />
            </div>
          } />
          <Route path='/review' element={
            <div className="flex">
              <SideList />
              <Review />
            </div>
          } />
          <Route path='/analytics' element={
            <div className="flex">
              <SideList />
              <Analytics />
            </div>
          } />
          <Route path='/setting' element={
            <div className="flex">
              <SideList />
              <Setting />
            </div>
          } />

          {/* auth */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
