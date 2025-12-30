import { c as defineEventHandler, r as readBody, e as setCookie, f as createError } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const auth_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const password = body.password;
  const CORRECT_PASSWORD = process.env.CMS_PASSWORD || "admin123";
  if (password === CORRECT_PASSWORD) {
    setCookie(event, "auth_token", "logged-in-secret-token", {
      httpOnly: false,
      // Allow client JS to read for UI state if needed, but better true for security. 
      // For this simple case, we might check cookie existence in middleware.
      maxAge: 60 * 60 * 24 * 7,
      // 1 week
      path: "/"
    });
    return { success: true };
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
});

export { auth_post as default };
//# sourceMappingURL=auth.post.mjs.map
