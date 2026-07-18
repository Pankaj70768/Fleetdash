import "./Profile.css";


function Profile(){

return (

<div className="profile">

<h2>Profile</h2>


<div className="profile-card">

<label>Name</label>
<input 
type="text"
placeholder="Enter your name"
/>


<label>Email</label>
<input
type="email"
placeholder="Enter your email"
/>


<label>Phone</label>
<input
type="text"
placeholder="Enter your phone"
/>


<button>
Save Changes
</button>


</div>

</div>

);

}


export default Profile;