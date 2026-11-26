import flagsmith from "./flagsmith-client.js";
import { legacySearch, vectorSearch } from "./search-backends.js";

export function search(query) {
  return flagsmith.hasFeature("new_search") ? vectorSearch(query) : legacySearch(query);
}
