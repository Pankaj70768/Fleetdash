import "./Layout.css";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

// Shared shell (Sidebar + Navbar) for every inner page.
// Wrap any page's content with <Layout> ... </Layout> to get the
// same black + wine look and navigation as the Dashboard.
function Layout({ children }) {

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="content">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default Layout;
