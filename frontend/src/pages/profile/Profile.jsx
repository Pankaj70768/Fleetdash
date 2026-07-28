import "./Profile.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

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
        return <p>Loading profile...</p>;
    }


    return (

        <div className="profile">

            <h2>Profile</h2>

            <form
                className="profile-card"
                onSubmit={handleUpdateProfile}
            >

                <label>Name</label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />


                <label>Email</label>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />


                <label>Role</label>

                <input
                    type="text"
                    value={role}
                    disabled
                />


                <button type="submit">
                    Save Changes
                </button>

            </form>

        </div>

    );

}

export default Profile;