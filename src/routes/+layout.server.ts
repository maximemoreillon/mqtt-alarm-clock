import type { LayoutServerLoad } from "./$types";

// Authentication is enforced in hooks.server.ts
export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.auth(),
  };
};
