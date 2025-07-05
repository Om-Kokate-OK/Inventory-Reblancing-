const BASE_URL = "http://localhost:8000";

export async function fetchDemandForecast() {
  const res = await fetch("http://localhost:8000/forecast");
  if (!res.ok) throw new Error("Failed to fetch demand forecast");
  return res.json();
}

export async function fetchTransferRecommendations() {
  const res = await fetch("http://localhost:8000/transfer-plan");
  if (!res.ok) throw new Error("Failed to fetch transfer recommendations");
  return res.json();
}
