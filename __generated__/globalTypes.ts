/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AppRoute {
  AccountStack = "AccountStack",
  BagStack = "BagStack",
  Brand = "Brand",
  Browse = "Browse",
  CurrentRotation = "CurrentRotation",
  Faq = "Faq",
  Home = "Home",
  Modal = "Modal",
  PaymentAndShipping = "PaymentAndShipping",
  PersonalPreferences = "PersonalPreferences",
  Product = "Product",
  ProductRequest = "ProductRequest",
  Reservation = "Reservation",
  Webview = "Webview",
}

export enum BagItemStatus {
  Added = "Added",
  Received = "Received",
  Reserved = "Reserved",
}

export enum BottomSizeType {
  EU = "EU",
  JP = "JP",
  Letter = "Letter",
  US = "US",
  WxL = "WxL",
}

export enum BrandTier {
  Boutique = "Boutique",
  Discovery = "Discovery",
  Local = "Local",
  Niche = "Niche",
  Retro = "Retro",
  Tier0 = "Tier0",
  Tier1 = "Tier1",
  Tier2 = "Tier2",
  Upcoming = "Upcoming",
}

export enum CouponType {
  FixedAmount = "FixedAmount",
  Percentage = "Percentage",
}

export enum CustomerStatus {
  Active = "Active",
  Authorized = "Authorized",
  Created = "Created",
  Deactivated = "Deactivated",
  Invited = "Invited",
  Paused = "Paused",
  PaymentFailed = "PaymentFailed",
  Suspended = "Suspended",
  Waitlisted = "Waitlisted",
}

export enum CustomerStyle {
  AvantGarde = "AvantGarde",
  Bold = "Bold",
  Classic = "Classic",
  Minimalist = "Minimalist",
  Streetwear = "Streetwear",
  Techwear = "Techwear",
}

export enum EmailId {
  BuyUsedOrderConfirmation = "BuyUsedOrderConfirmation",
  CompleteAccount = "CompleteAccount",
  DayFiveAuthorizationFollowup = "DayFiveAuthorizationFollowup",
  DayFourAuthorizationFollowup = "DayFourAuthorizationFollowup",
  DaySevenAuthorizationFollowup = "DaySevenAuthorizationFollowup",
  DaySixAuthorizationFollowup = "DaySixAuthorizationFollowup",
  DayThreeAuthorizationFollowup = "DayThreeAuthorizationFollowup",
  DayTwoAuthorizationFollowup = "DayTwoAuthorizationFollowup",
  FreeToReserve = "FreeToReserve",
  Paused = "Paused",
  PriorityAccess = "PriorityAccess",
  RecommendedItemsNurture = "RecommendedItemsNurture",
  ReferralConfirmation = "ReferralConfirmation",
  ReservationConfirmation = "ReservationConfirmation",
  ReservationReturnConfirmation = "ReservationReturnConfirmation",
  ResumeConfirmation = "ResumeConfirmation",
  ResumeReminder = "ResumeReminder",
  ReturnReminder = "ReturnReminder",
  ReturnToGoodStanding = "ReturnToGoodStanding",
  Rewaitlisted = "Rewaitlisted",
  SubmittedEmail = "SubmittedEmail",
  TwentyFourHourAuthorizationFollowup = "TwentyFourHourAuthorizationFollowup",
  UnpaidMembership = "UnpaidMembership",
  Waitlisted = "Waitlisted",
  WelcomeToSeasons = "WelcomeToSeasons",
}

export enum FitPicReportStatus {
  Pending = "Pending",
  Reviewed = "Reviewed",
}

export enum FitPicStatus {
  Published = "Published",
  Submitted = "Submitted",
  Unpublished = "Unpublished",
}

export enum InventoryStatus {
  NonReservable = "NonReservable",
  Offloaded = "Offloaded",
  Reservable = "Reservable",
  Reserved = "Reserved",
  Stored = "Stored",
}

export enum LetterSize {
  L = "L",
  M = "M",
  S = "S",
  XL = "XL",
  XS = "XS",
  XXL = "XXL",
  XXS = "XXS",
  XXXL = "XXXL",
}

export enum LocationType {
  Cleaner = "Cleaner",
  Customer = "Customer",
  Office = "Office",
  Warehouse = "Warehouse",
}

export enum NotificationBarID {
  AuthorizedReminder = "AuthorizedReminder",
  PastDueInvoice = "PastDueInvoice",
  TestDismissable = "TestDismissable",
}

export enum NotificationBarIcon {
  Chevron = "Chevron",
  CloseX = "CloseX",
}

export enum OrderLineItemRecordType {
  ExternalProduct = "ExternalProduct",
  Package = "Package",
  PhysicalProduct = "PhysicalProduct",
  ProductVariant = "ProductVariant",
}

export enum OrderStatus {
  Cancelled = "Cancelled",
  Drafted = "Drafted",
  Fulfilled = "Fulfilled",
  Returned = "Returned",
  Submitted = "Submitted",
}

export enum OrderType {
  New = "New",
  Used = "Used",
}

export enum PaymentPlanTier {
  AllAccess = "AllAccess",
  Essential = "Essential",
  Pause = "Pause",
}

export enum PhotographyStatus {
  Done = "Done",
  InProgress = "InProgress",
  ReadyForEditing = "ReadyForEditing",
  ReadyToShoot = "ReadyToShoot",
  Steam = "Steam",
}

export enum PhysicalProductDamageType {
  BarcodeMissing = "BarcodeMissing",
  ButtonMissing = "ButtonMissing",
  Other = "Other",
  Smell = "Smell",
  Stain = "Stain",
  Tear = "Tear",
}

export enum PhysicalProductOffloadMethod {
  Recycled = "Recycled",
  ReturnedToVendor = "ReturnedToVendor",
  SoldToThirdParty = "SoldToThirdParty",
  SoldToUser = "SoldToUser",
  Unknown = "Unknown",
}

export enum PhysicalProductStatus {
  Clean = "Clean",
  Damaged = "Damaged",
  Dirty = "Dirty",
  Lost = "Lost",
  New = "New",
  PermanentlyDamaged = "PermanentlyDamaged",
  Sold = "Sold",
  Used = "Used",
}

export enum Plan {
  AllAccess = "AllAccess",
  Essential = "Essential",
}

