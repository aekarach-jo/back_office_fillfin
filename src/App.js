import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectRoute from './auth/ProtectRoute';
import Account from './components/account/Account';
import AccountDetail from './components/account/accountDetail/accountDetail';
import Analytics from './components/analytics/Analytics';
import Bank from './components/bank/Bank';
import Content from './components/content/Content';
import ContentDetail from './components/content/contentDetail/contentDetail';
import Order from './components/order/order';
import OrderDetail from './components/order/orderDetail/orderDetail';
import Package from './components/package/Package';
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
          <Route element={<ProtectRoute />} >
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
            <Route path='/bank' element={
              <div className="flex">
                <SideList />
                <Bank />
              </div>
            } />
            <Route path='/package' element={
              <div className="flex">
                <SideList />
                <Package />
              </div>
            } />
            <Route path='/order' element={
              <div className="flex">
                <SideList />
                <Order />
              </div>
            } />

            {/* Route Level 2 */}
            <Route path='/order/detail' element={
              <div className="flex">
                <SideList />
                <OrderDetail />
              </div>
            } />
            <Route path='/content/detail' element={
              <div className="flex">
                <SideList />
                <ContentDetail />
              </div>
            } />
            <Route path='/account/detail' element={
              <div className="flex">
                <SideList />
                <AccountDetail />
              </div>
            } />
          </Route>

          {/* auth */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


