import styles from "./UserDropdown.module.css";

import triangle from "../../assets/triangle.svg";
import profileIcon from "../../assets/profile-icon.svg";
import logoutIcon from "../../assets/logout.svg";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { setAuthToken } from "../../services/API";

const UserDropdown = ({ showDropdown, onHide }) => {
  const { dispatch } = useContext(UserContext);

  const router = useHistory();

  const handleLogout = () => {
    sessionStorage.clear("token");
    setAuthToken();

    dispatch({ type: "LOGOUT" });
    router.push("/");
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
              router.push("/me");
              onHide();
            }}
          >
            <img
              className={styles.menuIcon}
              src={profileIcon}
              alt="user icon"
              width="40px"
            />
            <p className={styles.menuText}>Profile</p>
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

export default UserDropdown;

// return showModal ? (
//   <>
//     <div className={styles.signinModal}>
//       <form className={styles.signinForm}>
//         <div className={styles.centerWrapper}>
//           <p className={styles.modalTitle}>Sign in</p>
//         </div>
//         <label className={styles.inputLabel}>Username</label>
//         <input
//           className={styles.inputField}
//           type="text"
//           name="username"
//           id="username"
//         />
//         <label className={styles.inputLabel}>Password</label>
//         <input
//           className={styles.inputField}
//           type="password"
//           name="username"
//           id="username"
//         />
//         <Link to="/">
//           <input
//             type="submit"
//             className={styles.signinButton}
//             value="Sign in"
//             onClick={(e) => {
//               // e.preventDefault();
//               onHide();
//             }}
//           />
//         </Link>

//         <div className={styles.centerWrapper}>
//           <p className={styles.signupText}>
//             Don't have an account? ? Click
//             <label
//               className={styles.hereButton}
//               onClick={() => {
//                 onHide();
//                 onHere();
//               }}
//             >
//               Here
//             </label>
//           </p>
//         </div>
//       </form>
//     </div>
//     <div className={styles.background} onClick={onHide}></div>
//   </>
// ) : null;
