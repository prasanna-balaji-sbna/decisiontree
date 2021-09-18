import React from 'react';
import {Redirect} from 'react-router-dom';

import {createRoutes} from '../@crema/utility/Utils';
// import {dashBoardConfigs} from './dashboard';
import {authRouteConfig} from './auth';
// import {ecommerceConfig} from './ecommerce';
import {initialUrl} from '../shared/constants/AppConst';
// import {extraPagesConfigs} from './extraPages';
// import {userListConfig} from './userList';
import {dashboardPagesConfig} from './dashboard';
import {generalPagesConfig} from './general';
import {menuLevelConfig} from './menu';
import { problemPostedConfig } from './ProblemsSolutions';
import { errorPagesConfigs } from './errorPages';
import { featurePagesConfig } from './Features';
// import {csrPagesConfig} from './csr';
// import {userPagesConfig} from './userPages';

const routeConfigs = [
  ...authRouteConfig,
  ...problemPostedConfig,
  // ...brokerPagesConfig,
  ...generalPagesConfig,
  // ...ecommerceConfig,
  // ...extraPagesConfigs,
  // ...userListConfig,
  ...menuLevelConfig,

  ...featurePagesConfig,
  ...dashboardPagesConfig,
  ...errorPagesConfigs,
  // ...blog
];

const routes = [
  ...createRoutes(routeConfigs),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to={initialUrl} />,
  },
  {
    component: () => <Redirect to='/error-pages/error-404' />,
  },
];

export default routes;