export enum ProductArchitecture {
  Fashion = "Fashion",
  Showstopper = "Showstopper",
  Staple = "Staple",
}

export enum ProductFit {
  RunsBig = "RunsBig",
  RunsSmall = "RunsSmall",
  TrueToSize = "TrueToSize",
}

export enum ProductOrderByInput {
  architecture_ASC = "architecture_ASC",
  architecture_DESC = "architecture_DESC",
  buyNewEnabled_ASC = "buyNewEnabled_ASC",
  buyNewEnabled_DESC = "buyNewEnabled_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  description_ASC = "description_ASC",
  description_DESC = "description_DESC",
  externalURL_ASC = "externalURL_ASC",
  externalURL_DESC = "externalURL_DESC",
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  name_ASC = "name_ASC",
  name_DESC = "name_DESC",
  photographyStatus_ASC = "photographyStatus_ASC",
  photographyStatus_DESC = "photographyStatus_DESC",
  productFit_ASC = "productFit_ASC",
  productFit_DESC = "productFit_DESC",
  publishedAt_ASC = "publishedAt_ASC",
  publishedAt_DESC = "publishedAt_DESC",
  retailPrice_ASC = "retailPrice_ASC",
  retailPrice_DESC = "retailPrice_DESC",
  slug_ASC = "slug_ASC",
  slug_DESC = "slug_DESC",
  status_ASC = "status_ASC",
  status_DESC = "status_DESC",
  type_ASC = "type_ASC",
  type_DESC = "type_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC",
}

export enum ProductStatus {
  Available = "Available",
  NotAvailable = "NotAvailable",
  Offloaded = "Offloaded",
  Stored = "Stored",
}

export enum ProductTierName {
  Luxury = "Luxury",
  Standard = "Standard",
}

export enum ProductType {
  Accessory = "Accessory",
  Bottom = "Bottom",
  Shoe = "Shoe",
  Top = "Top",
}

export enum ProductVariantOrderByInput {
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  displayShort_ASC = "displayShort_ASC",
  displayShort_DESC = "displayShort_DESC",
  height_ASC = "height_ASC",
  height_DESC = "height_DESC",
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  nonReservable_ASC = "nonReservable_ASC",
  nonReservable_DESC = "nonReservable_DESC",
  offloaded_ASC = "offloaded_ASC",
  offloaded_DESC = "offloaded_DESC",
  productID_ASC = "productID_ASC",
  productID_DESC = "productID_DESC",
  reservable_ASC = "reservable_ASC",
  reservable_DESC = "reservable_DESC",
  reserved_ASC = "reserved_ASC",
  reserved_DESC = "reserved_DESC",
  retailPrice_ASC = "retailPrice_ASC",
  retailPrice_DESC = "retailPrice_DESC",
  sku_ASC = "sku_ASC",
  sku_DESC = "sku_DESC",
  stored_ASC = "stored_ASC",
  stored_DESC = "stored_DESC",
  total_ASC = "total_ASC",
  total_DESC = "total_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC",
  weight_ASC = "weight_ASC",
  weight_DESC = "weight_DESC",
}

export enum PushNotificationStatus {
  Blocked = "Blocked",
  Denied = "Denied",
  Granted = "Granted",
}

export enum ReservationPhase {
  BusinessToCustomer = "BusinessToCustomer",
  CustomerToBusiness = "CustomerToBusiness",
}

export enum ReservationStatus {
  Blocked = "Blocked",
  Cancelled = "Cancelled",
  Completed = "Completed",
  Delivered = "Delivered",
  Hold = "Hold",
  Packed = "Packed",
  Picked = "Picked",
  Queued = "Queued",
  Received = "Received",
  Shipped = "Shipped",
  Unknown = "Unknown",
}

export enum SeasonCode {
  AW = "AW",
  FW = "FW",
  HO = "HO",
  PF = "PF",
  PS = "PS",
  SS = "SS",
}

export enum SeasonString {
  Fall = "Fall",
  Spring = "Spring",
  Summer = "Summer",
  Winter = "Winter",
}

export enum ShippingCode {
  UPSGround = "UPSGround",
  UPSSelect = "UPSSelect",
}

export enum SizeType {
  EU = "EU",
  JP = "JP",
  Letter = "Letter",
  US = "US",
  WxL = "WxL",
}

export enum SmsStatus {
  Accepted = "Accepted",
  Delivered = "Delivered",
  Failed = "Failed",
  PartiallyDelivered = "PartiallyDelivered",
  Queued = "Queued",
  Read = "Read",
  Received = "Received",
  Receiving = "Receiving",
  Scheduled = "Scheduled",
  Sending = "Sending",
  Sent = "Sent",
  Undelivered = "Undelivered",
}

export enum TriageCustomerStatus {
  Authorized = "Authorized",
  Waitlisted = "Waitlisted",
}

export enum UserPushNotificationInterestType {
  Bag = "Bag",
  Blog = "Blog",
  Brand = "Brand",
  General = "General",
  NewProduct = "NewProduct",
}

export enum UserRole {
  Admin = "Admin",
  Customer = "Customer",
  Marketer = "Marketer",
  Partner = "Partner",
}

export enum UserVerificationMethod {
  Email = "Email",
  None = "None",
  SMS = "SMS",
}

export enum UserVerificationStatus {
  Approved = "Approved",
  Denied = "Denied",
  Pending = "Pending",
}

export enum ViewType {
  Banner = "Banner",
  Referral = "Referral",
  Select = "Select",
}

export enum WarehouseLocationType {
  Bin = "Bin",
  Conveyor = "Conveyor",
  Rail = "Rail",
}

export interface BottomSizeCreateInput {
  id?: string | null;
  type?: BottomSizeType | null;
  value?: string | null;
  waist?: number | null;
  rise?: number | null;
  hem?: number | null;
  inseam?: number | null;
}

export interface BottomSizeCreateOneInput {
  create?: BottomSizeCreateInput | null;
  connect?: BottomSizeWhereUniqueInput | null;
}

export interface BottomSizeWhereUniqueInput {
  id?: string | null;
}

