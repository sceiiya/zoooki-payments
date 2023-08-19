import React from "react";
import { BagProps } from "../../types/interface";
import { useMutation } from "react-query";
import axios from "axios";

const QuickBuyBttn: React.FC<BagProps> = ({ bag, addToBag, productId }) => {
  const currentDomain = window.location.origin;

  const checkoutMutation = useMutation(
    async () => {
      // Fetch the CSRF token from your Laravel backend
      const response = await axios.get("https://api-zoooki-collab.wd49p.com/api/sanctum/csrf-cookie");
      
      // Include the CSRF token in the headers of the POST request
      const headers = {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": response.data, // Replace with your token field name
        "Content-Type": "application/json",
      };

      // Make the actual POST request
      const postResponse = await axios.post(
        "https://api-zoooki-collab.wd49p.com/api/checkout/",
        {
          bag: bag,
          domain: currentDomain,
        },
        { headers }
      );

      return postResponse.data;
    },
    {
      onSuccess: (data) => {
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
