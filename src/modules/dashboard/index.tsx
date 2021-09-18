import React from 'react';

export const dashboardPagesConfig = [

  {
    auth: ['user'],
    routes: [

     
      {
        path: '/dashboard/dashboard',
        component: React.lazy(() => import('./dashboard')),
      },

    ],
  },




];