export interface BrandCreateInput {
  id?: string | null;
  slug: string;
  brandCode: string;
  description?: string | null;
  isPrimaryBrand?: boolean | null;
  logo?: any | null;
  name: string;
  designer?: string | null;
  basedIn?: string | null;
  since?: any | null;
  tier: BrandTier;
  published?: boolean | null;
  featured?: boolean | null;
  websiteUrl?: string | null;
  styles?: BrandCreatestylesInput | null;
  logoImage?: ImageCreateOneInput | null;
  products?: ProductCreateManyWithoutBrandInput | null;
  images?: ImageCreateManyInput | null;
  shopifyShop?: ShopifyShopCreateOneInput | null;
}

export interface BrandCreateOneInput {
  create?: BrandCreateInput | null;
  connect?: BrandWhereUniqueInput | null;
}

export interface BrandCreateOneWithoutProductsInput {
  create?: BrandCreateWithoutProductsInput | null;
  connect?: BrandWhereUniqueInput | null;
}

export interface BrandCreateWithoutProductsInput {
  id?: string | null;
  slug: string;
  brandCode: string;
  description?: string | null;
  isPrimaryBrand?: boolean | null;
  logo?: any | null;
  name: string;
  designer?: string | null;
  basedIn?: string | null;
  since?: any | null;
  tier: BrandTier;
  published?: boolean | null;
  featured?: boolean | null;
  websiteUrl?: string | null;
  styles?: BrandCreatestylesInput | null;
  logoImage?: ImageCreateOneInput | null;
  images?: ImageCreateManyInput | null;
  shopifyShop?: ShopifyShopCreateOneInput | null;
}

export interface BrandCreatestylesInput {
  set?: CustomerStyle[] | null;
}

export interface BrandWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
  brandCode?: string | null;
}

export interface CategoryCreateInput {
  id?: string | null;
  slug: string;
  name: string;
  image?: any | null;
  description?: string | null;
  visible?: boolean | null;
  products?: ProductCreateManyWithoutCategoryInput | null;
  children?: CategoryCreateManyInput | null;
}

export interface CategoryCreateManyInput {
  create?: CategoryCreateInput[] | null;
  connect?: CategoryWhereUniqueInput[] | null;
}

export interface CategoryCreateOneInput {
  create?: CategoryCreateInput | null;
  connect?: CategoryWhereUniqueInput | null;
}

export interface CategoryCreateOneWithoutProductsInput {
  create?: CategoryCreateWithoutProductsInput | null;
  connect?: CategoryWhereUniqueInput | null;
}

export interface CategoryCreateWithoutProductsInput {
  id?: string | null;
  slug: string;
  name: string;
  image?: any | null;
  description?: string | null;
  visible?: boolean | null;
  children?: CategoryCreateManyInput | null;
}

export interface CategoryWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
  name?: string | null;
}

export interface ColorCreateInput {
  id?: string | null;
  slug: string;
  name: string;
  colorCode: string;
  hexCode: string;
  productVariants?: ProductVariantCreateManyWithoutColorInput | null;
}

export interface ColorCreateOneInput {
  create?: ColorCreateInput | null;
  connect?: ColorWhereUniqueInput | null;
}

export interface ColorCreateOneWithoutProductVariantsInput {
  create?: ColorCreateWithoutProductVariantsInput | null;
  connect?: ColorWhereUniqueInput | null;
}

export interface ColorCreateWithoutProductVariantsInput {
  id?: string | null;
  slug: string;
  name: string;
  colorCode: string;
  hexCode: string;
}

export interface ColorWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
  colorCode?: string | null;
}

export interface CreateDraftedOrderInput {
  orderType: OrderType;
  productVariantID: string;
}

export interface CustomerDetailCreateInput {
  id?: string | null;
  phoneNumber?: string | null;
  birthday?: any | null;
  height?: number | null;
  bodyType?: string | null;
  averageTopSize?: string | null;
  averageWaistSize?: string | null;
  averagePantLength?: string | null;
  preferredPronouns?: string | null;
  profession?: string | null;
  partyFrequency?: string | null;
  travelFrequency?: string | null;
  shoppingFrequency?: string | null;
  averageSpend?: string | null;
  style?: string | null;
  commuteStyle?: string | null;
  phoneOS?: string | null;
  insureShipment?: boolean | null;
  instagramHandle?: string | null;
  discoveryReference?: string | null;
  impactId?: string | null;
  weight?: CustomerDetailCreateweightInput | null;
  topSizes?: CustomerDetailCreatetopSizesInput | null;
  waistSizes?: CustomerDetailCreatewaistSizesInput | null;
  styles?: CustomerDetailCreatestylesInput | null;
  stylePreferences?: StylePreferencesCreateOneInput | null;
  shippingAddress?: LocationCreateOneInput | null;
}

export interface CustomerDetailCreatestylesInput {
  set?: CustomerStyle[] | null;
}

export interface CustomerDetailCreatetopSizesInput {
  set?: string[] | null;
}

export interface CustomerDetailCreatewaistSizesInput {
  set?: number[] | null;
}

export interface CustomerDetailCreateweightInput {
  set?: number[] | null;
}

export interface EmailReceiptCreateManyWithoutUserInput {
  create?: EmailReceiptCreateWithoutUserInput[] | null;
  connect?: EmailReceiptWhereUniqueInput[] | null;
}

export interface EmailReceiptCreateWithoutUserInput {
  id?: string | null;
  emailId: EmailId;
}

export interface EmailReceiptWhereUniqueInput {
  id?: string | null;
}

export interface FitPicCreateManyWithoutUserInput {
  create?: FitPicCreateWithoutUserInput[] | null;
  connect?: FitPicWhereUniqueInput[] | null;
}

export interface FitPicCreateWithoutUserInput {
  id?: string | null;
  includeInstagramHandle?: boolean | null;
  status?: FitPicStatus | null;
  image: ImageCreateOneInput;
  location?: LocationCreateOneInput | null;
  products?: ProductCreateManyInput | null;
  reports?: FitPicReportCreateManyWithoutReportedInput | null;
}

export interface FitPicReportCreateManyWithoutReportedInput {
  create?: FitPicReportCreateWithoutReportedInput[] | null;
  connect?: FitPicReportWhereUniqueInput[] | null;
}

export interface FitPicReportCreateWithoutReportedInput {
  id?: string | null;
  status?: FitPicReportStatus | null;
  reporter: UserCreateOneInput;
}

