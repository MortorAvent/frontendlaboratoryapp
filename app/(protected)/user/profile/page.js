'use client';
import { useAuth } from "@/lib/AuthContext";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

export default function ProfileForm() {
  const { user } = useAuth();
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const photoURL = e.target.photoURL.value;

    updateProfile(user, { displayName, photoURL })
      .then(() => {
        console.log("Profile updated!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    
    <form onSubmit={onSubmit}>
      {error && <div className="alert alert-error">{error}</div>}
      <input type="text" name="displayName" placeholder="Display Name" defaultValue={user?.displayName || ""} />
      <input type="email" name="email" placeholder="Email" value={user?.email || ""} readOnly />
      <input type="text" name="photoURL" placeholder="Photo URL" defaultValue={user?.photoURL || ""} />
      <button type="submit">Update Profile</button>
    </form>
  );
  
}


