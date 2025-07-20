document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("twitchAvatarImgContainerId");
  const img = document.getElementById("twitchAvatarImgId");

  const params = new URLSearchParams(window.location.search);
  const userName = params.get("userName");
  if (!userName) {
    console.error("Kein Twitch-Benutzername übergeben!");
    return;
  }

  fetch(`https://decapi.me/twitch/avatar/${userName}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Status ${res.status}`);

      return res.text();
    })
    .then((url) => {
      const m = url.match(/\/([a-f0-9\-]{36})-profile_image-300x300\.png$/i);
      if (!m) {
        console.warn("Keine gültige Bild-ID gefunden");

        return;
      }

      const imageId = m[1];
      if (imageId === "3b69629a-54d8-4114-8d0c-f24171e31d8c") {
        console.warn("Standardbild erkannt – Avatar bleibt leer.");

        return;
      }

      img.src = `https://static-cdn.jtvnw.net/jtv_user_pictures/${imageId}-profile_image-600x600.png`;

      img.alt = `Twitch Profilbild von ${userName}`;
    })
    .catch((err) => {
      console.error("Fehler beim Laden des Twitch Profil-Bild:", err);
    });
});
