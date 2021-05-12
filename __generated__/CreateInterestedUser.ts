/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateInterestedUser
// ====================================================

export interface CreateInterestedUser_createInterestedUser {
  __typename: "InterestedUser";
  id: string;
  email: string;
  zipcode: string | null;
}

export interface CreateInterestedUser {
  createInterestedUser: CreateInterestedUser_createInterestedUser;
}

export interface CreateInterestedUserVariables {
  email: string;
  zipCode: string;
}
