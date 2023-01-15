// Inspired from https://github.com/facebook/docusaurus/blob/main/admin/scripts/copyUntypedFiles.js
// As I don't need the watch part, I remove it

import fs from 'fs-extra';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const libDir = path.join(process.cwd(), 'lib');

// import styles from "./styles.module.css"
const ignoredPattern = /(?:__tests__|\.tsx?$)/;

async function copy() {
    await fs.copy(srcDir, libDir, {
      filter(testedPath) {
        return !ignoredPattern.test(testedPath);
      },
    });
}

await copy();