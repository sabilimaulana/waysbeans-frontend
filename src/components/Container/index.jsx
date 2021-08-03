import Navbar from "../Navbar";
import styles from "./Container.module.css";

const Container = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default Container;
