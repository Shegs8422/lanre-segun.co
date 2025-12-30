import { c as defineEventHandler, r as readBody, f as createError } from '../../_/nitro.mjs';
import fs from 'node:fs';
import path from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:url';

const notes_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const filePath = path.join(process.cwd(), "data", "notes.json");
  try {
    if (Array.isArray(body)) {
      fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
      return { success: true };
    }
    let notes = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      notes = JSON.parse(data);
    }
    const index = notes.findIndex((n) => n.id === body.id);
    if (index !== -1) {
      notes[index] = { ...notes[index], ...body };
    } else {
      if (!body.id) {
        body.id = Date.now().toString();
      }
      notes.push(body);
    }
    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to save note"
    });
  }
});

export { notes_post as default };
//# sourceMappingURL=notes.post.mjs.map
