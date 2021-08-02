import styles from "./OwnerDropdown.module.css";

import triangle from "../../assets/triangle.svg";
import logoutIcon from "../../assets/logout.svg";
import addProduct from "../../assets/add-product.svg";

import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

// const OwnerDropdown = () => {
//   return <div>ghello</div>;
// };

const OwnerDropdown = ({ showDropdown, onHide }) => {
  const { dispatch } = useContext(UserContext);

  const router = useHistory();

  const handleLogout = () => {
    router.push("/");
    dispatch({ type: "LOGOUT" });
    sessionStorage.clear("user");
  };

  return (
    showDropdown && (
      <>
        <div className={styles.dropdownWrapper}>
          <img
            src={triangle}
            alt="backflip triangle"
            className={styles.triangle}
          />

          <div
            className={styles.dropdownMenuWrapper}
            onClick={() => {
              router.push("/add-product");
              onHide();
            }}
          >
            <img
              className={styles.menuIcon}
              src={addProduct}
              alt="property icon"
              width="40px"
            />
            <p className={styles.menuText}>Add Product</p>
          </div>

          <p className={styles.divider}></p>
          <div className={styles.dropdownMenuWrapper} onClick={handleLogout}>
            <img
              className={styles.menuIcon}
              src={logoutIcon}
              alt="logout icon"
              width="40px"
            />
            <p className={styles.menuText}>Logout</p>
          </div>
        </div>
        <div className={styles.background} onClick={onHide}></div>
      </>
    )
  );
};

export default OwnerDropdown;
