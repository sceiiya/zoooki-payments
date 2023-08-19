import { Helmet } from "react-helmet-async"
import HeroSection from "../components/HeroSection"
import ProductSection from "../components/ProductSection"

const Home = () =>
{   
    return <>
        <Helmet>
            <title>Zoooki Collabs</title>
            <meta name="description" content="Zooki collabs we sell anime merchandises and clothes partnered to our brand." />
            <link rel="canonical" href="/home" data-rh="true" />
        </Helmet>
        <div className="">
        <HeroSection/>
        </div>
        <ProductSection />
        <footer>
            <a href="https://github.com/sceiiya">
                Designed and Developed by Sceiiya
            </a>
        </footer>
    </>
}

export default Home