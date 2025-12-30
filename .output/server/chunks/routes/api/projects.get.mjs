import { c as defineEventHandler } from '../../_/nitro.mjs';
import fs from 'node:fs';
import path from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:url';

const projects_get = defineEventHandler(async (event) => {
  const filePath = path.join(process.cwd(), "data", "projects.json");
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
});

export { projects_get as default };
//# sourceMappingURL=projects.get.mjs.map
