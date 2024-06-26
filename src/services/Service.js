const Route = "https://api.moneybook.heis-design.ch";

// GET

//  Bilanz anzeigen

export const BilanzAusgabe = async () => {
  try {
    const response = await fetch(`${Route}/api/eintrag`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const eingaenge = data.eintrag;
    const einnahmen = eingaenge.filter((eintrag) => eintrag.typ === "Einnahme");
    const ausgaben = eingaenge.filter((eintrag) => eintrag.typ === "Ausgabe");

    return { einnahmen, ausgaben };
  } catch (error) {
    console.error("Fehler beim Laden der Daten:", error);
    throw error;
  }
};

//  Logout

export const Logout = async (navigate) => {
  try {
    const response = await fetch(`${Route}/api/user/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log(response.status);
    if (response.status === 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure";
      document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure";
      navigate("/");
    } else {
      console.log("Logout fehler");
    }
  } catch (error) {
    console.error("Fehler beim Ausloggen:", error);
    throw error;
  }
};

//  Einträge anzeigen

export const eintragAusgabe = async () => {
  try {
    const response = await fetch(`${Route}/api/eintrag`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Anzeigen", error);
    throw error;
  }
};

// User anzeigen

export const userAnzeigen = async () => {
  try {
    const response = await fetch(`${Route}/api/user/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Fehler beim Abrufen des Benutzernamens");
    }
    const data = await response.json();
    return data.username;
  } catch (error) {
    console.error("Fehler beim Abrufen des Benutzernamens:", error);
    throw error;
  }
};

// POST

// Einträge erfassen

export const EintragErfassen = async (inputs) => {
  try {
    const response = await fetch(`${Route}/api/eintrag`, {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.error("Fehler beim erfassen des Eintrags");
    throw error;
  }
};

// User Einloggen

export const Einloggen = async (inputs) => {
  try {
    const response = await fetch(`${Route}/api/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email: inputs.email,
        password: inputs.password,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};

// User erfassen

export const UserErfassen = async (inputs) => {
  try {
    const response = await fetch(`${Route}/api/user/register`, {
      method: "POST",
      body: JSON.stringify({
        userName: inputs.userName,
        email: inputs.email,
        password: inputs.password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("Fehler beim erfassen des Users");
    throw error;
  }
};

// DELETE

// Eintäge löschen

export const EintragLoeschen = async (id) => {
  try {
    await fetch(`${Route}/api/eintrag/${id}`, {
      method: "DELETE",
    });
    return { id };
  } catch (error) {
    console.error("Fehler beim Löschen des Eintrags", error);
    throw error;
  }
};
