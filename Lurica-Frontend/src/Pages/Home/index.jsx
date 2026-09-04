import Navbar from "../../components/Navbar.jsx";
import Header from "./components/Header.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Reviews from "./components/Reviews.jsx";
import Products from "./components/Products.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function HomePage(){
    return (
        <div>
            <Navbar />
            <Header />
            <AboutUs />
            <Reviews />
            <Products />
            <Faq />
            <Contact />
            <Footer />
        </div>
    )
}