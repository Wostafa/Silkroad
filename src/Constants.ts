export const WebsiteTitle = "SilkRoad";
export const CompanyAddress = "17 Princess Road, London, Greater London NW1 8JR, UK";
// 
export interface Product {
  key: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}
export const StripeConfig = {
  PUB_KEY:'pk_test_51LtQshDaz0enZrbvF4NTgiXmWm4hhT6PT8DXL8KMlJrFK7IsuQDUg5VXyWfw1rRd5pnT14kT1oqRkEzCZJGQfxyX00ewT4xM1k',
  CHECKOUT_ENDPOINT: 'https://cheerful-faloodeh-d6213b.netlify.app/api/stripe',
}
export const Categories = ['armchair','clock','chair','pillow','plant-pot','rug','others'];


export const QUERIES = {
  phoneAndSmaller: '(max-width: 576px)',
  tabletAndSmaller: '(max-width: 768px)',
  laptopAndSmaller: '(max-width: 992px)',
}