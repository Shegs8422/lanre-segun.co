import { c as defineEventHandler, r as readBody, f as setCookie, e as createError } from '../../_/nitro.mjs';
import { s as serverSupabaseClient } from '../../_/serverSupabaseClient.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue';
import 'consola';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';
import '@supabase/ssr';

const auth_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const password = body.password;
  const supabase = await serverSupabaseClient(event);
  const { data: config } = await supabase.from("security_questions").select("password_override").eq("id", "00000000-0000-0000-0000-000000000000").maybeSingle();
  const CORRECT_PASSWORD = (config == null ? void 0 : config.password_override) || process.env.CMS_PASSWORD || "admin123";
  if (password === CORRECT_PASSWORD) {
    setCookie(event, "auth_token", "logged-in-secret-token", {
      httpOnly: false,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      // 1 week
      path: "/",
      sameSite: "strict"
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
