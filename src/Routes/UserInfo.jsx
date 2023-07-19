import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import PropTypes from "prop-types"; // Import prop-types
import Tabs from "../components/Tabs";
import Repo from "../components/Repo";
import Events from "../components/Events";
import UsersContainer from "../components/UsersContainer";
import Loading from "../components/Loading";

const UserInfo = () => {
  const [user, setUser] = useState([]);
  const [type, setType] = useState("repos");
  const [infos, setInfos] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null); // Add error state

  const { pathname } = useLocation();
  const navigate = useNavigate();
  let BaseURL = "https://api.github.com/users";

  async function GetUserInfo() {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const res = await fetch(BaseURL + pathname);
      if (!res.ok) {
        setError("User not found"); // Set error message if response is not OK
        setLoading(false); // Stop loading
        return;
      }
      const data = await res.json();
      setUser(() => [data]);
      setLoading(false);
    } catch (err) {
      setError("An error occurred"); // Set error message if an error occurs
      setLoading(false); // Stop loading
    }
  }

  async function GetUrls() {
    setUser([]);
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const res = await fetch(BaseURL + pathname + `/${type}`);
      if (!res.ok) {
        setError("User data not available"); // Set error message if response is not OK
        setLoading(false); // Stop loading
        return;
      }
      const data = await res.json();
      setInfos(data);
      setLoading(false);
    } catch (err) {
      setError("An error occurred"); // Set error message if an error occurs
      setLoading(false); // Stop loading
    }
  }

  useEffect(() => {
    GetUserInfo();
    GetUrls();
  }, [pathname, type]);

  return (
    <div className="py-5">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-1 font-medium mx-1 
        my-4 bg-teal-600 rounded text-gray-200"
      >
        BACK
      </button>
      {error && <div>{error}</div>} {/* Display error message */}
      {user &&
        user.map((uinfo, i) => (
          <div
            key={i}
            className="flex justify-center 
                md:flex-row md:px-0 px-4 flex-col gap-10"
          >
            <img
              src={uinfo.avatar_url}
              className="w-[350] border-4 border-teal-400 
                    md:mx-0 mx-auto"
            />
            <div className="text-lg px-3 leading-10">
              <h1 className="text-3xl pb-4">{uinfo?.name}</h1>
              <h1>
                <span className="text-teal-400">Login name </span> :{" "}
                {uinfo?.login}
              </h1>
              <h1>
                <span className="text-teal-400">Followers </span> :{" "}
                {uinfo?.followers}
              </h1>
              <h1>
                <span className="text-teal-400">Following </span> :{" "}
                {uinfo?.following}
              </h1>
              <h1>
                <span className="text-teal-400">Public Repositories </span>:{" "}
                {uinfo?.public_repos}
              </h1>
              <h1>
                <span className="text-teal-400">Joined </span>:{" "}
                {new Date(uinfo?.created_at).toLocaleDateString()}
              </h1>
              <a
                href={uinfo?.html_url}
                target="_blank"
                rel="noopener noreferrer" // Add rel attribute for security
                className="text-gray-200 font-semibold rounded cursor-pointer 
                        px-4 py-1 bg-teal-600 my-3 tracking-wide"
              >
                Visit
              </a>
            </div>
          </div>
        ))}
      <div className=" flex border-b pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl">
        <Tabs type={type} setType={setType} />
      </div>
      {loading && <Loading />}
      {type === "repos" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/13 mx-auto">
          {infos && <Repo repos={infos} />}
        </div>
      )}
      {type === "received_events" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/13 mx-auto">
          {infos && <Events events={infos} />}
        </div>
      )}
      {type === "followers" && (
        <div>
          <UsersContainer users={infos} />
        </div>
      )}
    </div>
  );
};

export default UserInfo;
