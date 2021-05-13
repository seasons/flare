/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStatus, Plan, CustomerStyle, CouponType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetSignupUser
// ====================================================

export interface GetSignupUser_me_bag {
  __typename: "BagItem";
  id: string;
}

export interface GetSignupUser_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  height: number | null;
  styles: CustomerStyle[];
}

export interface GetSignupUser_me_customer_user {
  __typename: "User";
  id: string;
}

export interface GetSignupUser_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
}

export interface GetSignupUser_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  plan: GetSignupUser_me_customer_membership_plan | null;
}

export interface GetSignupUser_me_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  authorizationsCount: number;
  authorizationWindowClosesAt: any | null;
}

export interface GetSignupUser_me_customer_coupon {
  __typename: "Coupon";
  id: string;
  amount: number | null;
  type: CouponType;
  percentage: number | null;
}

export interface GetSignupUser_me_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  plan: Plan | null;
  detail: GetSignupUser_me_customer_detail | null;
  user: GetSignupUser_me_customer_user;
  membership: GetSignupUser_me_customer_membership | null;
  authorizedAt: any | null;
  admissions: GetSignupUser_me_customer_admissions | null;
  coupon: GetSignupUser_me_customer_coupon | null;
}

export interface GetSignupUser_me {
  __typename: "Me";
  id: string | null;
  bag: GetSignupUser_me_bag[] | null;
  customer: GetSignupUser_me_customer | null;
}

export interface GetSignupUser {
  me: GetSignupUser_me | null;
}
