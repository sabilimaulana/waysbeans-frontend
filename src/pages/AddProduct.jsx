import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AddProductContent from "../components/AddProductContent";
import AddProductPopup from "../components/AddProductPopup";
import Container from "../components/Container";
import { UserContext } from "../contexts/UserContext";
import { API, setAuthToken } from "../services/API";

const AddProduct = () => {
  const { dispatch, state } = useContext(UserContext);

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

    getUser();
  }, [dispatch]);

  if (state.user.listAs === "Seller") {
    return (
      <Container>
        <AddProductContent />
      </Container>
    );
  } else {
    return <h3>404</h3>;
  }
};

export default AddProduct;