export interface FitPicReportWhereUniqueInput {
  id?: string | null;
}

export interface FitPicWhereUniqueInput {
  id?: string | null;
}

export interface ImageCreateInput {
  id?: string | null;
  caption?: string | null;
  url: string;
  alt?: string | null;
  height?: number | null;
  width?: number | null;
  title?: string | null;
}

export interface ImageCreateManyInput {
  create?: ImageCreateInput[] | null;
  connect?: ImageWhereUniqueInput[] | null;
}

export interface ImageCreateOneInput {
  create?: ImageCreateInput | null;
  connect?: ImageWhereUniqueInput | null;
}

export interface ImageWhereUniqueInput {
  id?: string | null;
  url?: string | null;
}

export interface LocationCreateInput {
  id?: string | null;
  slug?: string | null;
  name?: string | null;
  company?: string | null;
  description?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  zipCode: string;
  locationType?: LocationType | null;
  lat?: number | null;
  lng?: number | null;
  user?: UserCreateOneInput | null;
  physicalProducts?: PhysicalProductCreateManyWithoutLocationInput | null;
  shippingOptions?: ShippingOptionCreateManyWithoutDestinationInput | null;
}

export interface LocationCreateOneInput {
  create?: LocationCreateInput | null;
  connect?: LocationWhereUniqueInput | null;
}

export interface LocationCreateOneWithoutPhysicalProductsInput {
  create?: LocationCreateWithoutPhysicalProductsInput | null;
  connect?: LocationWhereUniqueInput | null;
}

export interface LocationCreateWithoutPhysicalProductsInput {
  id?: string | null;
  slug?: string | null;
  name?: string | null;
  company?: string | null;
  description?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  zipCode: string;
  locationType?: LocationType | null;
  lat?: number | null;
  lng?: number | null;
  user?: UserCreateOneInput | null;
  shippingOptions?: ShippingOptionCreateManyWithoutDestinationInput | null;
}

export interface LocationWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
}

export interface PaymentPlanWhereInput {
  AND?: PaymentPlanWhereInput[] | null;
  OR?: PaymentPlanWhereInput[] | null;
  NOT?: PaymentPlanWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  planID?: string | null;
  planID_not?: string | null;
  planID_in?: string[] | null;
  planID_not_in?: string[] | null;
  planID_lt?: string | null;
  planID_lte?: string | null;
  planID_gt?: string | null;
  planID_gte?: string | null;
  planID_contains?: string | null;
  planID_not_contains?: string | null;
  planID_starts_with?: string | null;
  planID_not_starts_with?: string | null;
  planID_ends_with?: string | null;
  planID_not_ends_with?: string | null;
  status?: string | null;
  status_not?: string | null;
  status_in?: string[] | null;
  status_not_in?: string[] | null;
  status_lt?: string | null;
  status_lte?: string | null;
  status_gt?: string | null;
  status_gte?: string | null;
  status_contains?: string | null;
  status_not_contains?: string | null;
  status_starts_with?: string | null;
  status_not_starts_with?: string | null;
  status_ends_with?: string | null;
  status_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  price?: number | null;
  price_not?: number | null;
  price_in?: number[] | null;
  price_not_in?: number[] | null;
  price_lt?: number | null;
  price_lte?: number | null;
  price_gt?: number | null;
  price_gte?: number | null;
  itemCount?: number | null;
  itemCount_not?: number | null;
  itemCount_in?: number[] | null;
  itemCount_not_in?: number[] | null;
  itemCount_lt?: number | null;
  itemCount_lte?: number | null;
  itemCount_gt?: number | null;
  itemCount_gte?: number | null;
  tagline?: string | null;
  tagline_not?: string | null;
  tagline_in?: string[] | null;
  tagline_not_in?: string[] | null;
  tagline_lt?: string | null;
  tagline_lte?: string | null;
  tagline_gt?: string | null;
  tagline_gte?: string | null;
  tagline_contains?: string | null;
  tagline_not_contains?: string | null;
  tagline_starts_with?: string | null;
  tagline_not_starts_with?: string | null;
  tagline_ends_with?: string | null;
  tagline_not_ends_with?: string | null;
  tier?: PaymentPlanTier | null;
  tier_not?: PaymentPlanTier | null;
  tier_in?: PaymentPlanTier[] | null;
  tier_not_in?: PaymentPlanTier[] | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
}

export interface PhysicalProductCreateManyWithoutLocationInput {
  create?: PhysicalProductCreateWithoutLocationInput[] | null;
  connect?: PhysicalProductWhereUniqueInput[] | null;
}

export interface PhysicalProductCreateManyWithoutProductVariantInput {
  create?: PhysicalProductCreateWithoutProductVariantInput[] | null;
  connect?: PhysicalProductWhereUniqueInput[] | null;
}

export interface PhysicalProductCreateWithoutLocationInput {
  id?: string | null;
  seasonsUID: string;
  inventoryStatus: InventoryStatus;
  productStatus: PhysicalProductStatus;
  offloadMethod?: PhysicalProductOffloadMethod | null;
  offloadNotes?: string | null;
  sequenceNumber: number;
  barcoded?: boolean | null;
  dateOrdered?: any | null;
  dateReceived?: any | null;
  unitCost?: number | null;
  productVariant: ProductVariantCreateOneWithoutPhysicalProductsInput;
  warehouseLocation?: WarehouseLocationCreateOneWithoutPhysicalProductsInput | null;
  price?: PhysicalProductPriceCreateOneInput | null;
  reports?: PhysicalProductQualityReportCreateManyWithoutPhysicalProductInput | null;
}

export interface PhysicalProductCreateWithoutProductVariantInput {
  id?: string | null;
  seasonsUID: string;
  inventoryStatus: InventoryStatus;
  productStatus: PhysicalProductStatus;
  offloadMethod?: PhysicalProductOffloadMethod | null;
  offloadNotes?: string | null;
  sequenceNumber: number;
  barcoded?: boolean | null;
  dateOrdered?: any | null;
  dateReceived?: any | null;
  unitCost?: number | null;
  location?: LocationCreateOneWithoutPhysicalProductsInput | null;
  warehouseLocation?: WarehouseLocationCreateOneWithoutPhysicalProductsInput | null;
  price?: PhysicalProductPriceCreateOneInput | null;
  reports?: PhysicalProductQualityReportCreateManyWithoutPhysicalProductInput | null;
}

