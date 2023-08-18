import React from "react"
import { BagProps } from "../../types/interface"

const AddToBagBttn: React.FC<BagProps> = ({ bag, addToBag, productId }) => {
    const handleClick = () => {
        if (!bag.includes(productId)) {
            addToBag([...bag, productId])
        }
    }

    return (
        <button onClick={handleClick}>Add to Bag</button>
    )
}

export default AddToBagBttn
