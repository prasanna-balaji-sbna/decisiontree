import React from 'react';

export const generalPagesConfig = [

  {
    auth: ['user'],
    routes: [

      {
        path: '/general/List',
        component: React.lazy(() => import('./List')),
      },
       {
         path: '/general/User',
         component: React.lazy(() => import('./User')),
       },
       {
        path: '/general/lov',
        component: React.lazy(() => import('./lov')),
      },
      {
        path: '/general/module',
        component: React.lazy(() => import('./Module')),
      },
      {
        path: '/general/catagory',
        component: React.lazy(() => import('./catagory')),
      },
      
      {
        path: '/Home',
        component: React.lazy(() => import('./Home')),
      },

      {
        path: '/trainingmodule',
        component: React.lazy(() => import('./trainingmodule')),
      },
      {
        path: '/FAQ',
        component: React.lazy(() => import('./FAQ')),
      },
      {
        path: '/Resources',
        component: React.lazy(() => import('./Resources')),
      },
      {
        path: '/Blog',
        component: React.lazy(() => import('./Blog')),
      },
      {
        path: '/Report',
        component: React.lazy(() => import('./Report')),
      },
     
      {
        path: '/general/UploadImage',
        component: React.lazy(() => import('./uploadimage')),
      },
      {
        path: '/general/ManageBlogs',
        component: React.lazy(() => import('./ManageBlogs')),
      },

    ],
  },




];
