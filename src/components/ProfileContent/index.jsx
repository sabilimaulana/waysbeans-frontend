import styles from "./ProfileContent.module.css";

import mailIcon from "../../assets/profile/mail-icon.svg";
import brandIcon from "../../assets/brand-icon.svg";

import manUser from "../../assets/man-user.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../services/API";
import { convertToRupiah } from "../../utils/moneyConvert";

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

  const getMonthName = (date) => {
    const newDate = new Date(date);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[newDate.getMonth()];
  };

  const getDaysName = (date) => {
    const newDate = new Date(date);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return days[newDate.getDay()];
  };

  const getDate = (date) => {
    const newDate = new Date(date);

    return newDate.getDate();
  };

  const getFullYear = (date) => {
    const newDate = new Date(date);

    return newDate.getFullYear();
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
            return (
              <div key={order.id} className={styles.cardItem}>
                <img
                  src={`http://localhost:8080/${order.Product.photo}`}
                  alt="order"
                  className={styles.cardItemImage}
                />
                <div className={styles.cardItemContent}>
                  <div className={styles.cardItemContentLeft}>
                    <p
                      className={styles.productName}
                    >{`${order.Product.name.toUpperCase()} Beans`}</p>
                    <p className={styles.date}>
                      <strong>{getDaysName(order.createdAt)}</strong>
                      {`, ${getDate(order.createdAt)} ${getMonthName(
                        order.createdAt
                      )}  ${getFullYear(order.createdAt)}`}
                    </p>

                    <p className={styles.productPrice}>
                      Price: {convertToRupiah(order.Product.price)}
                    </p>

                    <p className={styles.orderQuantity}>
                      Qty: {order.orderQuantity} pcs
                    </p>
                    <strong className={styles.totalPrice}>
                      Total: {order.total}
                    </strong>
                  </div>

                  <div className={styles.cardItemContentRight}>
                    <img src={brandIcon} alt="brand" width="73" />
                    <div className={styles.barcode}>barcode</div>

                    <div className={styles.statusCard}>
                      {order.status === "Approved" ? (
                        <div className={styles.statusSuccess}>
                          <p>Success</p>
                        </div>
                      ) : order.status === "Cancel" ? (
                        <div className={styles.statusCancel}>
                          <p>Cancel</p>
                        </div>
                      ) : (
                        <div className={styles.statusWaitingApprove}>
                          <p>{order.status}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
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
