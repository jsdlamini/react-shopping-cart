import React, { useState } from "react";
import formartCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Product from "./Product";
import { useStateValue } from "../StateProvider";
function Products({ products }) {


  return (
  
     <Fade bottom cascade={true}> 
      <ul className="products">
        {products.map((product) => (
       
          <Product product={product} />
        ))}
      </ul>
      </Fade> 
 
  );
}

export default Products;
