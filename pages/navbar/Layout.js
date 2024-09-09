import Navbar from "@/pages/navbar/index";

export default function Layout({children}){
    return(
        <div>
            <Navbar />
            {children}
        </div>
    )
}