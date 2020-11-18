export interface Coupon {
  discountAmount: number
  discountPercentage: number
  couponType: CouponType
  couponCode: string
}

export enum CouponType {
  FixedAmount = "FixedAmount",
  Percentage = "Percentage",
}

export function calcFinalPrice(price: number, coupon: Coupon) {
  if (coupon) {
    const { discountAmount, discountPercentage, couponType } = coupon
    switch (couponType) {
      case CouponType.FixedAmount:
        return price - discountAmount
      case CouponType.Percentage:
        return price - (price * discountPercentage) / 100.0
      default:
        return price
    }
  } else {
    return price
  }
}
