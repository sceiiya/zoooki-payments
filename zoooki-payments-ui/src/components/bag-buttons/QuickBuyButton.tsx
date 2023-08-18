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
              const checkoutUrl = responseJson.checkout_url
              // Redirect to the checkout URL
              window.location.href = checkoutUrl
            },
        }
    );


//     const checkout = async (bag: number[], currentDomain: string): Promise<any> =>
// {
//     let bagged: number[] = [...bag]
//     if(!bag.includes(productId)) {
//         bagged = [...bag, productId];
//       }

//       const axiosInstance = axios.create({
//         baseURL: 'http://127.0.0.1:8000/api/checkout', 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       // Send a POST request
//       const data = {
//         bag: bag,
//         domain: currentDomain
//       }

//       axiosInstance.post('https://api-zoooki-collab.wd49p.com/api/checkout', data)
//         .then(response => {
//             console.log(response)
//           // Handle the response data
//         })
//         .catch(error => {
//             console.log(error)
//           // Handle errors
//         });
// }

//     const checkoutMutation = useMutation({
        
//         mutationFn: () => checkout(bag, currentDomain),
//         onSuccess: (data) => {
//         console.log(data);
//         // const stripeCheckoutUrl = data.checkout_url;
//         // Redirect to the checkout URL
//         // window.location.href = stripeCheckoutUrl;
//       },
//     }
//   );



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