import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

function RootLayout() {
    
    return (
        <div className="site-wrapper">
            <Header />
            <main>
               
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default RootLayout; 