import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer, Home, Shop, ClothPage, Cart, UserPage } from ".."

export const Layout = () => {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path='cloth' element={<ClothPage />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='user' element={<UserPage />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>)
}