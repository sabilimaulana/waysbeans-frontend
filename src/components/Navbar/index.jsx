import styles from "./Navbar.module.css";

// import { Link } from "react-router-dom";

import brandIcon from "../../assets/brand-icon.svg";
import manUser from "../../assets/man-user.png";
import { useContext, useEffect, useState } from "react";
import Signin from "../Signin";
import Signup from "../Signup";
import UserDropdown from "../UserDropdown";
import OwnerDropdown from "../OwnerDropdown";

import { UserContext } from "../../contexts/UserContext";
import FilterContext from "../../contexts/FilterContext";
// import OwnerDropdown from "../OwnerDropdown";

const Navbar = () => {
  // handleSearch, searchText,

  const { state } = useContext(UserContext);

  const { filterDispatch } = useContext(FilterContext);

  const [searchText, setSearchText] = useState("");

  const [signinModalShow, setSigninModalShow] = useState(false);
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [userDropdownShow, setUserDropdownShow] = useState(false);
  const [ownerDropdownShow, setOwnerDropdownShow] = useState(false);

  useEffect(() => {}, [state]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchButton = (e) => {
    e.preventDefault();

    filterDispatch({
      type: "FILTERIN",
      payload: {
        search: searchText,
        isSearch: true,
      },
    });
  };

  // console.log(filterState);

  return (
    <nav className={styles.navbar}>
      <a href="/">
        <img
          src={brandIcon}
          alt="brand icon"
          width="138px"
          onClick={() => {
            window.location.reload();
          }}
        />
      </a>
      {/* <Link to="/">
  
      </Link> */}

      {state.isLogin ? (
        state.user.listAs === "Seller" ? (
          <>
            <div
              className={styles.user}
              onClick={() => setOwnerDropdownShow(!ownerDropdownShow)}
            >
              {state.user.photo === "" ? (
                <img src={manUser} alt="user" height="50px" />
              ) : (
                <img
                  src={`http://localhost:8080/${state.user.photo}`}
                  alt="user"
                  height="50px"
                />
              )}
            </div>
            <OwnerDropdown
              showDropdown={ownerDropdownShow}
              onHide={() => setOwnerDropdownShow(false)}
            />
          </>
        ) : (
          <>
            <div
              className={styles.user}
              onClick={() => setUserDropdownShow(!userDropdownShow)}
            >
              {state.user.photo === "" ? (
                <img src={manUser} alt="user" height="50px" />
              ) : (
                <img
                  src={`http://localhost:8080/${state.user.photo}`}
                  alt="user"
                  height="50px"
                />
              )}
            </div>
            <UserDropdown
              showDropdown={userDropdownShow}
              onHide={() => setUserDropdownShow(false)}
            />
          </>
        )
      ) : (
        <div className={styles.signWrapper}>
          <button
            className={styles.signinButton}
            onClick={() => setSigninModalShow(true)}
          >
            Login
          </button>
          <Signin
            showModal={signinModalShow}
            onHide={() => setSigninModalShow(false)}
            onHere={() => setSignupModalShow(true)}
          />
          <button
            className={styles.signupButton}
            onClick={() => setSignupModalShow(true)}
          >
            Register
          </button>
          <Signup
            showModal={signupModalShow}
            onHide={() => setSignupModalShow(false)}
            onHere={() => setSigninModalShow(true)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
