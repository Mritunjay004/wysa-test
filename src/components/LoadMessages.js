import { useEffect, useState } from "react";
import "./switcher.scss";

function LoadMessages(props) {
  let divv = document.createElement("div");
  divv.className = "content-box";
  let { messages } = props;

  // Default to the first message passed
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Move on to the next message every `n` milliseconds
    let timeout;
    if (messageIndex < messages.length) {
      timeout = setTimeout(() => {
        setMessageIndex(messageIndex + 1);
        divv.innerHTML = `<p>${messages[messageIndex]}</p>`;
        document.getElementById("content").append(divv);
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [messageIndex]);
}

export default LoadMessages;
