import React from "react";
import { BagProps } from "../../types/interface";
import { useMutation } from "react-query";
import axios from "axios"; // Import Axios

const QuickBuyBttn: React.FC<BagProps> = ({ bag, addToBag, productId }) => {
  const currentDomain = window.location.origin;

  const checkoutMutation = useMutation(
    () =>
      axios.post("https://api-zoooki-collab.wd49p.com/api/checkout/", {
        bag: bag,
        domain: currentDomain,
      }),
    {
      onSuccess: (response) => {
        const data = response.data;
        console.log(data);
        // Access the required data from 'data' object
        // const checkoutUrl = data.checkout_url;
        // Redirect to the checkout URL
        // window.location.href = checkoutUrl;
      },
    }
  );

  const handleCheckout = () => {
    checkoutMutation.mutate();
  };

  const handleClick = () => {
    if (!bag.includes(productId)) {
      addToBag([...bag, productId]);
    }
    handleCheckout();
  };

  return (
    <>
      <button onClick={handleClick}>Quick Buy!</button>
    </>
  );
};

export default QuickBuyBttn;
