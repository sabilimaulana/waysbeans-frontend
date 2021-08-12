import styles from "./ProfileContent.module.css";
import mailIcon from "../../assets/profile/mail-icon.svg";
import manUser from "../../assets/man-user.png";
import { useEffect, useState } from "react";
import { API, SERVER_URL } from "../../services/API";
import OrderCard from "../OrderCard";

const ProfileContent = ({ state }) => {
  const [transactions, setTransactions] = useState([]);

  const handlePicture = (e) => {
    var bodyForm = new FormData();

    const token = sessionStorage.getItem("token");
    bodyForm.append("profilePicture", e.target.files[0]);
    API({
      method: "PATCH",
      url: "/user/profile-picture/",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: bodyForm,
    })
      .then((response) => {
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
        setTransactions(result.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getOrder();
  }, []);

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
                src={`${SERVER_URL}/${state.user.photo}`}
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
          {transactions.length > 0 && (
            <OrderCard transactionsCustomer={transactions} />
          )}
        </div>
      </div>
    </div>
  );
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
