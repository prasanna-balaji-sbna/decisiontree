import {AuthUser} from '../../types/models/AuthUser';
import {AuthType} from './AppEnums';

export const authRole = {
  product: ['Product Admin'],
  company: ['Company Admin'],
  user:['user']
};

// export const APIUrl = 'https://roadsyncapi./assets/images/logo.pngsoftware.com/';
export const APIUrl = 'https://api./assets/images/logo.pngsoftware.com/';
export const SocketUrl = 'wss://i0f4s9m5o4.execute-api.us-east-1.amazonaws.com/dev';
// export const SocketUrl = 'wss://ps4nctzeya.execute-api.us-east-1.amazonaws.com/dev';
export const NotifiOpenUrl = 'https://d241y4efmx2l8l.cloudfront.net/#/csr/CSRDashboard';

export const defaultUser: AuthUser = {
  uid: 'RFedvhji876rfhjuecvh7',
  displayName: 'User',
  email: 'demo@example.com',
  token: 'access-token',
  role: authRole.user,
  authType: AuthType.AUTH0,
  photoURL: 'https://via.placeholder.com/150',
};

export const initialUrl = '/broker/paymentsList'; // this url will open after login
