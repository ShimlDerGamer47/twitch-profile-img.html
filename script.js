document.addEventListener("DOMContentLoaded", function () {
  const twitchAvatarImgContainer = document.getElementById(
    "twitchAvatarImgContainerId"
  );
  const twitchAvatarImg = document.getElementById("twitchAvatarImgId");

  const fontFamily = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--font-family");
  const backgroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--background-color");

  const params = new URLSearchParams(window.location.search);
  const userName = params.get("userName");

  const twitchProfileApi = `https://decapi.me/twitch/avatar/${userName}`;

  fetch(twitchProfileApi)
    .then((res) => {
      if (!res.ok)
        throw new Error(`API-Request fehlgeschlagen mit Status ${res.status}`);
      return res.text();
    })
    .then((url) => {
      const regex = /\/([a-f0-9\-]{36})-profile_image-300x300\.png$/i;
      const match = url.match(regex);

      if (match) {
        const imageId = match[1];

        if (imageId === "3b69629a-54d8-4114-8d0c-f24171e31d8c") {
          console.warn("Standardbild erkannt – Avatar bleibt leer.");
          return;
        }

        const avatarUrl = `https://static-cdn.jtvnw.net/jtv_user_pictures/${imageId}-profile_image-600x600.png`;
        twitchAvatarImg.src = avatarUrl;
        twitchAvatarImg.alt = `Twitch Profilbild von ${userName}!`;
      } else {
        console.warn("Keine gültige Bild-ID gefunden");
      }
    })
    .catch((error) => {
      console.error("Fehler beim Laden des Twitch Profil-Bild:", error);
    });

  const elementsArray = [twitchAvatarImgContainer, twitchAvatarImg];
  const eventsArray = ["copy", "keydown", "dragstart", "select"];
  const Styles = {
    fontFamily: fontFamily,
    background: backgroundColor,
    width: "600px",
    maxWidth: "600px",
    height: "600px",
    maxHeight: "600px",
    objectFit: "contain",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyItems: "center",
    justifyContent: "center",
    border: "none",
    userSelect: "none",
    cursor: "default",
    pointerEvents: "none"
  };

  elementsArray.forEach((elements) => {
    eventsArray.forEach((events) => {
      elements.addEventListener(events, (e) => {
        e.preventDefault();
      });
    });
    Object.assign(elements.style, Styles);
  });
});
