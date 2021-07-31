import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CheckoutContent from "../components/CheckoutContent";
import Container from "../components/Container";
import PayPopup from "../components/PayPopup";
import { UserContext } from "../contexts/UserContext";
import { API, setAuthToken } from "../services/API";
import { convertToRupiah } from "../utils/moneyConvert";

const CheckoutPage = () => {
  // const { id } = useParams();
  const [carts, setCarts] = useState();
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

  // const handlePay = async (e) => {
  //   try {
  //     e.preventDefault();

  //     if (!name || !email || !phone || !address || !zipCode) {
  //       setWarning("Please fill all field");
  //     }
  //     var bodyForm = new FormData();

  //     bodyForm.append("name", name);
  //     bodyForm.append("email", email);
  //     bodyForm.append("address", address);
  //     bodyForm.append("zipCode", zipCode);

  //     bodyForm.append("phone", phone);
  //     bodyForm.append("total", +cart.orderQuantity * +cart.Product.price);
  //     bodyForm.append("orderQuantity", cart.orderQuantity);

  //     bodyForm.append("userId", state.user.id);
  //     bodyForm.append("productId", cart.productId);

  //     bodyForm.append("attachment", rawAttachment);

  //     const result = await API({
  //       method: "POST",
  //       url: "/transaction",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       data: bodyForm,
  //     });

  //     // router.push("/");
  //     setShowPopup(!showPopup);
  //     setWarning("");
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

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
        const result = await API.get(`/carts/`);

        setCarts(result.data.data);
        // console.log(result.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getUser();
    getCart();
  }, [dispatch]);

  console.log("cartparent", carts);

  if (carts) {
    return (
      <>
        <Container>
          <CheckoutContent cartsProps={carts} />
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
