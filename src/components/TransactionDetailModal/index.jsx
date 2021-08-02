import { useEffect } from "react";
import styles from "./TransactionDetailModal.module.css";
import OrderCard from "../OrderCard";
import { convertToRupiah } from "../../utils/moneyConvert";

const TransactionDetailModal = ({ showModal, onHide, transactionData }) => {
  // const [user, setUser] = useState({});

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  return (
    showModal && (
      <>
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.leftContent}>
              <img
                src={`http://localhost:8080/${transactionData.attachment}`}
                alt="attachment"
                className={styles.attachmentImage}
              />
            </div>
            <div className={styles.rightContent}>
              <h2 className={styles.rightContentTitle}>Transaction Detail</h2>

              <div className={styles.transactionDetail}>
                <div className={styles.buyerDetail}>
                  <h3 className={styles.sectionTitle}>Buyer Account</h3>
                  <hr className={styles.horizontalLine} />

                  <div className={styles.dataSection}>
                    <p>Fullname : </p>
                    <p>{`${transactionData.User.fullname}`}</p>
                  </div>
                  <div className={styles.dataSection}>
                    <p>Email : </p>
                    <p>{`${transactionData.User.email}`}</p>
                  </div>
                </div>

                <div className={styles.shippingDetail}>
                  <h3 className={styles.sectionTitle}>Shipping Detail</h3>
                  <hr className={styles.horizontalLine} />
                  <div className={styles.dataSection}>
                    <p>Name : </p>
                    <p>{`${transactionData.name}`}</p>
                  </div>{" "}
                  <div className={styles.dataSection}>
                    <p>Email : </p>
                    <p>{`${transactionData.email}`}</p>
                  </div>
                  <div className={styles.dataSection}>
                    <p>Phone : </p>
                    <p>{`${transactionData.phone}`}</p>
                  </div>
                  <div className={styles.dataSection}>
                    <p>Address : </p>
                    <p style={{ textAlign: "right", width: "80%" }}>
                      {`${transactionData.address}`}
                    </p>
                  </div>
                  <div className={styles.dataSection}>
                    <p>Zip Code : </p>
                    <p>{`${transactionData.zipCode}`}</p>
                  </div>
                  <div className={styles.dataSection}>
                    <p>Status : </p>
                    <p>{`${transactionData.status}`}</p>
                  </div>
                  <div className={styles.dataSection}>
                    <p>Total : </p>
                    <p>{`${convertToRupiah(transactionData.total)}`}</p>
                  </div>
                </div>

                <div className={styles.productsDetail}>
                  <h3 className={styles.sectionTitle}>Products Detail</h3>
                  <hr className={styles.horizontalLine} />

                  <OrderCard
                    transactionOwner={transactionData}
                    isTransactionModal
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.background}
          onClick={() => {
            onHide();
          }}
        ></div>
      </>
    )
  );
};

export default TransactionDetailModal;
