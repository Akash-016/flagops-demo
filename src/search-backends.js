// Sample app code: the two search implementations src/search.js switches between.

export const legacySearch = (query) => ({ engine: "legacy", query, results: [] });

export const vectorSearch = (query) => ({ engine: "vector", query, results: [] });
