/**
 * The global tracking-info keys in Season's schema.
 */
export interface Global {
  /**
   * The name of an event.
   *
   * Options are: Tap, Fail, Success
   *
   * This is unique to a "Track" event, meaning a "screen view" in Segment does not have this
   * This is how we distinguish the two type of events in Harvest
   * Track data inherits the screen view (called "page") properties
   *
   */
  actionType?: ActionTypes

  /**
   * The discription of an event
   *
   * E.g. Conversation product attachment tapped
   */
  actionName?: ActionNames

  sessionLength?: number

  /**
   * OPTIONAL: Additional properties of the action
   */
  additionalProperties?: object
}

export interface Event extends Global {
  /**
   * The ID of the entity in its database. E.g. the Prisma for entities that reside in Monsoon.
   */
  entityID?: string

  /**
   * The public slug for this entity.
   */
  entitySlug?: string

  /**
   * The type of entity, e.g. product, brand, etc.
   */
  entityType?: EntityTypes

  /**
   * Provides a context, usually the component the event is emitted from.
   */
  contextModule?: string
}

export interface PageViewEvent extends Event {
  /**
   * The root container component should specify this as the screen context.
   */
  page?: PageNames
}

export enum PageNames {
  BrandPage = "Brand",
  HomePage = "Home",
  BrowsePage = "Browse",
  ProductPage = "Product",
  SignUpPage = "SignUp",
  AboutPage = "About",
  PrivacyPolicy = "PrivacyPolicy",
  TermsOfService = "TermsOfService",
  App = "App",
}

export enum EntityTypes {
  Product = "Product",
}

export enum ActionTypes {
  /**
   * User actions
   */
  Click = "Click",
  Tap = "Tap",
  Swipe = "Swipe",
  Session = "Session",

  /**
   * Events / results
   */
  Fail = "Fail",
  Success = "Success",
}
/**
 * Action event discriptors / names
 */
export enum ActionNames {
  LearnMoreTapped = "Learn more tapped",
  ReadMoreTapped = "Read more tapped",
  // Nav
  NavigationButtonClicked = "Navigation button clicked",
  BurgerClicked = "Navigation burger clicked",
  // Home page
  DownloadAppButtonClicked = "Download app button clicked",
  SignUpButtonClicked = "Sign up button clicked",
  BrowseTheCollectionTapped = "Browse The Collection Tapped",
  ApplyForMembershipTapped = "Apply For Membership Tapped",
  FinishYourApplicationTapped = "Finish Your Application Tapped",

  // Sign up page
  CreateAccountSubmitButtonClicked = "Create account submit button clicked",
  CustomerMeasurementsSubmitButtonClicked = "Customer measurements submit button clicked",
  // Browse
  ProductPageNumberChanged = "Product Page Number Changed",
  // Forms
  // Create Account
  CreateAccountClicked = "Create Account Button Clicked",
  AccountTriaged = "Account Triaged",
  PlanSelectedButtonClicked = "Plan Selected Button Clicked",

  // Serviceable Modal
  ServiceableModalZipCodeButtonClicked = "Serviceable Modal zipcode Button Clicked",
  ServiceableModalCloseButtonClicked = "Serviceable Modal close Button Clicked",
  ServiceableModalEmailButtonClicked = "Serviceable Modal email Button Clicked",
  ServiceableModalDoneButtonClicked = "Serviceable Modal done Button Clicked",

  ProductAddedToBag = "Product Added to Bag",
  PlaceOrderTapped = "Place Order Tapped",
  ProductSaved = "Product Saved",

  ReservationConfirmationDoneButtonTapped = "Reservation Confirmation Done Button Clicked",
  BrandTapped = "Brand Tapped",
  ProductTapped = "Product Tapped",
  ReserveButtonTapped = "Reserve Button Tapped",
  BagTabTapped = "Bag Tab Tapped",
  SavedTabTapped = "Saved Tab Tapped",
  ReservationHistoryTabTapped = "Reservation History Tab Tapped",
  FAQButtonTapped = "FAQ Button Tapped",
  ProductVariantSelected = "Product Variant Selected",
  SavedItemAddedToBag = "Saved Item Added To Bag",
  BagItemRemoved = "Bag Item Removed",
  BagItemSaved = "Bag Item Saved",
  MembershipInfoTapped = "Membership Info Tapped",
  PersonalPreferencesTapped = "Personal Preferences Tapped",
  PaymentAndShippingTapped = "Payment And Shipping Tapped",
  FAQTapped = "FAQ Tapped",
  SupportTapped = "Support Tapped",
  PrivacyPolicyTapped = "Privacy Policy Tapped",
  TermsOfServiceTapped = "Terms Of Service Tapped",
  InstagramFollowTapped = "Instagram Follow Tapped",
  GetTheIOSAppTapped = "Get The iOS App Tapped",
  LogOutTapped = "Log Out Tapped",
  ChoosePlanTapped = "Choose Plan Tapped",
  RequestAccessTapped = "Request Access Tapped",
  PlanTapped = "Plan Tapped",
  Tier0PlanTabTapped = "Tier 0 Plan Tab Tapped",
  Tier1PlanTabTapped = "Tier 1 Plan Tab Tapped",
  NotificationToggleTapped = "Notification Toggle Tapped",
  AddCreditCardTapped = "AddCreditCardTapped",
  GetMeasurementsFinishTapped = "Get Measurements Finish Tapped",
  SizeButtonTapped = "Size Button Tapped",
  SaveProductModalCancelTapped = "Save Product Modal Cancel Tapped",
  SaveProductModalSaveTapped = "Save Product Modal Save Tapped",
}

/**
 * The component from which the action originates
 */
export enum ContextModules {}
