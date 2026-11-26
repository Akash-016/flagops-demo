import flagsmith from "./flagsmith-client.js";

export function renderLayout(page) {
  if (flagsmith.hasFeature("maintenance_mode")) {
    return { page: "maintenance" };
  }

  return {
    page,
    theme: flagsmith.hasFeature("dark_mode") ? "dark" : "light",
    banner: flagsmith.hasFeature("banner_message") ? flagsmith.getValue("banner_message") : null,
  };
}
