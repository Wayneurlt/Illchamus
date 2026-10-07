import { resolve } from "node:path";
import fsDriver from "unstorage/drivers/fs";
import { seedContent } from "../utils/seed";

// All site content (news, events, team, messages, subscribers, uploads) lives in
// one folder on disk. Set NUXT_DATA_DIR in production to a folder outside the
// deployed build (e.g. /home/tiny/temi/data) so deploys never touch it.
export default defineNitroPlugin(async () => {
  const { dataDir } = useRuntimeConfig();
  const base = dataDir || resolve(process.cwd(), ".data/site");
  useStorage().mount("site", fsDriver({ base }));
  try {
    await seedContent();
  } catch (error) {
    console.error("[storage] seeding failed", error);
  }
});
