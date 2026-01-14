export async function generateApiKey() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/apikey/generate", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to generate API key");
  }

  return data;
}

export async function fetchUsage(apiKey) {
  const res = await fetch("http://localhost:5000/api/data", {
    headers: {
      "x-api-key": apiKey
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch usage");
  }

  return data;
}
