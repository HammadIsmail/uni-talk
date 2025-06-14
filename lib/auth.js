export async function verifySession() {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("verifySession: No token found in localStorage");
      return null;
    }

    const response = await fetch(
      "https://uni-talk-backend-production.up.railway.app/api/auth/verify",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        cache: "no-store"
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("verifySession: Invalid token response:", errorText);
      return null;
    }

    const data = await response.json();
    console.log("verifySession: Success, user data:", data);

    if (!data.success || !data.user) {
      console.log("verifySession: Invalid response structure");
      return null;
    }

    return data;
  } catch (error) {
    console.error("verifySession: Error during verification:", error);
    return null;
  }
}

