import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { API, setAuthToken } from "../../services/API";
import { convertToRupiah } from "../../utils/moneyConvert";
import styles from "./DetailProductContent.module.css";
import coffeBeanIcon from "../../assets/coffee-bean.png";

const DetailProductContent = ({ product }) => {
  const { id } = useParams();

  const { state, dispatch } = useContext(UserContext);

  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        setAuthToken(token);
        const user = await API.get("/user/profile");
        dispatch({
          type: "LOGIN",
          payload: {
            user: user.data.data.user,
          },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleAddToCart = async () => {
    try {
      await API.post("/cart", {
        userId: state.user.id,
        productId: id,
        orderQuantity: 1,
      });

      getUser();

      // window.location.reload();
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
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = coffeBeanIcon;
          }}
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
