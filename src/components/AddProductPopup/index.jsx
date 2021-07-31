import styles from "./AddProductPopup.module.css";

const AddProductPopup = ({ showModal, onHide }) => {
  return (
    showModal && (
      <>
        <div className={styles.container}>
          <p className={styles.paragraph}>Add new product successfully</p>
        </div>
        <div className={styles.background} onClick={onHide}></div>
      </>
    )
  );
};

export default AddProductPopup;