export interface PhysicalProductPriceCreateInput {
  id?: string | null;
  buyUsedEnabled?: boolean | null;
  buyUsedPrice?: number | null;
}

export interface PhysicalProductPriceCreateOneInput {
  create?: PhysicalProductPriceCreateInput | null;
  connect?: PhysicalProductPriceWhereUniqueInput | null;
}

export interface PhysicalProductPriceWhereUniqueInput {
  id?: string | null;
}

export interface PhysicalProductQualityReportCreateManyWithoutPhysicalProductInput {
  create?: PhysicalProductQualityReportCreateWithoutPhysicalProductInput[] | null;
  connect?: PhysicalProductQualityReportWhereUniqueInput[] | null;
}

export interface PhysicalProductQualityReportCreateWithoutPhysicalProductInput {
  id?: string | null;
  damageType?: PhysicalProductDamageType | null;
  notes?: string | null;
  damageTypes?: PhysicalProductQualityReportCreatedamageTypesInput | null;
  user: UserCreateOneInput;
}

export interface PhysicalProductQualityReportCreatedamageTypesInput {
  set?: PhysicalProductDamageType[] | null;
}

export interface PhysicalProductQualityReportWhereUniqueInput {
  id?: string | null;
}

export interface PhysicalProductWhereUniqueInput {
  id?: string | null;
  seasonsUID?: string | null;
}

export interface ProductCreateInput {
  id?: string | null;
  architecture?: ProductArchitecture | null;
  description?: string | null;
  externalURL?: string | null;
  buyNewEnabled?: boolean | null;
  name: string;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  slug: string;
  status?: ProductStatus | null;
  type?: ProductType | null;
  innerMaterials?: ProductCreateinnerMaterialsInput | null;
  outerMaterials?: ProductCreateouterMaterialsInput | null;
  styles?: ProductCreatestylesInput | null;
  brand: BrandCreateOneWithoutProductsInput;
  category: CategoryCreateOneWithoutProductsInput;
  color: ColorCreateOneInput;
  functions?: ProductFunctionCreateManyInput | null;
  images?: ImageCreateManyInput | null;
  materialCategory?: ProductMaterialCategoryCreateOneWithoutProductsInput | null;
  model?: ProductModelCreateOneWithoutProductsInput | null;
  modelSize?: SizeCreateOneInput | null;
  season?: ProductSeasonCreateOneInput | null;
  secondaryColor?: ColorCreateOneInput | null;
  tags?: TagCreateManyWithoutProductsInput | null;
  tier?: ProductTierCreateOneInput | null;
  variants?: ProductVariantCreateManyWithoutProductInput | null;
}

export interface ProductCreateManyInput {
  create?: ProductCreateInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
}

export interface ProductCreateManyWithoutBrandInput {
  create?: ProductCreateWithoutBrandInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
}

export interface ProductCreateManyWithoutCategoryInput {
  create?: ProductCreateWithoutCategoryInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
}

export interface ProductCreateOneWithoutVariantsInput {
  create?: ProductCreateWithoutVariantsInput | null;
  connect?: ProductWhereUniqueInput | null;
}

export interface ProductCreateWithoutBrandInput {
  id?: string | null;
  architecture?: ProductArchitecture | null;
  description?: string | null;
  externalURL?: string | null;
  buyNewEnabled?: boolean | null;
  name: string;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  slug: string;
  status?: ProductStatus | null;
  type?: ProductType | null;
  innerMaterials?: ProductCreateinnerMaterialsInput | null;
  outerMaterials?: ProductCreateouterMaterialsInput | null;
  styles?: ProductCreatestylesInput | null;
  category: CategoryCreateOneWithoutProductsInput;
  color: ColorCreateOneInput;
  functions?: ProductFunctionCreateManyInput | null;
  images?: ImageCreateManyInput | null;
  materialCategory?: ProductMaterialCategoryCreateOneWithoutProductsInput | null;
  model?: ProductModelCreateOneWithoutProductsInput | null;
  modelSize?: SizeCreateOneInput | null;
  season?: ProductSeasonCreateOneInput | null;
  secondaryColor?: ColorCreateOneInput | null;
  tags?: TagCreateManyWithoutProductsInput | null;
  tier?: ProductTierCreateOneInput | null;
  variants?: ProductVariantCreateManyWithoutProductInput | null;
}

export interface ProductCreateWithoutCategoryInput {
  id?: string | null;
  architecture?: ProductArchitecture | null;
  description?: string | null;
  externalURL?: string | null;
  buyNewEnabled?: boolean | null;
  name: string;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  slug: string;
  status?: ProductStatus | null;
  type?: ProductType | null;
  innerMaterials?: ProductCreateinnerMaterialsInput | null;
  outerMaterials?: ProductCreateouterMaterialsInput | null;
  styles?: ProductCreatestylesInput | null;
  brand: BrandCreateOneWithoutProductsInput;
  color: ColorCreateOneInput;
  functions?: ProductFunctionCreateManyInput | null;
  images?: ImageCreateManyInput | null;
  materialCategory?: ProductMaterialCategoryCreateOneWithoutProductsInput | null;
  model?: ProductModelCreateOneWithoutProductsInput | null;
  modelSize?: SizeCreateOneInput | null;
  season?: ProductSeasonCreateOneInput | null;
  secondaryColor?: ColorCreateOneInput | null;
  tags?: TagCreateManyWithoutProductsInput | null;
  tier?: ProductTierCreateOneInput | null;
  variants?: ProductVariantCreateManyWithoutProductInput | null;
}

