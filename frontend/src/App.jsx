import { useEffect, useState } from "react";
import "./App.css";

import api from "./api";

import UrlForm from "./components/UrlForm";
import StatusTable from "./components/StatusTable";

function App() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await api.get("/status/");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch status data:", error);
    }
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 30000);

    return () => clearInterval(interval);
  }, []);

  const totalUrls = data.length;

  const upUrls = data.filter(
    (item) => item.status === "UP"
  ).length;

  const downUrls = data.filter(
    (item) => item.status === "DOWN"
  ).length;

  return (
    <div className="container">

      <h1 className="title">
        🚀 Uptime Monitor
      </h1>

      <p className="subtitle">
        Monitor website uptime and response times in real-time
      </p>

      {/* Dashboard Stats */}

      <div className="stats">

        <div className="stat-card">
          <h2>{totalUrls}</h2>
          <p>Total URLs</p>
        </div>

        <div className="stat-card">
          <h2>{upUrls}</h2>
          <p>UP</p>
        </div>

        <div className="stat-card">
          <h2>{downUrls}</h2>
          <p>DOWN</p>
        </div>

      </div>

      {/* URL Form */}

      <div className="card">
        <UrlForm refresh={loadData} />
      </div>

      {/* Status Table */}

      <StatusTable data={data} />

    </div>
  );
}

export default App;