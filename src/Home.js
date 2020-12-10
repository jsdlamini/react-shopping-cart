//Feature 1
import React, { useContext, useEffect, useState } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import { CartContext } from "./contexts/CartContext";
// import data from "./data.json";
import db from "./Firebase";
import Header from "./Header";
import { useStateValue } from "./StateProvider";

function Home() {
  const [products, setProducts] = useState([]);
  //const [cartItems, setcartItems] = useState([]);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const { cartItems } = useContext(CartContext);

  // const [{ basket }, dispatch] = useStateValue();

  // const [input, setInput] = useState("");
  // const [messages, setMessages] = useState([]);

  const getProductData = () => {
    db.collection("product")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setProducts(data); // array of cities objects
        // console.log(data);
      });
  };

  useEffect(() => {
    //setProducts(db.collection("products").get().orderBy("price", "desc"));

    getProductData();

    // .onSnapshot((snapshot) =>
    //   setProducts(snapshot.docs.map((doc) => doc.data()))
    // );
  }, []);

  const sortProducts = (event) => {
    // console.log(event.target.value);
    const sort = event.target.value;
    setSort(sort);
    setProducts(
      products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        )
    );
  };

  const filterProducts = (event) => {
    // console.log(event.target.value);

    if (event.target.value === "") {
      setSize(event.target.value);
      setProducts(products);
    } else {
      setSize(event.target.value);
      setProducts(
        products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        )
      );
    }

    // console.log(event.target.value);
  };

  return (
    <div className="grid-container">
      {/* <Header /> */}
      <main>
        <div className="content">
          <div className="main">
          
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            ></Filter>
     
          </div>
          <div className="products__and__cart">
            <div className="products__display">
              <Products products={products} />
            </div>

            {cartItems.length !== 0 ? (
              <div className="cart_sidebar">
                <Cart />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </main>
      <footer>All rights reserved</footer>
    </div>
  );
}

export default Home;
