import { c as defineEventHandler, r as readBody, g as getCookie, f as createError, h as deleteCookie } from '../../../_/nitro.mjs';
import { s as serverSupabaseClient } from '../../../_/serverSupabaseClient.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@supabase/ssr';

const resetPassword_post = defineEventHandler(async (event) => {
  const { newPassword } = await readBody(event);
  const resetToken = getCookie(event, "reset_token");
  if (resetToken !== "verified-admin-reset") {
    throw createError({
      statusCode: 401,
      message: "Unauthorized. Verification expired or invalid."
    });
  }
  try {
    const supabase = await serverSupabaseClient(event);
    const { error } = await supabase.from("security_questions").update({ password_override: newPassword }).eq("id", "00000000-0000-0000-0000-000000000000");
    if (error) throw error;
    deleteCookie(event, "reset_token");
    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Reset error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to update password"
    });
  }
});

export { resetPassword_post as default };
//# sourceMappingURL=reset-password.post.mjs.map
