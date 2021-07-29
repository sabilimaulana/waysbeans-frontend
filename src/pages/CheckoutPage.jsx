import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "../components/Container";
import PayPopup from "../components/PayPopup";
import { UserContext } from "../contexts/UserContext";
import { API, setAuthToken } from "../services/API";
import { convertToRupiah } from "../utils/moneyConvert";

const CheckoutPage = () => {
  const { id } = useParams();
  const [cart, setCart] = useState();
  const [rawAttachment, setRawAttachment] = useState();

  //input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [warning, setWarning] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const router = useHistory();

  const { dispatch, state } = useContext(UserContext);

  const handlePay = async (e) => {
    try {
      e.preventDefault();

      if (!name || !email || !phone || !address || !zipCode) {
        setWarning("Please fill all field");
      }
      var bodyForm = new FormData();

      bodyForm.append("name", name);
      bodyForm.append("email", email);
      bodyForm.append("address", address);
      bodyForm.append("zipCode", zipCode);

      bodyForm.append("phone", phone);
      bodyForm.append("total", +cart.orderQuantity * +cart.Product.price);
      bodyForm.append("orderQuantity", cart.orderQuantity);

      bodyForm.append("userId", state.user.id);
      bodyForm.append("productId", cart.productId);

      bodyForm.append("attachment", rawAttachment);

      const result = await API({
        method: "POST",
        url: "/transaction",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: bodyForm,
      });

      // router.push("/");
      setShowPopup(!showPopup);
      setWarning("");
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
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

    const getCart = async () => {
      try {
        const result = await API.get(`/cart/${id}`);

        setCart(result.data.cart);
      } catch (error) {
        console.log(error.response);
      }
    };

    getUser();
    getCart();
  }, [id, dispatch]);

  console.log(cart);

  if (cart) {
    return (
      <>
        <Container>
          <h2>Shipping</h2>
          <form action="">
            <label htmlFor="">Name</label>
            <br />
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
            />
            <br />

            <label htmlFor="">Email</label>
            <br />
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
            <br />

            <label htmlFor="">Phone</label>
            <br />
            <input
              type="number"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              value={phone}
            />
            <br />

            <label htmlFor="">Zip Code</label>
            <br />
            <input
              type="number"
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
              value={zipCode}
            />
            <br />

            <label htmlFor="">Address</label>
            <br />
            <textarea
              name="address"
              id=""
              cols="30"
              rows="10"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
            ></textarea>
            <br />

            <label htmlFor="">Attachment</label>
            <br />
            <input
              type="file"
              onChange={(e) => {
                setRawAttachment(e.target.files[0]);
              }}
            />

            <br />
            <h2>Order Detail</h2>
            <img
              src={`http://localhost:8080/${cart.Product.photo}`}
              alt="product"
            />
            <p>Name: {cart.Product.name}</p>
            <p>Price: {convertToRupiah(cart.Product.price)}</p>
            <p>Quantity: {cart.orderQuantity}</p>
            <p>
              Total:
              {convertToRupiah(+cart.orderQuantity * +cart.Product.price)}
            </p>

            <p style={{ color: "red" }}>{warning}</p>

            <input type="submit" value="Pay" onClick={handlePay} />
          </form>
        </Container>
        <PayPopup
          showModal={showPopup}
          onHide={() => {
            setShowPopup(false);
            router.push("/");
          }}
        />
      </>
    );
  } else {
    return <h3>404</h3>;
  }
};

export default CheckoutPage;
