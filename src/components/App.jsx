import {
  useEffect,
  // lazy,
  Suspense,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from 'pages/LoginPage/LoginPage';
import NoticesPage from 'pages/NoticesPage/NoticesPage';
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import UserPage from 'pages/UserPage/UserPage';
import { HomePage } from 'pages/HomePage';
import { refreshUser } from 'redux/auth/authOperation';
import { selectToken } from 'redux/auth/authSelectors';
import { LoaderSpinner } from './LoaderSpinner/LoaderSpinner';
import { ToastContainer } from 'react-toastify';
import FriendsPage from 'pages/FriendsPage/FriendsPage';
import NewsPage from 'pages/NewsPage/NewsPage';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { PublicRoute } from './PublicRoute/PublicRoute';
import { SharedLayout } from './SharedLayout/SharedLayout';
import GoogleAuth from './GoogleAuth/GoogleAuth';

const Test = () => {
  return <h1>123</h1>;
};

export const App = () => {
  const isLoggedIn = useSelector(selectToken);
  const dispatch = useDispatch();
  useEffect(() => {
    isLoggedIn && dispatch(refreshUser());
  }, [dispatch, isLoggedIn]);
  return (
    <Suspense fallback={<LoaderSpinner />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="user"
            element={
              <PrivateRoute redirectTo="/login" component={<UserPage />} />
            }
          />
          <Route path="google-redirect" element={<GoogleAuth />} />
          <Route path="test" element={<Test />} />
          <Route
            path="register"
            element={
              <PublicRoute
                redirectTo="/user"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute redirectTo="/user" component={<LoginPage />} />
            }
          />
          <Route path="friends" element={<FriendsPage />} />

          <Route path="news" element={<NewsPage />}>
            <Route path="search" element={<></>} />
          </Route>

          <Route path="notices" element={<NoticesPage />}>
            <Route path="lost-found" element={<></>} />
            <Route path="for-free" element={<></>} />
            <Route path="sell" element={<></>} />
            <Route path="favorites" element={<></>} />
            <Route path="personal" element={<></>} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
      <ToastContainer />
    </Suspense>
  );
};
