import React from 'react';
// import { authRole } from 'shared/constants/AppConst';
import {retry} from '../../@crema/utility/AppHooks';

export const problemPostedConfig = [
  { 
    // auth: authRole.company,

    routes: [
      {
        path: '/ProblemsSolutions/problemsPosted',

        component: React.lazy(() => retry(() => import('./ProblemsPosted/problemsposted'))),
      },   
      // {
      //   path: '/ProblemsSolutions/Upload',

      //   component: React.lazy(() => retry(() => import('./ProblemsPosted/Upload'))),
      // },    
      
        {
        path: '/ProblemsSolutions/getSolution',       
        component: React.lazy(() => retry(() => import('./ProblemsPosted/getsolution'))),
      }, 
      {
        path: '/ProblemsSolutions/drawNet',       
        component: React.lazy(() => retry(() => import('./ProblemsPosted/drawio'))),
      },     

        ],
      }
    ]
