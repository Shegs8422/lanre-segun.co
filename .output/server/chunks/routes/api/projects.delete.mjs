import { c as defineEventHandler, r as readBody, f as createError } from '../../_/nitro.mjs';
import fs from 'node:fs';
import path from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:url';

const projects_delete = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const filePath = path.join(process.cwd(), "data", "projects.json");
  if (!body.slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug is required"
    });
  }
  try {
    let projects = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      projects = JSON.parse(data);
    }
    const newProjects = projects.filter((p) => p.slug !== body.slug);
    fs.writeFileSync(filePath, JSON.stringify(newProjects, null, 2));
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete project"
    });
  }
});

export { projects_delete as default };
//# sourceMappingURL=projects.delete.mjs.map