export interface ProductCreateWithoutVariantsInput {
  id?: string | null;
  architecture?: ProductArchitecture | null;
  description?: string | null;
  externalURL?: string | null;
  buyNewEnabled?: boolean | null;
  name: string;
  photographyStatus?: PhotographyStatus | null;
  productFit?: ProductFit | null;
  publishedAt?: any | null;
  retailPrice?: number | null;
  slug: string;
  status?: ProductStatus | null;
  type?: ProductType | null;
  innerMaterials?: ProductCreateinnerMaterialsInput | null;
  outerMaterials?: ProductCreateouterMaterialsInput | null;
  styles?: ProductCreatestylesInput | null;
  brand: BrandCreateOneWithoutProductsInput;
  category: CategoryCreateOneWithoutProductsInput;
  color: ColorCreateOneInput;
  functions?: ProductFunctionCreateManyInput | null;
  images?: ImageCreateManyInput | null;
  materialCategory?: ProductMaterialCategoryCreateOneWithoutProductsInput | null;
  model?: ProductModelCreateOneWithoutProductsInput | null;
  modelSize?: SizeCreateOneInput | null;
  season?: ProductSeasonCreateOneInput | null;
  secondaryColor?: ColorCreateOneInput | null;
  tags?: TagCreateManyWithoutProductsInput | null;
  tier?: ProductTierCreateOneInput | null;
}

export interface ProductCreateinnerMaterialsInput {
  set?: string[] | null;
}

export interface ProductCreateouterMaterialsInput {
  set?: string[] | null;
}

export interface ProductCreatestylesInput {
  set?: CustomerStyle[] | null;
}

export interface ProductFunctionCreateInput {
  id?: string | null;
  name?: string | null;
}

export interface ProductFunctionCreateManyInput {
  create?: ProductFunctionCreateInput[] | null;
  connect?: ProductFunctionWhereUniqueInput[] | null;
}

export interface ProductFunctionWhereUniqueInput {
  id?: string | null;
  name?: string | null;
}

export interface ProductMaterialCategoryCreateOneWithoutProductsInput {
  create?: ProductMaterialCategoryCreateWithoutProductsInput | null;
  connect?: ProductMaterialCategoryWhereUniqueInput | null;
}

export interface ProductMaterialCategoryCreateWithoutProductsInput {
  id?: string | null;
  slug: string;
  lifeExpectancy: number;
  category: CategoryCreateOneInput;
}

export interface ProductMaterialCategoryWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
}

export interface ProductModelCreateOneWithoutProductsInput {
  create?: ProductModelCreateWithoutProductsInput | null;
  connect?: ProductModelWhereUniqueInput | null;
}

export interface ProductModelCreateWithoutProductsInput {
  id?: string | null;
  name: string;
  height: number;
}

export interface ProductModelWhereUniqueInput {
  id?: string | null;
  name?: string | null;
}

export interface ProductSeasonCreateInput {
  id?: string | null;
  wearableSeasons?: ProductSeasonCreatewearableSeasonsInput | null;
  vendorSeason?: SeasonCreateOneInput | null;
  internalSeason?: SeasonCreateOneInput | null;
}

export interface ProductSeasonCreateOneInput {
  create?: ProductSeasonCreateInput | null;
  connect?: ProductSeasonWhereUniqueInput | null;
}

export interface ProductSeasonCreatewearableSeasonsInput {
  set?: SeasonString[] | null;
}

export interface ProductSeasonWhereUniqueInput {
  id?: string | null;
}

export interface ProductTierCreateInput {
  id?: string | null;
  tier: ProductTierName;
  price: number;
}

export interface ProductTierCreateOneInput {
  create?: ProductTierCreateInput | null;
  connect?: ProductTierWhereUniqueInput | null;
}

export interface ProductTierWhereUniqueInput {
  id?: string | null;
}

export interface ProductVariantCreateManyWithoutColorInput {
  create?: ProductVariantCreateWithoutColorInput[] | null;
  connect?: ProductVariantWhereUniqueInput[] | null;
}

export interface ProductVariantCreateManyWithoutProductInput {
  create?: ProductVariantCreateWithoutProductInput[] | null;
  connect?: ProductVariantWhereUniqueInput[] | null;
}

export interface ProductVariantCreateOneWithoutPhysicalProductsInput {
  create?: ProductVariantCreateWithoutPhysicalProductsInput | null;
  connect?: ProductVariantWhereUniqueInput | null;
}

export interface ProductVariantCreateWithoutColorInput {
  id?: string | null;
  sku?: string | null;
  displayShort: string;
  weight?: number | null;
  height?: number | null;
  productID: string;
  retailPrice?: number | null;
  total: number;
  reservable: number;
  reserved: number;
  nonReservable: number;
  offloaded: number;
  stored: number;
  internalSize?: SizeCreateOneInput | null;
  manufacturerSizes?: SizeCreateManyInput | null;
  product: ProductCreateOneWithoutVariantsInput;
  price?: ProductVariantPriceCreateOneInput | null;
  shopifyProductVariant?: ShopifyProductVariantCreateOneWithoutProductVariantInput | null;
  physicalProducts?: PhysicalProductCreateManyWithoutProductVariantInput | null;
}

export interface ProductVariantCreateWithoutPhysicalProductsInput {
  id?: string | null;
  sku?: string | null;
  displayShort: string;
  weight?: number | null;
  height?: number | null;
  productID: string;
  retailPrice?: number | null;
  total: number;
  reservable: number;
  reserved: number;
  nonReservable: number;
  offloaded: number;
  stored: number;
  color: ColorCreateOneWithoutProductVariantsInput;
  internalSize?: SizeCreateOneInput | null;
  manufacturerSizes?: SizeCreateManyInput | null;
  product: ProductCreateOneWithoutVariantsInput;
  price?: ProductVariantPriceCreateOneInput | null;
  shopifyProductVariant?: ShopifyProductVariantCreateOneWithoutProductVariantInput | null;
}

export interface ProductVariantCreateWithoutProductInput {
  id?: string | null;
  sku?: string | null;
  displayShort: string;
  weight?: number | null;
  height?: number | null;
  productID: string;
  retailPrice?: number | null;
  total: number;
  reservable: number;
  reserved: number;
  nonReservable: number;
  offloaded: number;
  stored: number;
  color: ColorCreateOneWithoutProductVariantsInput;
  internalSize?: SizeCreateOneInput | null;
  manufacturerSizes?: SizeCreateManyInput | null;
  price?: ProductVariantPriceCreateOneInput | null;
  shopifyProductVariant?: ShopifyProductVariantCreateOneWithoutProductVariantInput | null;
  physicalProducts?: PhysicalProductCreateManyWithoutProductVariantInput | null;
}

export interface ProductVariantPriceCreateInput {
  id?: string | null;
  retailPrice?: number | null;
}

