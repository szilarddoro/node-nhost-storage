import { NhostClient } from "@nhost/nhost-js";

export const client = new NhostClient({
  subdomain: process.env.SUBDOMAIN,
  region: process.env.REGION,
  adminSecret: process.env.ADMIN_SECRET,
});
