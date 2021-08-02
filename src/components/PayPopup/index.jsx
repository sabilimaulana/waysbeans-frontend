import styles from "./PayPopup.module.css";

const PayPopup = ({ showModal, onHide }) => {
  return (
    showModal && (
      <>
        <div className={styles.container}>
          <p className={styles.paragraph}>
            Thank you for ordering in us, please wait 1 x 24 hours to verify you
            order
          </p>
        </div>
        <div className={styles.background} onClick={onHide}></div>
      </>
    )
  );
};

export default PayPopup;
