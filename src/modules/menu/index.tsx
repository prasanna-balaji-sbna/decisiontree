import React from 'react';

export const menuLevelConfig = [
  {
    routes: [
      {
        path: '/menu-level-1',
        component: React.lazy(() => import('./MenuLevel')),
      },
    ],
  },
  {
    routes: [
      {
        path: '/menu-level-2-1',
        component: React.lazy(() => import('./MenuLevel')),
      },
      {
        path: '/menu-level-2-2',
        component: React.lazy(() => import('./MenuLevel')),
      },
    ],
  },
  {
    routes: [
      {
        path: '/menu-level-3-1-1',
        component: React.lazy(() => import('./MenuLevel')),
      },
      {
        path: '/menu-level-3-1-2',
        component: React.lazy(() => import('./MenuLevel')),
      },
      {
        path: '/menu-level-3-2-1',
        component: React.lazy(() => import('./MenuLevel')),
      },
      {
        path: '/menu-level-3-2-2',
        component: React.lazy(() => import('./MenuLevel')),
      },
    ],
  },
];