export interface ProductVariantPriceCreateOneInput {
  create?: ProductVariantPriceCreateInput | null;
  connect?: ProductVariantPriceWhereUniqueInput | null;
}

export interface ProductVariantPriceWhereUniqueInput {
  id?: string | null;
}

export interface ProductVariantWhereUniqueInput {
  id?: string | null;
  sku?: string | null;
}

export interface ProductWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
}

export interface PushNotificationReceiptCreateInput {
  id?: string | null;
  route?: string | null;
  screen?: string | null;
  uri?: string | null;
  interest?: string | null;
  body: string;
  title?: string | null;
  recordID?: string | null;
  recordSlug?: string | null;
  notificationKey?: string | null;
  sentAt: any;
  users?: UserCreateManyWithoutPushNotificationsInput | null;
}

export interface PushNotificationReceiptCreateManyInput {
  create?: PushNotificationReceiptCreateInput[] | null;
  connect?: PushNotificationReceiptWhereUniqueInput[] | null;
}

export interface PushNotificationReceiptCreateManyWithoutUsersInput {
  create?: PushNotificationReceiptCreateWithoutUsersInput[] | null;
  connect?: PushNotificationReceiptWhereUniqueInput[] | null;
}

export interface PushNotificationReceiptCreateWithoutUsersInput {
  id?: string | null;
  route?: string | null;
  screen?: string | null;
  uri?: string | null;
  interest?: string | null;
  body: string;
  title?: string | null;
  recordID?: string | null;
  recordSlug?: string | null;
  notificationKey?: string | null;
  sentAt: any;
}

export interface PushNotificationReceiptWhereUniqueInput {
  id?: string | null;
}

export interface ReserveItemsOptions {
  dryRun?: boolean | null;
}

export interface SeasonCreateInput {
  id?: string | null;
  year?: number | null;
  seasonCode?: SeasonCode | null;
}

export interface SeasonCreateOneInput {
  create?: SeasonCreateInput | null;
  connect?: SeasonWhereUniqueInput | null;
}

export interface SeasonWhereUniqueInput {
  id?: string | null;
}

export interface ShippingMethodCreateInput {
  id?: string | null;
  code: ShippingCode;
  displayText: string;
}

export interface ShippingMethodCreateOneInput {
  create?: ShippingMethodCreateInput | null;
  connect?: ShippingMethodWhereUniqueInput | null;
}

export interface ShippingMethodWhereUniqueInput {
  id?: string | null;
}

export interface ShippingOptionCreateManyWithoutDestinationInput {
  create?: ShippingOptionCreateWithoutDestinationInput[] | null;
  connect?: ShippingOptionWhereUniqueInput[] | null;
}

export interface ShippingOptionCreateWithoutDestinationInput {
  id?: string | null;
  externalCost?: number | null;
  averageDuration?: number | null;
  origin?: LocationCreateOneInput | null;
  shippingMethod?: ShippingMethodCreateOneInput | null;
}

export interface ShippingOptionWhereUniqueInput {
  id?: string | null;
}

export interface ShopifyProductVariantCreateOneWithoutProductVariantInput {
  create?: ShopifyProductVariantCreateWithoutProductVariantInput | null;
  connect?: ShopifyProductVariantWhereUniqueInput | null;
}

export interface ShopifyProductVariantCreateWithoutProductVariantInput {
  id?: string | null;
  externalId?: string | null;
  displayName?: string | null;
  title?: string | null;
  cachedPrice?: number | null;
  cachedAvailableForSale?: boolean | null;
  cacheExpiresAt?: any | null;
  selectedOptions?: ShopifyProductVariantSelectedOptionCreateManyInput | null;
  shop?: ShopifyShopCreateOneInput | null;
  brand?: BrandCreateOneInput | null;
  image?: ImageCreateOneInput | null;
}

export interface ShopifyProductVariantSelectedOptionCreateInput {
  id?: string | null;
  name: string;
  value: string;
}

export interface ShopifyProductVariantSelectedOptionCreateManyInput {
  create?: ShopifyProductVariantSelectedOptionCreateInput[] | null;
  connect?: ShopifyProductVariantSelectedOptionWhereUniqueInput[] | null;
}

export interface ShopifyProductVariantSelectedOptionWhereUniqueInput {
  id?: string | null;
}

export interface ShopifyProductVariantWhereUniqueInput {
  id?: string | null;
  externalId?: string | null;
}

export interface ShopifyShopCreateInput {
  id?: string | null;
  shopName: string;
  enabled: boolean;
  accessToken?: string | null;
  scope?: ShopifyShopCreatescopeInput | null;
}

export interface ShopifyShopCreateOneInput {
  create?: ShopifyShopCreateInput | null;
  connect?: ShopifyShopWhereUniqueInput | null;
}

export interface ShopifyShopCreatescopeInput {
  set?: string[] | null;
}

export interface ShopifyShopWhereUniqueInput {
  id?: string | null;
  shopName?: string | null;
}

export interface SizeCreateInput {
  id?: string | null;
  slug: string;
  productType?: ProductType | null;
  display: string;
  type?: SizeType | null;
  top?: TopSizeCreateOneInput | null;
  bottom?: BottomSizeCreateOneInput | null;
}

export interface SizeCreateManyInput {
  create?: SizeCreateInput[] | null;
  connect?: SizeWhereUniqueInput[] | null;
}

export interface SizeCreateOneInput {
  create?: SizeCreateInput | null;
  connect?: SizeWhereUniqueInput | null;
}

export interface SizeWhereUniqueInput {
  id?: string | null;
  slug?: string | null;
}

export interface SmsReceiptCreateInput {
  id?: string | null;
  externalId?: string | null;
  body: string;
  status: SmsStatus;
  smsId?: string | null;
  mediaUrls?: SmsReceiptCreatemediaUrlsInput | null;
}

export interface SmsReceiptCreateManyInput {
  create?: SmsReceiptCreateInput[] | null;
  connect?: SmsReceiptWhereUniqueInput[] | null;
}

export interface SmsReceiptCreatemediaUrlsInput {
  set?: string[] | null;
}

export interface SmsReceiptWhereUniqueInput {
  id?: string | null;
}

