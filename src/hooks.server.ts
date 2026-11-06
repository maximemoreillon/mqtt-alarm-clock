import { recreateCronJobs } from "$lib/server/cron";
import { init as mqttInit } from "$lib/server/mqtt";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { handle as authHandle } from "./auth";

const PUBLIC_PATHS = ["/login", "/signin", "/signout"];

const isPublic = (pathname: string) =>
  PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/auth/");

// Enforce authentication on every request, including __data.json requests.
// Auth checks in +layout.server.ts are NOT sufficient: page loads run in
// parallel with layout loads, and clients can request page data alone.
const authGuard: Handle = async ({ event, resolve }) => {
  if (isPublic(event.url.pathname)) return resolve(event);

  const session = await event.locals.auth();
  if (session?.user) return resolve(event);

  if (event.url.pathname.startsWith("/api/"))
    return new Response("Unauthorized", { status: 401 });

  redirect(303, "/login");
};

export const handle = sequence(authHandle, authGuard);

export const init = async () => {
  mqttInit();
  recreateCronJobs();
};
