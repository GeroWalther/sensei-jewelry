import { createHash } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run hash-admin <password>");
  console.error("Example: npm run hash-admin 'my-secret-password'");
  process.exit(1);
}

const hash = createHash("sha256").update(password).digest("hex");

console.log("");
console.log("ADMIN_PASSWORD_HASH=" + hash);
console.log("");
console.log("Copy that line into your .env (and into Vercel env vars for production).");
