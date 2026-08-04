import "./Profile.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import { FaUserCircle } from "react-icons/fa";

function Profile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await api.get("/profile");

                setName(response.data.data.name);
                setEmail(response.data.data.email);
                setRole(response.data.data.role);

                console.log("Profile Data:", response.data.data);

            } catch (error) {

                console.error("Failed to fetch profile:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);


    const handleUpdateProfile = async (e) => {

        e.preventDefault();

        try {

            const response = await api.put("/profile", {
                name,
                email
            });

            setName(response.data.data.name);
            setEmail(response.data.data.email);

            alert("Profile updated successfully!");

        } catch (error) {

            console.error("Failed to update profile:", error);

            alert(
                error.response?.data?.message ||
                "Failed to update profile"
            );

        }

    };


    if (loading) {

        return (

            <Layout>

                <div className="page-container">

                    <div className="page-head">

                        <div>
                            <h1>Profile</h1>
                            <p className="page-sub">
                                Loading your profile...
                            </p>
                        </div>

                    </div>

                </div>

            </Layout>

        );

    }


    return (

        <Layout>

            <div className="page-container">

                <div className="page-head">

                    <div>

                        <h1>Profile</h1>

                        <p className="page-sub">
                            View and update your account details
                        </p>

                    </div>

                </div>


                <div className="profile-wrapper">

                    <form
                        className="profile-card"
                        onSubmit={handleUpdateProfile}
                    >

                        <div className="profile-avatar">

                            <FaUserCircle />

                            <div>

                                <h3>
                                    {name || "Your Name"}
                                </h3>

                                <p>
                                    ROLE TEST: {role}
                                </p>

                            </div>

                        </div>


                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required
                        />


                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />


                        <label>Role</label>

                        <input
                            type="text"
                            value={role}
                            readOnly
                        />


                        <button type="submit">
                            Save Changes
                        </button>


                    </form>

                </div>


            </div>

        </Layout>

    );

}

export default Profile;