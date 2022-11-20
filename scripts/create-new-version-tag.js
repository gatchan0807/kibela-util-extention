const fs = require('fs');
const program = require('commander');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const PACKAGE_JSON_PATH = './package.json';
const MANIFEST_JSON_PATH = './manifest.json';

program.option('--increment <increment-target>');
program.parse(process.argv);
const { increment = 'patch' } = program.opts();

const incrementVersion = (currentVersion, incrementTarget) => {
  const [major, minor, patch] = currentVersion.split('.');

  switch (incrementTarget) {
    case 'major':
      return `${Number(major) + 1}.0.0`;
    case 'minor':
      return `${major}.${Number(minor) + 1}.0`;
    default:
      return `${major}.${minor}.${Number(patch) + 1}`;
  }
};

(async () => {
  if (fs.existsSync(PACKAGE_JSON_PATH) && fs.existsSync(MANIFEST_JSON_PATH)) {
    const packageJson = JSON.parse(
      fs.readFileSync(PACKAGE_JSON_PATH).toString()
    );
    const manifestJson = JSON.parse(
      fs.readFileSync(MANIFEST_JSON_PATH).toString()
    );

    if (packageJson.version !== manifestJson.version)
      throw new Error(
        '[ERROR] You need match versions between manifest.json and package.json.'
      );

    const newVersion = incrementVersion(packageJson.version, increment);
    packageJson.version = newVersion;
    manifestJson.version = newVersion;

    fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2));
    fs.writeFileSync(MANIFEST_JSON_PATH, JSON.stringify(manifestJson, null, 2));

    await execAsync('yarn package:chrome');
    await execAsync(`git tag ${newVersion}`);
    await execAsync(`git push origin ${newVersion}`);
  } else {
    console.error("[ERROR] Can't find files. Check running directory.");
    console.error(`${PACKAGE_JSON_PATH}:`, fs.existsSync(PACKAGE_JSON_PATH));
    console.error(`${MANIFEST_JSON_PATH}:`, fs.existsSync(MANIFEST_JSON_PATH));

    process.exit(1);
  }
})();
