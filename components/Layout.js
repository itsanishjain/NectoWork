import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({children}) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
