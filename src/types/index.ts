import { CommonActionTypes } from './actions/Common.action';
import { SettingsActionTypes } from './actions/Settings.action';
import { AuthActions } from './actions/Auth.actions';
// import { CompanyActions } from './actions/Company.action';
// import { DriverActions } from './actions/driver.action';
// import { CsrActions } from './actions/CsrDashboard.action';
import { UserActions } from './actions/User.action';
// import { BrokerActions } from './actions/BrokerDashboard.action';
import { LoginActions } from './actions/Login.action';
import { ListActions } from './actions/list.action';
import { LovActions } from './actions/Lov.action';
import { UploadActions } from './actions/upload.action';

import { PostedProbsActions } from './actions/ProblemsPosted.action';
import { moduleActions } from './actions/Module.action';
import { CategoryActions } from './actions/Category.action';
import { FAQActions } from './actions/Faq.action';
import { ManageBlogActions } from './actions/ManageBlogs.action';

export type AppActions =
  | CommonActionTypes
  | SettingsActionTypes
  | AuthActions
  // | CompanyActions
  // | DriverActions
  // | CsrActions
  // | BrokerActions
  | LovActions
  | moduleActions
  | UserActions
  | UploadActions
  | CategoryActions
  // | BrokerActions
  | LoginActions
  | ListActions
  | PostedProbsActions
  | FAQActions
  | ManageBlogActions;
