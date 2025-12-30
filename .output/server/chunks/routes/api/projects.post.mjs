import { c as defineEventHandler, r as readBody, f as createError } from '../../_/nitro.mjs';
import fs from 'node:fs';
import path from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:url';

const projects_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const filePath = path.join(process.cwd(), "data", "projects.json");
  try {
    if (Array.isArray(body)) {
      fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
      return { success: true };
    }
    let projects = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      projects = JSON.parse(data);
    }
    const index = projects.findIndex((p) => p.slug === body.slug);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...body };
    } else {
      projects.push(body);
    }
    fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to save project"
    });
  }
});

export { projects_post as default };
//# sourceMappingURL=projects.post.mjs.map
