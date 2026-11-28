// Sample app code: the files in src/ show FlagOps where each flag is used. This small client
// stands in for the Flagsmith JavaScript SDK (https://docs.flagsmith.com/clients/javascript):
// it loads an environment's flags once at startup, then answers from memory.

const flags = new Map();

export default {
  async init(environmentKey, apiUrl = "http://localhost:8000/api/v1") {
    const res = await fetch(`${apiUrl}/flags/`, { headers: { "X-Environment-Key": environmentKey } });
    if (!res.ok) throw new Error(`Flagsmith /flags/ failed: ${res.status}`);
    for (const f of await res.json()) flags.set(f.feature.name, f);
  },
  hasFeature: (name) => Boolean(flags.get(name)?.enabled),
  getValue: (name) => flags.get(name)?.feature_state_value ?? null,
};
