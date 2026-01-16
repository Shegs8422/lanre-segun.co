import { c as defineEventHandler, r as readBody, e as createError, f as setCookie } from '../../../_/nitro.mjs';
import { s as serverSupabaseClient } from '../../../_/serverSupabaseClient.mjs';
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

const verify_post = defineEventHandler(async (event) => {
  const { answers } = await readBody(event);
  if (!answers || answers.length !== 3) {
    throw createError({
      statusCode: 400,
      message: "Invalid request. 3 answers required."
    });
  }
  try {
    const supabase = await serverSupabaseClient(event);
    const bcrypt = await import('bcryptjs');
    const { data, error } = await supabase.from("security_questions").select("*").limit(1).maybeSingle();
    if (error || !data) {
      throw createError({
        statusCode: 404,
        message: "Security questions not found. Please set them up in the CMS first."
      });
    }
    const normalize = (val) => val.replace(/\s/g, "").toLowerCase();
    const isValid = await Promise.all([
      bcrypt.compare(normalize(answers[0]), data.answer_1_hash),
      bcrypt.compare(normalize(answers[1]), data.answer_2_hash),
      bcrypt.compare(normalize(answers[2]), data.answer_3_hash)
    ]);
    if (isValid.every((v) => v === true)) {
      setCookie(event, "reset_token", "verified-admin-reset", {
        maxAge: 600,
        // 10 minutes
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      });
      return { success: true };
    } else {
      throw createError({
        statusCode: 401,
        message: "Verification failed. Answers are incorrect."
      });
    }
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Verification error:", error);
    throw createError({
      statusCode: 500,
      message: "Verification failed"
    });
  }
});

export { verify_post as default };
//# sourceMappingURL=verify.post.mjs.map
