import fs from 'fs';
import path from 'path';

const MAPPING_FILE = path.join(process.cwd(), 'scripts', 'image-migration-mapping.json');
const TARGET_DIRS = ['components', 'pages', 'composables', 'store', 'layouts', 'app.vue'];
const FILE_EXTENSIONS = ['.vue', '.ts', '.js', '.json'];

interface Mapping {
    originalPath: string;
    blobUrl: string;
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;

    if (fs.statSync(dirPath).isFile()) {
        return [dirPath];
    }

    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            if (FILE_EXTENSIONS.includes(path.extname(fullPath))) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

function updateFileReferences(filePath: string, mappings: Mapping[]) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanged = false;

    // Sort mappings by length of originalPath descending to avoid partial replacements
    const sortedMappings = [...mappings].sort((a, b) => b.originalPath.length - a.originalPath.length);

    for (const mapping of sortedMappings) {
        // Escape special characters in originalPath for regex
        const escapedPath = mapping.originalPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Check for both direct path and encoded path (if different)
        const encodedPath = encodeURI(mapping.originalPath);

        const pathsToMatch = new Set([mapping.originalPath, encodedPath]);

        for (const matchPath of pathsToMatch) {
            const regex = new RegExp(matchPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            if (regex.test(content)) {
                content = content.replace(regex, mapping.blobUrl);
                hasChanged = true;
            }
        }
    }

    if (hasChanged) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${filePath}`);
    }
}

function main() {
    if (!fs.existsSync(MAPPING_FILE)) {
        console.error('❌ Mapping file not found!');
        process.exit(1);
    }

    const mappings: Mapping[] = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
    console.log(`📂 Loaded ${mappings.length} mappings.`);

    const allFiles: string[] = [];
    TARGET_DIRS.forEach(dir => {
        const fullPath = path.join(process.cwd(), dir);
        if (fs.existsSync(fullPath)) {
            if (fs.statSync(fullPath).isFile()) {
                allFiles.push(fullPath);
            } else {
                getAllFiles(fullPath, allFiles);
            }
        }
    });

    console.log(`🔍 Scanning ${allFiles.length} files...`);

    allFiles.forEach(file => {
        updateFileReferences(file, mappings);
    });

    console.log('✨ Codebase update complete!');
}

main();
