import React from "react"
import { BagProps } from "../../types/interface"
import { useMutation } from "react-query";

const QuickBuyBttn: React.FC<BagProps> = ({bag, addToBag, productId}) =>
{
    const currentDomain = window.location.origin

    const checkoutMutation = useMutation(
        () =>
        fetch('/api/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bag: bag, domain: currentDomain }),
        }),
        {
            onSuccess: async (data) => {
              const responseJson = await data.json()
              const stripeCheckoutUrl = responseJson.checkout_url
              // Redirect to the checkout URL
              window.location.href = stripeCheckoutUrl
            },
        }
    );

    const handleCheckout = () => {
        checkoutMutation.mutate()
    }

    const handleClick = () => {
        if (!bag.includes(productId)) {
            addToBag([...bag, productId])
        }
        handleCheckout()
    }

    return <>
        <button onClick={handleClick} >Quick Buy!</button>
    </>
}

export default QuickBuyBttn