import { FaUserCircle } from "react-icons/fa";
import Nav from "../components/Nav";
import UpdateProfileDialog from "../components/profile/UpdateProfile";
import { useAuth } from "../context/auth/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="bg-slateDark-100 h-screen">
      <Nav />

      <div className="flex flex-col items-center mt-24">
        <div className="bg-slateDark-300 w-1/5 h-96 flex flex-col items-center justify-center rounded-md shadow-md">
          <div className="pt-6">
            {user.avatarUrl ? (
              <img
                className="w-24 h-24 object-cover rounded-full mb-1 mt-1"
                alt="Profile"
                src={user.avatarUrl}
              />
            ) : (
              <FaUserCircle size={96} />
            )}
          </div>

          <div className="flex flex-col justify-center items-center mt-3">
            <h1 className="text-slateDark-1002 font-semibold text-xl">
              {user.username}
            </h1>
            <p className="text-slateDark-1002 text-lg">{user.email}</p>
          </div>

          <UpdateProfileDialog />
        </div>
      </div>
    </div>
  );
};

export default Profile;
