#!/usr/bin/env bun
// @ts-nocheck
// OpenCode-side adapter: a thin always-on HTTP proxy that hands every request to
// core-auth's transport-agnostic router. Declared as the loader's daemon, so a
// provider's baseURL can point here and traffic flows through the same harness
// the Claude loader uses.

import { route } from "../core-auth/dist/index.js";

const PORT = parseInt(process.env.HUB_PROXY_PORT || "34567", 10);

Bun.serve({
  port: PORT,
  hostname: "127.0.0.1",
  idleTimeout: 0,
  fetch: (request) => route(request),
});
