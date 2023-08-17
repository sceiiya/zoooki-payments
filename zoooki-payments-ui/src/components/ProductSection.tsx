const ProductSection = ({}) =>
{
    const products: number[] = [1, 2, 3];
    return <>
        <div>
            {products.map((_, index) => (
                <section
                    key={index}
                    className={`container d-flex productSection ${
                    index % 2 === 0 ? 'full-bleed' : ''
                }`}
                >
                    <div className={`d-flex ${
                    index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                }`}>
                        {/* ... */}
                    </div>
                </section>
            ))}
        </div>
    </>
}

export default ProductSection