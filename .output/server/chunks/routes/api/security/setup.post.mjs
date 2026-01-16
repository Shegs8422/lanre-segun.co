import { c as defineEventHandler, r as readBody, g as getCookie, e as createError } from '../../../_/nitro.mjs';
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

const setup_post = defineEventHandler(async (event) => {
  const { questions, answers } = await readBody(event);
  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  try {
    const supabase = await serverSupabaseClient(event);
    const bcrypt = await import('bcryptjs');
    const normalize = (val) => val.replace(/\s/g, "").toLowerCase();
    const hashedAnswers = await Promise.all(
      answers.map((answer) => bcrypt.hash(normalize(answer), 10))
    );
    const ADMIN_CONFIG_ID = "00000000-0000-0000-0000-000000000000";
    console.log("[DEBUG] UPSERTING security questions for ID:", ADMIN_CONFIG_ID);
    const { error } = await supabase.from("security_questions").upsert({
      id: ADMIN_CONFIG_ID,
      question_1: questions[0],
      answer_1_hash: hashedAnswers[0],
      question_2: questions[1],
      answer_2_hash: hashedAnswers[1],
      question_3: questions[2],
      answer_3_hash: hashedAnswers[2]
    });
    if (error) {
      console.error("[DEBUG] UPSERT ERROR:", error.message, error.code, error.details);
      throw error;
    }
    return { success: true };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("[DEBUG] SETUP POST ERROR:", error);
    throw createError({ statusCode: 500, message: "Failed to save security questions: " + (error.message || "Unknown error") });
  }
});

export { setup_post as default };
//# sourceMappingURL=setup.post.mjs.map
