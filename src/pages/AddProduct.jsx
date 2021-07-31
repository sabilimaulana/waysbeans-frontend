import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AddProductContent from "../components/AddProductContent";
import AddProductPopup from "../components/AddProductPopup";
import Container from "../components/Container";
import { UserContext } from "../contexts/UserContext";
import { API, setAuthToken } from "../services/API";

const AddProduct = () => {
  const { id } = useParams();
  const [cart, setCart] = useState();
  const [rawPhoto, setRawPhoto] = useState();

  //input
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [warning, setWarning] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const router = useHistory();

  const { dispatch, state } = useContext(UserContext);

  const handleAddProduct = async (e) => {
    try {
      e.preventDefault();

      if (!name || !stock || !price || !description) {
        setWarning("Please fill all field");
      }
      var bodyForm = new FormData();

      bodyForm.append("name", name);
      bodyForm.append("stock", stock);
      bodyForm.append("price", price);
      bodyForm.append("description", description);
      bodyForm.append("photo", rawPhoto);

      const result = await API({
        method: "POST",
        url: "/product",
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

  if (state.user.listAs === "Seller") {
    return (
      <Container>
        <AddProductContent />
      </Container>
    );
    // return (
    //   <>
    //     <Container>
    //       <h2>Shipping</h2>
    //       <form action="">
    //         <label htmlFor="">Name</label>
    //         <br />
    //         <input
    //           type="text"
    //           onChange={(e) => {
    //             setName(e.target.value);
    //           }}
    //           value={name}
    //           required
    //         />
    //         <br />

    //         <label htmlFor="">Stock</label>
    //         <br />
    //         <input
    //           type="number"
    //           onChange={(e) => {
    //             setStock(e.target.value);
    //           }}
    //           value={stock}
    //           required
    //         />
    //         <br />

    //         <label htmlFor="">Price</label>
    //         <br />
    //         <input
    //           type="number"
    //           onChange={(e) => {
    //             setPrice(e.target.value);
    //           }}
    //           value={price}
    //         />
    //         <br />

    //         <label htmlFor="">Description</label>
    //         <br />
    //         <textarea
    //           name=""
    //           id=""
    //           cols="30"
    //           rows="10"
    //           onChange={(e) => {
    //             setDescription(e.target.value);
    //           }}
    //           value={description}
    //         ></textarea>

    //         <br />

    //         <label htmlFor="">Photo</label>
    //         <br />
    //         <input
    //           type="file"
    //           onChange={(e) => {
    //             setRawPhoto(e.target.files[0]);
    //           }}
    //         />

    //         <br />

    //         <p style={{ color: "red" }}>{warning}</p>

    //         <input
    //           type="submit"
    //           value="Add Product"
    //           onClick={handleAddProduct}
    //         />
    //       </form>
    //     </Container>
    //     <AddProductPopup
    //       showModal={showPopup}
    //       onHide={() => {
    //         setShowPopup(false);
    //         router.push("/");
    //       }}
    //     />
    //   </>
    // );
  } else {
    return <h3>404</h3>;
  }
};

export default AddProduct;
