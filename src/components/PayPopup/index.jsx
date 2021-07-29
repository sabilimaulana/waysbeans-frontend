import styles from "./PayPopup.module.css";

const PayPopup = ({ showModal, onHide }) => {
  return (
    showModal && (
      <>
        <div className={styles.container}>
          <p className={styles.paragraph}>
            Pembayaran Anda Akan di Konfirmasi dalam 1 x 24 Jam Untuk melihat
            pesanan Klik{" "}
            <button onClick={() => window.location.reload()}>Disini</button>{" "}
            Terimakasih
          </p>
        </div>
        <div className={styles.background} onClick={onHide}></div>
      </>
    )
  );
};

export default PayPopup;
