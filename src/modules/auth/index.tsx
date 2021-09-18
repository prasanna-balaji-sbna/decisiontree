import React from 'react';

export const authRouteConfig = [
  {
    routes: [
      {
        path: '/signin',
        component: React.lazy(() => import('./Signin')),
      },
    ],
  },
  {
    routes: [
      {
        path: '/reset-password',
        component: React.lazy(() => import('./ResetPassword')),
      },
    ],
  },
  {
    routes: [
      {
        path: '/forget-password',
        component: React.lazy(() => import('./ForgetPassword')),
      },
    ],
  },
 
];
