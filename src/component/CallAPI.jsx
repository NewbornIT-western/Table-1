import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://api.restful-api.dev/objects";

function CallAPI() {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        setPhones(res.data);
      })
  }, []);

  return phones;
}

export default CallAPI;
