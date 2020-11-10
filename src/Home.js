//Feature 1
import React, { useEffect, useState } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
// import data from "./data.json";
import db from "./Firebase";
import Header from "./Header";

function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

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

  const removeFromCart = (product) => {
    const cart_Items = cartItems.slice();
    const itemToRemove = cart_Items.filter((x) => x._id === product._id);

    if (itemToRemove[0].count > 1) {
      // For items with quantity greater than 1, just update index
      cart_Items.map((item) =>
        item._id === product._id
          ? (item.count = item.count - 1)
          : (item.count = item.count)
      );
      //Update the cartItems
      // this.setState({
      setcartItems(cart_Items);
      // });
    } else {
      //  this.setState({
      setcartItems(cart_Items.filter((x) => x._id !== product._id)); // For items with quantity== 1,  remove item
      // });
    }
  };
  const addToCart = (product) => {
    const cart_Items = cartItems.slice(); //Copies the current cartItems in the Application state

    let alreadyInCart = false;
    cart_Items.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cart_Items.push({ ...product, count: 1 }); //Adds new instance of Product with a new field called count set to 1, the ...product copies the fields of the product
    }
    setcartItems(cart_Items);
  };

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
            {/* <input type = 'text'  onChange={this.typedTextProducts}  ></input> */}
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            ></Filter>
            {/* {console.log("products, ", products)} */}
            <Products products={products} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            {" "}
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />{" "}
          </div>
        </div>
      </main>
      <footer>All rights reserved</footer>
    </div>
  );
}

export default Home;
