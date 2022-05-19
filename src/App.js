import "./App.css";
import React from "react";
import AnimatedCursor from "react-animated-cursor";

import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

import Header from "./components/header/header.component";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import CheckoutPage from "./pages/checkout/checkout.component";
import CollectionsOverview from "./components/collections-overview/collections-overview.component";
import CollectionPage from "./pages/collection/collection.component";
import Footer from "./components/footer/footer.component";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  unSubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.onSubsceribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <AnimatedCursor
          innerSize={12}
          outerSize={30}
          color="221, 85, 255"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={2}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
            ".nav-item",
            ".onClick",
            ".main",
            ".oover",
          ]}
        />
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />

          <Route path="/shop/" element={<ShopPage />}>
            <Route index element={<CollectionsOverview />} />
            <Route path=":collectionId" element={<CollectionPage />} />
          </Route>

          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route
            exact
            path="/signin"
            element={
              this.props.currentUser ? (
                <Navigate to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
