/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: LogIn
// ====================================================

export interface LogIn_login_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  state: string | null;
}

export interface LogIn_login_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: LogIn_login_customer_detail_shippingAddress | null;
}

export interface LogIn_login_customer_bagItems {
  __typename: "BagItem";
  id: string;
}

export interface LogIn_login_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  authorizationsCount: number;
  authorizationWindowClosesAt: any | null;
}

export interface LogIn_login_customer_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: any;
}

export interface LogIn_login_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  detail: LogIn_login_customer_detail | null;
  bagItems: LogIn_login_customer_bagItems[] | null;
  admissions: LogIn_login_customer_admissions | null;
  user: LogIn_login_customer_user;
}

export interface LogIn_login {
  __typename: "AuthPayload";
  customer: LogIn_login_customer;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LogIn {
  login: LogIn_login;
}

export interface LogInVariables {
  email: string;
  password: string;
}
