import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/shared/ScrollToTop'
import DocumentTitle from './components/shared/DocumentTitle'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import Restaurant from './components/Restaurant/Restaurant'
import HomePage from './components/Restaurant/pages/HomePage'
import MenuPage from './components/Restaurant/pages/MenuPage'
import AboutPage from './components/Restaurant/pages/AboutPage'
import ReservePage from './components/Restaurant/pages/ReservePage'
import Ecommerce from './components/Ecommerce/Ecommerce'
import ShopHomePage from './components/Ecommerce/pages/HomePage'
import ShopPage from './components/Ecommerce/pages/ShopPage'
import ProductPage from './components/Ecommerce/pages/ProductPage'
import CartPage from './components/Ecommerce/pages/CartPage'
import CheckoutPage from './components/Ecommerce/pages/CheckoutPage'
import ShippingPage from './components/Ecommerce/pages/ShippingPage'
import LoginPage from './components/Ecommerce/pages/LoginPage'
import RegisterPage from './components/Ecommerce/pages/RegisterPage'
import AccountPage from './components/Ecommerce/pages/AccountPage'
import Gym from './components/Gym/Gym'
import GymHomePage from './components/Gym/pages/HomePage'
import GymClassesPage from './components/Gym/pages/ClassesPage'
import GymTrainersPage from './components/Gym/pages/TrainersPage'
import GymMembershipPage from './components/Gym/pages/MembershipPage'
import GymSchedulePage from './components/Gym/pages/SchedulePage'
import GymJoinPage from './components/Gym/pages/JoinPage'
import Admin from './components/Admin/Admin'
import AdminDashboardPage from './components/Admin/pages/DashboardPage'
import AdminUsersPage from './components/Admin/pages/UsersPage'
import AdminOrdersPage from './components/Admin/pages/OrdersPage'
import AdminAnalyticsPage from './components/Admin/pages/AnalyticsPage'
import AdminSettingsPage from './components/Admin/pages/SettingsPage'
import AdminManagePage from './components/Admin/pages/ManagePage'

// Strip trailing slash so React Router basename matches Vite base (/myWork/)
const routerBasename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/'

function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <ScrollToTop />
      <DocumentTitle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/examples/landing" element={<Landing />} />
        <Route path="/examples/restaurant" element={<Restaurant />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="reserve" element={<ReservePage />} />
        </Route>
        <Route path="/examples/ecommerce" element={<Ecommerce />}>
          <Route index element={<ShopHomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="product/:slug" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
        <Route path="/examples/gym" element={<Gym />}>
          <Route index element={<GymHomePage />} />
          <Route path="classes" element={<GymClassesPage />} />
          <Route path="trainers" element={<GymTrainersPage />} />
          <Route path="membership" element={<GymMembershipPage />} />
          <Route path="schedule" element={<GymSchedulePage />} />
          <Route path="join" element={<GymJoinPage />} />
        </Route>
        <Route path="/examples/admin" element={<Admin />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="manage" element={<AdminManagePage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
