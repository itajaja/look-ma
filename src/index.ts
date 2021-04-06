#!/usr/bin/env node
/* eslint-disable no-console */

import child_process from 'child_process';
import fs from 'fs/promises';
import { promisify } from 'util';

import degit from 'degit';
import merge from 'lodash/merge';

const spawn = promisify(child_process.spawn);

async function run() {
  const packageManifest = JSON.parse(
    await fs.readFile('package.json', { encoding: 'utf-8' }),
  );
  const { lookma: src } = packageManifest;
  if (!src) {
    throw new Error('you must specify a lookma field in your package.json!');
  }

  console.log(`cloning ${src}...`);
  const emitter = degit(src, {
    cache: false,
    force: true,
    verbose: true,
  });
  await emitter.clone('./');
  await fs.rename('./.lookmaignore', './.gitignore');

  console.log('updating package.json');
  const packageJson = JSON.parse(
    await fs.readFile('package.json', { encoding: 'utf-8' }),
  );
  const mergedPackageJson = merge(packageJson, packageManifest);
  await fs.writeFile(
    'package.json',
    JSON.stringify(mergedPackageJson, undefined, 2),
  );

  console.log('installing');
  await spawn('yarn', [], { stdio: 'inherit' });
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
