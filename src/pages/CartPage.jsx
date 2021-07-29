import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "../components/Container";
import { UserContext } from "../contexts/UserContext";
import { API } from "../services/API";
import { convertToRupiah } from "../utils/moneyConvert";

const CartPage = () => {
  const router = useHistory();

  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [carts, setCarts] = useState([]);

  const { state } = useContext(UserContext);

  const handleQuantityMinus = async (index) => {
    try {
      const result = await API.patch(`/cart/${carts[index].id}`, {
        orderQuantity: +carts[index].orderQuantity - 1,
      });
      setCarts(result.data.dataAfterUpdated);
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
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDeleteCart = async (cartId) => {
    try {
      const result = await API.delete(`/cart/${cartId}`);
      setCarts(result.data.dataAfterUpdated);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCheckout = async (cartId) => {
    router.push(`/checkout/${cartId}`);
    console.log("Sebuah checkout");
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        setLoading(true);
        const result = await API.get("/carts");
        setCarts(result.data.data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error.response);
      }
    };

    getCart();
  }, []);

  return (
    <>
      <Container>
        <div>
          <h2>Review your order</h2>
          {carts.map((cart, index) => {
            console.log(cart.Product.photo);
            return (
              <div
                key={cart.id}
                style={{
                  border: "1px solid grey",
                  padding: "20px",
                  marginBottom: "20px",
                  borderRadius: "10px",
                }}
              >
                <table>
                  <thead>
                    <tr>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Delete</th>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={`http://localhost:8080/${cart.Product.photo}`}
                          alt="cart"
                          width="100"
                        />
                      </td>
                      <td>{cart.Product.name} Beans</td>
                      <td style={{ fontSize: "24px" }}>
                        <button
                          style={{ fontSize: "18px", width: "20px" }}
                          onClick={() => {
                            handleQuantityMinus(index);
                          }}
                        >
                          -
                        </button>
                        {cart.orderQuantity}
                        <button
                          style={{ fontSize: "18px", width: "20px" }}
                          onClick={() => {
                            handleQuatityPlus(index);
                          }}
                        >
                          +
                        </button>
                      </td>
                      <td>{convertToRupiah(cart.Product.price)}</td>
                      <td>
                        <button onClick={() => handleDeleteCart(cart.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </thead>
                </table>
                <table>
                  <thead>
                    <tr>
                      <th>Subtotal</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{convertToRupiah(cart.Product.price)}</td>
                      <td> {cart.orderQuantity}</td>
                      <td>
                        {convertToRupiah(
                          +cart.orderQuantity * +cart.Product.price
                        )}
                      </td>
                      <td>
                        <button onClick={() => handleCheckout(cart.id)}>
                          Checkout
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default CartPage;
