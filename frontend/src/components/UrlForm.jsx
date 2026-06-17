import { useState } from "react";
import api from "../api";

function UrlForm({ refresh }) {

  const [url, setUrl] = useState("");

  const submit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/urls/", {
        url
      });

      setUrl("");

      refresh();

    } catch (error) {

      alert("Failed to add URL");

      console.error(error);
    }
  };

  return (

    <form
      onSubmit={submit}
      className="form-container"
    >

      <input
        type="text"
        placeholder="Enter website URL (https://example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <button type="submit">
        + Add URL
      </button>

    </form>

  );
}

export default UrlForm;