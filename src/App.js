import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FilterContextProvider } from "./contexts/FilterContext";
import UserContextProvider, { UserContext } from "./contexts/UserContext";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useContext, useEffect } from "react";
import { API, setAuthToken } from "./services/API";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Profile from "./pages/ProfilePage";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <>
      <Router>
        <FilterContextProvider>
          <UserContextProvider>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/product-detail/:id">
                <ProductDetailPage />
              </Route>
              <Route exact path="/cart">
                <CartPage />
              </Route>

              <Route exact path="/checkout/:id">
                <CheckoutPage />
              </Route>

              <Route exact path="/me">
                <Profile />
              </Route>
              <Route exact path="/add-product">
                <AddProduct />
              </Route>

              {/* <Route exact path="/guest">
              <Home />
            </Route>
            <Route exact path="/house-detail/:id">
              <HouseDetail />
            </Route>
      
            <Route exact path="/my-booking">
              <Booking />
            </Route>
            <Route exact path="/my-history">
              <History />
            </Route>
          
            <Route>
              <NotFound />
            </Route>
            <Redirect to="/" /> */}
            </Switch>
          </UserContextProvider>
        </FilterContextProvider>
      </Router>
    </>
  );
}

export default App;
