import { useEffect } from "react";
import styles from "./TransactionDetailModal.module.css";
import OrderCard from "../OrderCard";
import { convertToRupiah } from "../../utils/moneyConvert";
import { API, SERVER_URL } from "../../services/API";
import QRCode from "react-qr-code";

const TransactionDetailModal = ({ showModal, onHide, transactionData }) => {
  // const [user, setUser] = useState({});

  const handleComplete = async (transactionId) => {
    try {
      await API.patch(`/transaction/${transactionId}`, {
        status: "Completed",
      });

      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

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
              {transactionData.attachment ? (
                <img
                  src={`${SERVER_URL}/${transactionData.attachment}`}
                  alt="attachment"
                  className={styles.attachmentImage}
                />
              ) : (
                <QRCode
                  value={`${SERVER_URL}/api/v1/transaction/${transactionData.id}`}
                  size={500}
                  bgColor="#f7e6da"
                />
              )}
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
                  {transactionData.status === "On The Way" && (
                    <div className={styles.dataSection}>
                      <p>Is this transaction completed? </p>
                      <button
                        className={styles.buttonComplete}
                        onClick={() => handleComplete(transactionData.id)}
                      >
                        Complete
                      </button>
                    </div>
                  )}
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
