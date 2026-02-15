import fs from 'fs';
import path from 'path';

const MAPPING_FILE = path.join(process.cwd(), 'scripts', 'image-migration-mapping.json');

interface Mapping {
    originalPath: string;
    blobUrl: string;
}

function main() {
    if (!fs.existsSync(MAPPING_FILE)) {
        console.error('❌ Mapping file not found!');
        process.exit(1);
    }

    const mappings: Mapping[] = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));

    // Sort mappings by length descending to avoid partial matches
    const sortedMappings = [...mappings].sort((a, b) => b.originalPath.length - a.originalPath.length);

    let sql = 'BEGIN;\n\n';

    // 1. Update projects.cover_image
    sql += '-- Update projects cover_image\n';
    sql += 'UPDATE projects SET cover_image = CASE cover_image\n';
    for (const m of sortedMappings) {
        sql += `  WHEN '${m.originalPath}' THEN '${m.blobUrl}'\n`;
        const encoded = encodeURI(m.originalPath);
        if (encoded !== m.originalPath) {
            sql += `  WHEN '${encoded}' THEN '${m.blobUrl}'\n`;
        }
    }
    sql += '  ELSE cover_image\nEND;\n\n';

    // 2. Update projects.content (JSONB)
    sql += '-- Update projects content (JSONB global replace)\n';
    let projectsContentExpr = 'content::text';
    for (const m of sortedMappings) {
        projectsContentExpr = `REPLACE(${projectsContentExpr}, '${m.originalPath.replace(/'/g, "''")}', '${m.blobUrl}')`;
        const encoded = encodeURI(m.originalPath);
        if (encoded !== m.originalPath) {
            projectsContentExpr = `REPLACE(${projectsContentExpr}, '${encoded.replace(/'/g, "''")}', '${m.blobUrl}')`;
        }
    }
    sql += `UPDATE projects SET content = (${projectsContentExpr})::jsonb;\n\n`;

    // 3. Update projects.wireframes and projects.final_designs (text[])
    sql += '-- Update projects wireframes and final_designs\n';
    let wfExpr = 'wireframes::text';
    let fdExpr = 'final_designs::text';
    for (const m of sortedMappings) {
        wfExpr = `REPLACE(${wfExpr}, '${m.originalPath.replace(/'/g, "''")}', '${m.blobUrl}')`;
        fdExpr = `REPLACE(${fdExpr}, '${m.originalPath.replace(/'/g, "''")}', '${m.blobUrl}')`;
    }
    sql += `UPDATE projects SET wireframes = (${wfExpr})::text[], final_designs = (${fdExpr})::text[];\n\n`;

    // 4. Update blog.cover_image and blog.content
    sql += '-- Update blog cover_image and content\n';
    sql += 'UPDATE blog SET cover_image = CASE cover_image\n';
    for (const m of sortedMappings) {
        sql += `  WHEN '${m.originalPath.replace(/'/g, "''")}' THEN '${m.blobUrl}'\n`;
    }
    sql += '  ELSE cover_image\nEND;\n\n';

    let blogContentExpr = 'content';
    for (const m of sortedMappings) {
        blogContentExpr = `REPLACE(${blogContentExpr}, '${m.originalPath.replace(/'/g, "''")}', '${m.blobUrl}')`;
    }
    sql += `UPDATE blog SET content = (${blogContentExpr});\n\n`;

    // 5. Update gallery.url
    sql += '-- Update gallery url\n';
    sql += 'UPDATE gallery SET url = CASE url\n';
    for (const m of sortedMappings) {
        sql += `  WHEN '${m.originalPath}' THEN '${m.blobUrl}'\n`;
    }
    sql += '  ELSE url\nEND;\n\n';

    sql += 'COMMIT;';

    fs.writeFileSync('scripts/update-db.sql', sql);
    console.log('✨ SQL script generated at scripts/update-db.sql');
}

main();
