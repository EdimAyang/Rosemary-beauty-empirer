export const PATHS = {
  HOME: "/",

  SERVICE: "/services",

  SERVICE_DETAILS: (serviceId: string) => `/services/${serviceId}`,

  SERVICE_DETAILS_PATTERN: "/services/:serviceId",

  SHOP: "/shop",

  PRODUCT_DETAILS: (productId: string) => `/shop/${productId}`,

  PRODUCT_DETAILS_PATTERN: "/shop/:productId",

  BOOKING: "/booking",

  CHECKOUT:'/checkout',
  
};
