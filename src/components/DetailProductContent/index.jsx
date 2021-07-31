import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { API } from "../../services/API";
import { convertToRupiah } from "../../utils/moneyConvert";
import styles from "./DetailProductContent.module.css";

const DetailProductContent = ({ product }) => {
  const router = useHistory();
  const { id } = useParams();

  const { state } = useContext(UserContext);

  const handleAddToCart = async () => {
    try {
      await API.post("/cart", {
        userId: state.user.id,
        productId: id,
        orderQuantity: 1,
      });

      router.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.leftContent}>
        <img
          className={styles.productImage}
          src={product.photo}
          alt="product"
        />
      </div>
      <div className={styles.rightContent}>
        <h3 className={styles.productName}>
          {product.name.toUpperCase()} Beans
        </h3>
        <p className={styles.stock}>{`Stock : ${product.stock}`}</p>

        <div className={styles.descriptionBox}>
          <p className={styles.description}>{product.description}</p>
        </div>
        <p className={styles.price}>{convertToRupiah(product.price)}</p>

        {state.isLogin ? (
          <button className={styles.activeAddCart} onClick={handleAddToCart}>
            Add Cart
          </button>
        ) : (
          <button className={styles.disableAddCart} disabled>
            Add Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailProductContent;
