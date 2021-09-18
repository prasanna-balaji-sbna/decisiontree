import { retry } from '@crema/utility/AppHooks';
import React from 'react';

export const featurePagesConfig = [

    {
        // auth: ['user'],
        routes: [


            {
                path: '/Features/calculator',
                component: React.lazy(() => retry(() => import('./Calculator/calculator'))),
            },
            {
                path: '/Features/faq',
                component: React.lazy(() => retry(() => import('./FAQs/faq'))),
            },
            {
                path: '/Features/trainingModule',
        
                component: React.lazy(() => retry(() => import('./trainingModules/trainingModule'))),
              },   
                {
                path: '/Features/managetrainingModule',       
                component: React.lazy(() => retry(() => import('./trainingModules/manageTrainingModule'))),
              },    
              {
                path: '/Features/blogs',
        
                component: React.lazy(() => retry(() => import('./blogs/blogs'))),
              },   
                {
                path: '/Features/manageBlogs',       
                component: React.lazy(() => retry(() => import('./blogs/manageBlogs'))),
              },  
        ],
    },




];
