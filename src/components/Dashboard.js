import { useEffect, useState } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";

import "./Dashboard.css";
import "./switcher.scss";
import LoadMessages from "./LoadMessages";

function Dashboard() {
  //state
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [loading, setLoading] = useState(true);
  const [themes, setThemes] = useState([]);
  const [item, setItem] = useState({ title: "", image: "" });

  const messages = [
    "I'm Wysa - an AI chatbot built by therapists.",
    "I'm here to understand your concerns and connect you with the best resources available to support you",
    "Can I help?",
  ];

  useEffect(() => {
    const currtheme = localStorage.getItem("theme-color");
    // if found theme in local storage, set it
    if (currtheme) {
      setColorTheme(currtheme);
    }
  }, []);

  // set theme
  const handleClick = (theme) => {
    setColorTheme(theme);
    localStorage.setItem("theme-color", theme);
  };

  // for getting the themes from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://wysa-test.herokuapp.com/"
        );
        setThemes(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  //   for handling the file upload
  const onSubmitHandler = (e) => {
    e.preventDefault();
    document.getElementById("form-box").innerHTML =
      "Image Uploaded Successfully";
  };

  return (
    <>
      {loading && <div>Loading</div>}
      {!loading && (
        <>
          <div id="content" className={`App ${colorTheme}`}>
            <div className="theme-options">
              {themes.map((item) => (
                <div
                  id={`${item}`}
                  onClick={() => handleClick(`${item}`)}
                  className={`${colorTheme === item ? "active" : ""}`}
                />
              ))}
            </div>
            <div className="content-box">
              <p>Hi there! 👋</p>
            </div>
            {/* component to display messages with 1sec delay */}
            <LoadMessages messages={messages} />
          </div>

          <div id="form-box">
            {/* for submitting image from the user we will get the image from the form and later we can specify with using onSubmit where to store the image */}
            <form action="" onSubmit={onSubmitHandler}>
              <input
                type="text"
                className="input-field"
                onChange={(e) => setItem({ ...item, title: e.target.value })}
              />
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) => setItem({ ...item, image: base64 })}
              />
              <div className="right-align">
                <button className="btn">submit</button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