export interface StylePreferencesCreateInput {
  id?: string | null;
  styles?: StylePreferencesCreatestylesInput | null;
  patterns?: StylePreferencesCreatepatternsInput | null;
  colors?: StylePreferencesCreatecolorsInput | null;
  brands?: StylePreferencesCreatebrandsInput | null;
}

export interface StylePreferencesCreateOneInput {
  create?: StylePreferencesCreateInput | null;
  connect?: StylePreferencesWhereUniqueInput | null;
}

export interface StylePreferencesCreatebrandsInput {
  set?: string[] | null;
}

export interface StylePreferencesCreatecolorsInput {
  set?: string[] | null;
}

export interface StylePreferencesCreatepatternsInput {
  set?: string[] | null;
}

export interface StylePreferencesCreatestylesInput {
  set?: string[] | null;
}

export interface StylePreferencesWhereUniqueInput {
  id?: string | null;
}

export interface SubmitOrderInput {
  orderID: string;
}

export interface TagCreateManyWithoutProductsInput {
  create?: TagCreateWithoutProductsInput[] | null;
  connect?: TagWhereUniqueInput[] | null;
}

export interface TagCreateWithoutProductsInput {
  id?: string | null;
  name: string;
  description?: string | null;
}

export interface TagWhereUniqueInput {
  id?: string | null;
  name?: string | null;
}

export interface TopSizeCreateInput {
  id?: string | null;
  letter?: LetterSize | null;
  sleeve?: number | null;
  shoulder?: number | null;
  chest?: number | null;
  neck?: number | null;
  length?: number | null;
}

export interface TopSizeCreateOneInput {
  create?: TopSizeCreateInput | null;
  connect?: TopSizeWhereUniqueInput | null;
}

export interface TopSizeWhereUniqueInput {
  id?: string | null;
}

export interface UTMInput {
  source?: string | null;
  medium?: string | null;
  term?: string | null;
  content?: string | null;
  campaign?: string | null;
}

export interface UserCreateInput {
  id?: string | null;
  auth0Id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: UserRole | null;
  pushNotificationStatus?: PushNotificationStatus | null;
  sendSystemEmails?: boolean | null;
  verificationStatus?: UserVerificationStatus | null;
  verificationMethod?: UserVerificationMethod | null;
  roles?: UserCreaterolesInput | null;
  pushNotifications?: PushNotificationReceiptCreateManyWithoutUsersInput | null;
  emails?: EmailReceiptCreateManyWithoutUserInput | null;
  pushNotification?: UserPushNotificationCreateOneInput | null;
  smsReceipts?: SmsReceiptCreateManyInput | null;
  fitPics?: FitPicCreateManyWithoutUserInput | null;
  deviceData?: UserDeviceDataCreateOneInput | null;
}

export interface UserCreateManyWithoutPushNotificationsInput {
  create?: UserCreateWithoutPushNotificationsInput[] | null;
  connect?: UserWhereUniqueInput[] | null;
}

export interface UserCreateOneInput {
  create?: UserCreateInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateWithoutPushNotificationsInput {
  id?: string | null;
  auth0Id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: UserRole | null;
  pushNotificationStatus?: PushNotificationStatus | null;
  sendSystemEmails?: boolean | null;
  verificationStatus?: UserVerificationStatus | null;
  verificationMethod?: UserVerificationMethod | null;
  roles?: UserCreaterolesInput | null;
  emails?: EmailReceiptCreateManyWithoutUserInput | null;
  pushNotification?: UserPushNotificationCreateOneInput | null;
  smsReceipts?: SmsReceiptCreateManyInput | null;
  fitPics?: FitPicCreateManyWithoutUserInput | null;
  deviceData?: UserDeviceDataCreateOneInput | null;
}

export interface UserCreaterolesInput {
  set?: UserRole[] | null;
}

export interface UserDeviceDataCreateInput {
  id?: string | null;
  iOSVersion?: string | null;
}

export interface UserDeviceDataCreateOneInput {
  create?: UserDeviceDataCreateInput | null;
  connect?: UserDeviceDataWhereUniqueInput | null;
}

export interface UserDeviceDataWhereUniqueInput {
  id?: string | null;
}

export interface UserPushNotificationCreateInput {
  id?: string | null;
  status?: boolean | null;
  interests?: UserPushNotificationInterestCreateManyInput | null;
  history?: PushNotificationReceiptCreateManyInput | null;
}

export interface UserPushNotificationCreateOneInput {
  create?: UserPushNotificationCreateInput | null;
  connect?: UserPushNotificationWhereUniqueInput | null;
}

export interface UserPushNotificationInterestCreateInput {
  id?: string | null;
  type: UserPushNotificationInterestType;
  value: string;
  status?: boolean | null;
  user: UserCreateOneInput;
}

export interface UserPushNotificationInterestCreateManyInput {
  create?: UserPushNotificationInterestCreateInput[] | null;
  connect?: UserPushNotificationInterestWhereUniqueInput[] | null;
}

export interface UserPushNotificationInterestWhereUniqueInput {
  id?: string | null;
}

export interface UserPushNotificationWhereUniqueInput {
  id?: string | null;
}

export interface UserWhereUniqueInput {
  id?: string | null;
  auth0Id?: string | null;
  email?: string | null;
}

export interface WarehouseLocationConstraintCreateManyWithoutLocationsInput {
  create?: WarehouseLocationConstraintCreateWithoutLocationsInput[] | null;
  connect?: WarehouseLocationConstraintWhereUniqueInput[] | null;
}

export interface WarehouseLocationConstraintCreateWithoutLocationsInput {
  id?: string | null;
  limit: number;
  category: CategoryCreateOneInput;
}

export interface WarehouseLocationConstraintWhereUniqueInput {
  id?: string | null;
}

export interface WarehouseLocationCreateOneWithoutPhysicalProductsInput {
  create?: WarehouseLocationCreateWithoutPhysicalProductsInput | null;
  connect?: WarehouseLocationWhereUniqueInput | null;
}

export interface WarehouseLocationCreateWithoutPhysicalProductsInput {
  id?: string | null;
  type: WarehouseLocationType;
  barcode: string;
  locationCode: string;
  itemCode: string;
  constraints?: WarehouseLocationConstraintCreateManyWithoutLocationsInput | null;
}

export interface WarehouseLocationWhereUniqueInput {
  id?: string | null;
  barcode?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
