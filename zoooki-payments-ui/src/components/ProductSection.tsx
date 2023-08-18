import { useQuery } from "react-query"
import { FaTwitter } from 'react-icons/fa'

// import imgBiboo from "../assets/images/bibooZeroEgg.jpg"
// import imgShiorin from "../assets/images/shioriSaiha.jpg"
// import imgFuwamoco from "../assets/images/fuwamocoQ12.jpg"
// import imgBijou from "../assets/images/bibooDecrilus.jpg"

import { product } from "../types/interface"

const ProductSection = () =>
{
    const { data: products, error, isLoading } = useQuery('products', async () => {
        const response = await fetch('https://api-zoooki-collab.wd49p.com/api/products');
        const data = await response.json();
        return data;
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="w-100 d-flex h-66 text-center justify-content-center align-items-center">Error: something went wrong</div>;
    }
    //     {
    //         collection: "T-shirt Collection: Emotion Elegance Series",
    //         title: "Radiant Embrace Tee",
    //         type: "T-shirt",
    //         price: 2500,
    //         stocks: 900,
    //         sold: 0,
    //         description: "Immerse yourself in the brilliance of emotions with the Radiant Embrace Tee, a design inspired by Koseki Bijou. This shirt captures the essence of Bijou's enchanting persona, blending elegance and emotion seamlessly.",
    //         image: imgBiboo,
    //         artist: "E G G",
    //         artistlink: "https://twitter.com/zero0ix"
    //     },
    //     {
    //         collection: "Notebook Collection: Chronicles of Novella Notebook",
    //         title: "Whimsical Tales: Shiori's Chronicles Notebook Set",
    //         type: "Notebook Set",
    //         price: 3000,
    //         stocks: 900,
    //         sold: 0,
    //         description: "Chronicle your own tales with the Chronicles of Novella Notebook set. Each notebook is adorned with Shiori Novella's favorite stories, allowing you to pen your thoughts and dreams within the pages of history.",
    //         image: imgShiorin,
    //         artist: "saiha",
    //         artistlink: "https://twitter.com/318_Saiha"
    //     },
    //     {
    //         collection: "Accessories: Abyssgard Chaos Charms",
    //         title: "Twins' Playful Enchantment",
    //         type: "Acrylic Standee",
    //         price: 4000,
    //         stocks: 900,
    //         sold: 0,
    //         description: "Channel the whimsical chaos of the Abyssgard twins with the Whimsical Chaos Charms. These adorable accessories showcase their energetic personalities and are perfect for adding a touch of charm to your belongings.",
    //         image: imgFuwamoco,
    //         artist: "Q12",
    //         artistlink: "https://twitter.com/q12_flamingo"
    //     },
    //     {
    //         collection: "Keychain: Radiant Emotion Keychain",
    //         title: "Twins' Playful Enchantment",
    //         type: "Keychain",
    //         price: 2000,
    //         stocks: 900,
    //         sold: 0,
    //         description: "Carry the brilliance of emotions with the Radiant Emotion Keychain, inspired by Koseki Bijou. This limited-edition keychain features a dazzling crystalline pendant, reflecting Bijou's radiant persona. Elevate your daily life with this enchanting collector's piece that captures the magic of emotions.",
    //         image: imgBijou,
    //         artist: "Decrilus",
    //         artistlink: "https://twitter.com/decrilus"
    //     }
    // ];

    return (
        <div>
            {products.map((product: product, index:number) => {
                const {
                    id,
                    image,
                    title,
                    collection,
                    type,
                    price,
                    stocks,
                    sold,
                    description,
                    artist,
                    artistlink
                } = product
    
                return (
                    <section
                        key={index}
                        className={`container d-flex productSection ${
                            index % 2 === 0 ? 'full-bleed' : ''
                        }`}
                    >
                        <div className={'p-4 cont'}>
                            <div className="productImage">
                                <img src={`/src/assets/images/${image}`} alt='product' height="100%" width="100%" />
                            </div>
                            <div className="productDetails">
                                <h2>{title}</h2>
                                <h3>{collection}</h3>
                                <p>Artist:&nbsp;<a href={artistlink}>&nbsp;{id}<FaTwitter />&nbsp;{artist}</a></p> <p>Stocks: {stocks}</p>
                                <p>Type: {type}</p> <p>Sold: {sold}</p>
                                <p>Price: ¥&nbsp;{price}</p>
                                <p>{description}</p>
                                <button>Add to Bag</button>
                                <button>Buy Now</button>
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

export default ProductSection