import styles from "./ProfileContent.module.css";

import mailIcon from "../../assets/profile/mail-icon.svg";

import manUser from "../../assets/man-user.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../services/API";
import OrderCard from "../OrderCard";

const ProfileContent = ({ state }) => {
  const [changePasswordModalShow, setChangePasswordModalShow] = useState(false);

  const [orders, setOrders] = useState([]);

  const handlePicture = (e) => {
    var bodyForm = new FormData();

    const token = sessionStorage.getItem("token");
    bodyForm.append("profilePicture", e.target.files[0]);
    axios({
      method: "PATCH",
      url: "http://localhost:8080/api/v1/user/profile-picture/",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: bodyForm,
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    const getOrder = async () => {
      try {
        const result = await API.get("/transactions/order");
        setOrders(result.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getOrder();
  }, []);

  console.log(orders);

  return (
    <div className={styles.content}>
      <div className={styles.leftContent}>
        <h3 className={styles.contentTitle}>My Profile</h3>
        <div className={styles.profileData}>
          <div className={styles.imageWrapper}>
            {state.user.photo === "" ? (
              <img
                className={styles.profileImage}
                src={manUser}
                alt="profile"
              />
            ) : (
              <img
                className={styles.profileImage}
                src={`http://localhost:8080/${state.user.photo}`}
                alt="profile"
              />
            )}

            <label className={styles.changePhotoButton}>
              <input
                type="file"
                className={styles.fileInput}
                onChange={handlePicture}
              />
              <span className={styles.fileInputText}>Change Photo Profile</span>
            </label>
          </div>

          <div>
            <InfoWrapper
              icon={mailIcon}
              infoTitle="Full Name"
              infoValue={state.user.fullname}
            />
            <InfoWrapper
              icon={mailIcon}
              infoTitle="Email"
              infoValue={state.user.email}
            />
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className={styles.rightContent}>
        <h3 className={styles.contentTitle}>My Transaction</h3>
        <div className={styles.transactionData}>
          {orders.map((order) => {
            <OrderCard order={order} />;
          })}
        </div>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div className={styles.container}>
  //       <div className={styles.wrapper}>
  //         <div className={styles.infoSection}>
  //           <h1 className={styles.infoSectionTitle}>Personal Info</h1>

  //           <InfoWrapper
  //             icon={nameIcon}
  //             infoTitle="Fullname"
  //             infoValue={state.user.fullname}
  //           />
  //           <InfoWrapper
  //             icon={mailIcon}
  //             infoTitle="Email"
  //             infoValue={state.user.email}
  //           />

  //           <div className={styles.infoWrapper}>
  //             <div className={styles.iconWrapper}>
  //               <img src={passwordIcon} alt="name" />
  //             </div>
  //             <div className={styles.textWrapper}>
  //               <p
  //                 className={styles.changePassword}
  //                 onClick={() => {
  //                   setChangePasswordModalShow(true);
  //                 }}
  //               >
  //                 Change Password
  //               </p>
  //               <p className={styles.infoTitle}>Password</p>
  //             </div>
  //           </div>
  //         </div>
  //         <div className={styles.imageWrapper}>
  //           {state.user.photo === "" ? (
  //             <img
  //               className={styles.profileImage}
  //               src={manUser}
  //               alt="profile"
  //             />
  //           ) : (
  //             <img
  //               className={styles.profileImage}
  //               src={`http://localhost:8080/${state.user.photo}`}
  //               alt="profile"
  //             />
  //           )}

  //           <label className={styles.changePhotoButton}>
  //             <input
  //               type="file"
  //               className={styles.fileInput}
  //               onChange={handlePicture}
  //             />
  //             <span className={styles.fileInputText}>Change Photo Profile</span>
  //           </label>
  //         </div>
  //       </div>
  //     </div>
  //     <div style={{ padding: "50px" }}>
  //       <h3>Your transactions</h3>
  //       <br />
  //       {orders.map((order) => {
  //         return (
  //           <div key={order.id} style={{ padding: "20px" }}>
  //             <img
  //               src={`http://localhost:8080/${order.Product.photo}`}
  //               alt="order"
  //             />
  //             <h4>Name: {order.Product.name}</h4>
  //             <p>Total: {order.total}</p>
  //             <p>Order Quantity: {order.orderQuantity}</p>
  //             <p>
  //               Status: {order.status === "Approved" ? "Success" : order.status}
  //             </p>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </>
  // );
};

const InfoWrapper = ({ icon, infoValue, infoTitle }) => {
  return (
    <div className={styles.infoWrapper}>
      <p className={styles.infoTitle}>{infoTitle}</p>
      <p className={styles.infoValue}>{infoValue}</p>
    </div>
  );
};

export default ProfileContent;
