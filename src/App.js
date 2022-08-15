import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectRoute from './auth/ProtectRoute';
import Account from './components/account/Account';
import AccountDetail from './components/account/accountDetail/accountDetail';
import LiveChat from './components/livechat/liveChat';
import Bank from './components/bank/Bank';
import Content from './components/content/Content';
import ContentDetail from './components/content/contentDetail/contentDetail';
import Order from './components/order/order';
import OrderDetail from './components/order/orderDetail/orderDetail';
import Package from './components/package/Package';
import Payment from './components/payment/payment';
import PaymentDetail from './components/payment/paymentDetail/paymentDetail';
import Review from './components/review/Review';
import Setting from './components/setting/Setting';
import Login from './components/signin/login';
import Register from './components/signin/register';
import Store from './components/store/Store';
import StoreDetail from './components/store/storeDetail/storeDetail';
import SideList from './pages/SideList';
import Dashboard from './components/dashboard/dashboard';
import Admin from './components/admin/admin';
import AdminDetail from './components/admin/adminDetail/adminDetail';
import Report from './components/report/report';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectRoute />} >
            <Route path='/' element={
              <div className="flex">
                <SideList />
                <Dashboard />
              </div>
            } />
            <Route path='/content' element={
              <div className="flex">
                <SideList />
                <Content />
              </div>
            } />
            <Route path='/admin' element={
              <div className="flex">
                <SideList />
                <Admin />
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
            <Route path='/livechat' element={
              <div className="flex">
                <SideList />
                <LiveChat />
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
            <Route path='/payment' element={
              <div className="flex">
                <SideList />
                <Payment />
              </div>
            } />
            <Route path='/order' element={
              <div className="flex">
                <SideList />
                <Order />
              </div>
            } />
            <Route path='/report' element={
              <div className="flex">
                <SideList />
                <Report />
              </div>
            } />

            {/* Route Level 2 */}
            <Route path='/admin/detail' element={
              <div className="flex">
                <SideList />
                <AdminDetail />
              </div>
            } />
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
            <Route path='/store/detail' element={
              <div className="flex">
                <SideList />
                <StoreDetail />
              </div>
            } />
            <Route path='/payment/detail' element={
              <div className="flex">
                <SideList />
                <PaymentDetail />
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


