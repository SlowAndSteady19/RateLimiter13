import { useEffect, useState } from "react";
import { generateApiKey, fetchUsage } from "../services/api";

function Dashboard() {
  const [apiKey, setApiKey] = useState("");
  const [usage, setUsage] = useState(null);
  const [error, setError] = useState("");

  const handleGenerateKey = async () => {
    try {
      setError("");
      const data = await generateApiKey();
      setApiKey(data.apiKey);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!apiKey) return;

    const loadUsage = async () => {
      try {
        const data = await fetchUsage(apiKey);
        setUsage(data.usage);
      } catch (err) {
        setError(err.message);
      }
    };

    loadUsage();
  }, [apiKey]);

  return (
    <div className="page-center">
      <div className="card">
        <h2>Dashboard</h2>

        <p><strong>API Key</strong></p>

        {apiKey ? (
          <p style={{ wordBreak: "break-all" }}>{apiKey}</p>
        ) : (
          <p>No API key generated</p>
        )}

        <button
          className="primary-btn"
          onClick={handleGenerateKey}
          style={{ marginTop: "12px" }}
        >
          Generate API Key
        </button>

        {usage && (
          <>
            <hr style={{ margin: "20px 0" }} />

            <p><strong>Rate Limit</strong></p>
            <p>Limit: {usage.limit}</p>
            <p>Used: {usage.currentCount}</p>
            <p>Remaining: {usage.remaining}</p>
            <p>Resets in: {usage.resetIn}s</p>
          </>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Dashboard;
