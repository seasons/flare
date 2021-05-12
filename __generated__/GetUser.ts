/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStatus, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_view {
  __typename: "View";
  id: string;
  title: string;
  caption: string | null;
}

export interface GetUser_me_customer_user_pushNotification {
  __typename: "UserPushNotification";
  id: string;
  status: boolean;
}

export interface GetUser_me_customer_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRole[];
  pushNotification: GetUser_me_customer_user_pushNotification | null;
}

export interface GetUser_me_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  authorizationsCount: number;
  authorizationWindowClosesAt: any | null;
}

export interface GetUser_me_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  referralLink: string | null;
  user: GetUser_me_customer_user;
  authorizedAt: any | null;
  admissions: GetUser_me_customer_admissions | null;
}

export interface GetUser_me {
  __typename: "Me";
  customer: GetUser_me_customer | null;
}

export interface GetUser {
  view: GetUser_view | null;
  me: GetUser_me | null;
}
