# Task Overview
This project is an e-commerce application built using React and React Router. The task involves creating a shopping cart system with the following 

## features:
A product grid page that displays a list of products
Each product card has a link to its individual full product page
A modal cart that appears when the user clicks on the cart icon in the navbar
The modal cart allows users to view their cart contents, increase/decrease quantity, and remove items
A checkout page that displays the total cost and allows users to place an order
Routing

## The application uses React Router to manage client-side routing. The following routes are defined:
/: The root route that displays the product grid page
/product/:id: A route that displays the individual full product page for a product with the specified ID
/cart: A route that displays the checkout page
Modal Cart to Checkout Page

When the user clicks on the "Checkout" button in the modal cart, they are redirected to the /cart route, which displays the checkout page. The checkout page displays the total cost of the items in the cart and allows the user to place an order.

## Product Card to Individual Full Product Page
Each product card in the product grid page has a link to its individual full product page. When the user clicks on a product card, they are redirected to the /product/:id route, which displays the full product page for the selected product. The :id parameter in the route is replaced with the actual ID of the product.

## Example Use Cases
A user navigates to the root route (/) and views the product grid page.
The user clicks on a product card and is redirected to the individual full product page for that product (/product/:id).
The user adds a product to their cart and clicks on the cart icon in the navbar to view their cart contents.
The user clicks on the "Checkout" button in the modal cart and is redirected to the checkout page (/cart).
The user places an order on the checkout page.
