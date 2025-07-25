import type { PageServerLoad } from "./$types";
import { readAlarms } from "$lib/server/alarms";

export const load: PageServerLoad = async ({ params, locals }) => {
  // const session = await locals.auth();
  // if (!session?.user?.name) throw new Error("Unauthorized");
  // const user_id = session.user.name;

  // const id = Number(params.id);

  return await readAlarms();
};
