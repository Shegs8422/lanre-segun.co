import { c as defineEventHandler, r as readBody, f as createError } from '../../_/nitro.mjs';
import fs from 'node:fs';
import path from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:url';

const notes_delete = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const filePath = path.join(process.cwd(), "data", "notes.json");
  if (!body.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required"
    });
  }
  try {
    let notes = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      notes = JSON.parse(data);
    }
    const newNotes = notes.filter((n) => n.id !== body.id);
    fs.writeFileSync(filePath, JSON.stringify(newNotes, null, 2));
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete note"
    });
  }
});

export { notes_delete as default };
//# sourceMappingURL=notes.delete.mjs.map
