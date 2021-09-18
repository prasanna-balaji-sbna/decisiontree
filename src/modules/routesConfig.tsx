// import { authRole } from "shared/constants/AppConst";

export interface NavItemProps {
  id: string;
  messageId: string;
  title: string;
  icon?: string;
  exact?: boolean;
  url?: string;
  type?: string;
  count?: number;
  color?: string;
  auth?: string[];
  children?: NavItemProps[] | NavItemProps;
}

const routesConfig: NavItemProps[] = [
  {
    id: 'Home',
    title: 'Home',
    // auth: authRole.user,
    icon: 'dashboard',

    messageId: 'sidebar.Home',
    type: 'item',
    url: '/Home/Home',
  },
  {
    id: 'trainingmodule',
    title: 'trainingmodule',
    icon: 'dashboard',

    // auth: authRole.user,
    messageId: 'sidebar.trainingmodule',
    type: 'item',
    url: '/trainingmodule/trainingmodule',
  },
  
  {
    id: 'Resources',
    icon: 'dashboard',
    title: 'Resources',
    // auth: authRole.user,
    messageId: 'sidebar.Resources',
    type: 'item',
    url: '/Resources/Resources',
  },
  {
    id: 'Blog',
    icon: 'dashboard',
    title: 'Blog',
    // auth: authRole.user,
    messageId: 'sidebar.Blog',
    type: 'item',
    url: '/Features/blogs',
  },
  {
    id: 'Report',
    icon: 'dashboard',
    title: 'Report',
    // auth: authRole.user,
    messageId: 'sidebar.Report',
    type: 'item',
    url: '/Report/Report',
  },


  {
    id: 'problemsandsolutions',
    title: 'Problems and Solutions',
    messageId: 'sidebar.problemsandsolutions',
    type: 'collapse',
    icon: 'dashboard',
    // auth: authRole.user,
    children: [
      {
        id: 'postedproblems',
        title: 'Posted Problems',
        messageId: 'sidebar.postedProblems',
        type: 'item',
        url: '/ProblemsSolutions/problemsPosted'
      },
      {
        id: 'Upload',
        title: 'Upload',
        messageId: 'sidebar.Upload',
        type: 'item',
        url: '/ProblemsSolutions/Upload',
      }, 
      {
        id: 'Draw Solutions',
        title: 'Draw Solutions',
        messageId: 'sidebar.Draw',
        type: 'item',
        url: '/ProblemsSolutions/drawNet',
      },
     
     
    ],
  },

  {
    id: 'features',
    title: 'Tools and FAQs',
    messageId: 'sidebar.toolsandfaqs',
    type: 'collapse',
    icon: 'dashboard',
    // auth: authRole.user,
    children: [
      {
        id: 'faqs',
        title: 'FAQs',
        messageId: 'sidebar.faqs',
        type: 'item',
        url: '/Features/faq'
      },
      {
        id: 'dashboard',
        title: 'Calculator',
        messageId: 'sidebar.tools',
        type: 'item',
        url: '/Features/calculator'
      }
    ],
  },
  

  
  
  {
    id: 'general',
    title: 'General',
    messageId: 'sidebar.general',
    type: 'collapse',
    // auth: authRole.user,
    icon: 'list',
    children: [
      {
        id: 'uploadimage',
        title: 'Upload Image',
        messageId: 'sidebar.images',
        type: 'item',
        // auth: authRole.user,
        url: '/general/UploadImage',
      },
      {
        id: 'list',
        title: 'List',
        messageId: 'sidebar.list',
        type: 'item',
        // auth: authRole.user,
        url: '/general/List',
      },
      {
        id: 'Lov',
        title: 'Lov',
        // auth: authRole.user,
        messageId: 'sidebar.lov',
        type: 'item',
        url: '/general/Lov',
      },
      {
        id: 'user',
        title: 'user',
        // auth: authRole.user,
        messageId: 'sidebar.user',
        type: 'item',
        url: '/general/User',
      },
      {
        id: 'catagory',
        title: 'catagory',
        // auth: authRole.user,
        messageId: 'sidebar.catagory',
        type: 'item',
        url: '/general/Catagory',
      },
      {
        id: 'module',
        title: 'module',
        // auth: authRole.user,
        messageId: 'sidebar.module',
        type: 'item',
        url: '/general/Module',
      },
      {
        id: 'manageBlog',
        title: 'manageBlog',
        // auth: authRole.user,
        messageId: 'sidebar.manageBlog',
        type: 'item',
        url: '/general/ManageBlogs',
      },
     
    ],
  },

]




export default routesConfig;
