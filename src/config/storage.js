const { static } = require('express');
const root = require('../root');
const fs = require('fs');
const path = require('path');

function initStorage() {
    const directories = [
        { root: '/', path: "tmp/jig-node" },
        { root, path: "media" },
        { root, path: "files" },
        { root, path: "manuals"},
    ];

    for (const dir of directories) {
        const newPath = path.join(dir.root, dir.path)
        console.log("newPathnewPath",newPath);
        try {
            const stat = fs.statSync(newPath);
            if (!stat) throw stat;

            if (!stat.isDirectory()) {
                console.warn(`initStorage: path '${newPath}' is not a directory!`);
            }
        } catch (err) {
            fs.mkdirSync(newPath, { recursive: true });
        }
    }
}

/**
 * Initialize static server directories
 * @param {*} app Express Application
 */
function initStaticDirectories(app) {
    // Define paths for Express config
    console.log("roooooooooooooooooooooooooot",root);
    const publicDirectoriesPaths = Object.freeze([
      path.join(root, 'public'),
      path.join(root, '../media'),
      path.join(root, '../files'),
    ]);
  
    // Setup static directory to serve
    for (const dir of publicDirectoriesPaths) {
      app.use(static(dir));
    }
  }
  
module.exports = {
    initStorage,
    initStaticDirectories
};