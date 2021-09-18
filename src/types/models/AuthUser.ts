import {AuthType} from '../../shared/constants/AppEnums';

export interface AuthUser {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  token?: string;
  authType: AuthType;
  role: string[];
}

export interface GetResultBO 
{
  orderColumn: string;
  orderType: string;
  PageSize: string;
  PageNo: string;
  userId: string;
  field: string;
  value: string;
  type: string;
  matchCase: boolean;
  operator: string;
}
