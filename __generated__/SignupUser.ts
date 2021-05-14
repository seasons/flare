/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerDetailCreateInput, UTMInput, CustomerStatus, CouponType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SignupUser
// ====================================================

export interface SignupUser_signup_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  state: string | null;
}

export interface SignupUser_signup_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: SignupUser_signup_customer_detail_shippingAddress | null;
}

export interface SignupUser_signup_customer_bagItems {
  __typename: "BagItem";
  id: string;
}

export interface SignupUser_signup_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  authorizationsCount: number;
  authorizationWindowClosesAt: any | null;
  allAccessEnabled: boolean;
}

export interface SignupUser_signup_customer_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: any;
}

export interface SignupUser_signup_customer_coupon {
  __typename: "Coupon";
  id: string;
  amount: number | null;
  percentage: number | null;
  type: CouponType;
}

export interface SignupUser_signup_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  detail: SignupUser_signup_customer_detail | null;
  bagItems: SignupUser_signup_customer_bagItems[] | null;
  admissions: SignupUser_signup_customer_admissions | null;
  user: SignupUser_signup_customer_user;
  coupon: SignupUser_signup_customer_coupon | null;
}

export interface SignupUser_signup {
  __typename: "SignupPayload";
  expiresIn: number;
  refreshToken: string;
  token: string;
  customer: SignupUser_signup_customer;
}

export interface SignupUser {
  signup: SignupUser_signup;
}

export interface SignupUserVariables {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  details: CustomerDetailCreateInput;
  referrerId?: string | null;
  utm?: UTMInput | null;
  giftId?: string | null;
}
