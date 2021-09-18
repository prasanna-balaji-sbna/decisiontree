import Settings from './Setting';
import CommonReducer from './CommonReducer';
import Auth from './Auth';
import User from './User';
import ModuleDetails from './Module';
import CategoryDetails from './catagories';
import Login from './Login';
import ListDetails from './list';
import Lov from './Lov';
import Upload from './upload';
import faq from './Faq';
import PostedProblems from './PostedProblems';
import ManageBlog from './ManageBlogs';

const reducers = {
  settings: Settings,
  auth: Auth,
  common: CommonReducer,
  user:User,
  module:ModuleDetails,
  category:CategoryDetails,
  login:Login,
  lov:Lov,
  Upload:Upload,
  list:ListDetails,
  postedProblems:PostedProblems,
  faq:faq,
  manageBlog:ManageBlog
};

export default reducers;
