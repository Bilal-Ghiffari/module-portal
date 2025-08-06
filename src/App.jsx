import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Import Routes all
import {
  authProtectedRoutes,
  publicRoutes,
  authProtectedWHorizonRoutes,
  publicHorizontalRoutes,
  publicVerticalRoutes,
} from './routes';

// Import all middleware
import Authmiddleware from './routes/route';

// layouts Format
import VerticalLayout from './components/VerticalLayout/';
import HorizontalLayout from './components/HorizontalLayout/';
// import NonAuthLayout from "./components/NonAuthLayout/";

// Import scss
import './assets/scss/theme.scss';

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

// import fakeBackend from '/src/helpers/AuthType/fakeBackend';
import { ToastComponent } from './components/Common/ToastComponent';

import { useDispatch } from 'react-redux';
import { getRootMenu } from './store/actions';
import { getUserDetail } from './helpers/services/getStorage';
// import { Server } from "socket.io-client";

// Activating fake backend
// fakeBackend();

const App = (props) => {
  const selectLayoutState = (state) => state.Layout;
  const LayoutProperties = createSelector(selectLayoutState, (layout) => ({
    layoutType: layout.layoutType,
  }));
  const [activeUsers, setActiveUsers] = useState(0);
  const dispatch = useDispatch()

  const { layoutType } = useSelector(LayoutProperties);

  function getLayout(layoutType) {
    let layoutCls = VerticalLayout;
    switch (layoutType) {
      case 'horizontal':
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }  
  const Layout = getLayout(layoutType);

  useEffect(() => { 
    const userLogin = getUserDetail()
    if(userLogin)dispatch(getRootMenu())
  }, []);

  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<React.Fragment>{route.component}</React.Fragment>}
            key={idx}
            exact={true}
          />
        ))}

        {publicHorizontalRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<HorizontalLayout>{route.component}</HorizontalLayout>}
            key={idx}
            exact={true}
          />
        ))}
        {publicVerticalRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<VerticalLayout>{route.component}</VerticalLayout>}
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
        {authProtectedWHorizonRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <HorizontalLayout>{route.component}</HorizontalLayout>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
      <ToastComponent />
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
