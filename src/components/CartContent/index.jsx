import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { API, SERVER_URL, setAuthToken } from "../../services/API";
import { convertToRupiah } from "../../utils/moneyConvert";
import trash from "../../assets/trash.svg";
import styles from "./CartContent.module.css";
import { UserContext } from "../../contexts/UserContext";
import coffeBeanIcon from "../../assets/coffee-bean.png";

const CartContent = ({ cartProps }) => {
  const [carts, setCarts] = useState([]);

  const router = useHistory();

  const { dispatch } = useContext(UserContext);

  const [totalPrice, setTotalPrice] = useState(0);

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

  const handleQuantityMinus = async (index) => {
    try {
      if (+carts[index].orderQuantity === 1) {
        return;
      }

      const result = await API.patch(`/cart/${carts[index].id}`, {
        orderQuantity: +carts[index].orderQuantity - 1,
      });
      setCarts(result.data.dataAfterUpdated);
      getTotalPrice(result.data.dataAfterUpdated);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleQuatityPlus = async (index) => {
    try {
      const result = await API.patch(`/cart/${carts[index].id}`, {
        orderQuantity: +carts[index].orderQuantity + 1,
      });
      setCarts(result.data.dataAfterUpdated);
      getTotalPrice(result.data.dataAfterUpdated);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDeleteCart = async (cartId) => {
    try {
      const result = await API.delete(`/cart/${cartId}`);
      setCarts(result.data.dataAfterUpdated);
      getTotalPrice(result.data.dataAfterUpdated);
      getUser();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDeleteAllCart = async () => {
    try {
      carts.map(async (cart) => {
        const result = await API.delete(`/cart/${cart.id}`);
        setCarts(result.data.dataAfterUpdated);
        getTotalPrice(result.data.dataAfterUpdated);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalPrice = (carts) => {
    const newCarts = [...carts];

    let total = 0;

    newCarts.map(
      (cart) => (total += +cart.Product.price * +cart.orderQuantity)
    );

    setTotalPrice(total);
  };

  const handleCheckout = async () => {
    router.push(`/checkout/`);
    console.log("Sebuah checkout");
  };

  useEffect(() => {
    setCarts(cartProps);
    getTotalPrice(cartProps);
  }, [cartProps]);

  return (
    <div className={styles.content}>
      <div className={styles.leftContent}>
        <h3 className={styles.leftContentTitle}>My Cart</h3>
        <div className={styles.subtitleWrapper}>
          <p className={styles.leftContentSubtitle}>Review Your Order</p>
          <button
            className={styles.deleteAllCart}
            onClick={handleDeleteAllCart}
          >
            DELETE ALL
          </button>
        </div>
        <hr className={styles.horizontalLine} />
        {carts.map((cart, index) => {
          return (
            <div key={cart.id}>
              <div className={styles.cardItem}>
                <div className={styles.cardItemLeft}>
                  <img
                    src={`${SERVER_URL}/${cart.Product.photo}`}
                    alt="product"
                    className={styles.cardImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = coffeBeanIcon;
                    }}
                  />
                  <div className={styles.cartContent}>
                    <p className={styles.productName}>
                      {`${cart.Product.name.toUpperCase()} Beans`}
                    </p>
                    <div className={styles.quantityWrapper}>
                      <p
                        className={styles.quantityMinus}
                        onClick={() => {
                          handleQuantityMinus(index);
                        }}
                      >
                        -
                      </p>
                      <p className={styles.quantity}>{cart.orderQuantity}</p>
                      <p
                        className={styles.quantityPlus}
                        onClick={() => {
                          handleQuatityPlus(index);
                        }}
                      >
                        +
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.cardItemRight}>
                  <p className={styles.subTotal}>
                    {convertToRupiah(+cart.orderQuantity * +cart.Product.price)}
                  </p>
                  <img
                    src={trash}
                    alt="trash"
                    onClick={() => handleDeleteCart(cart.id)}
                    className={styles.trashIcon}
                  />
                </div>
              </div>
              <hr className={styles.horizontalLine} />
            </div>
          );
        })}
      </div>
      <div className={styles.rightContent}>
        <hr className={styles.horizontalLine} />

        <div className={styles.totalWrapper}>
          <p className={styles.totalTitle}>Total : </p>
          <p className={styles.total}>{convertToRupiah(totalPrice)}</p>
        </div>

        {carts.length > 0 ? (
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Proceed To Checkout
          </button>
        ) : (
          <button className={styles.checkoutButtonDisabled} disabled>
            Proceed To Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CartContent;
