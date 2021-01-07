#!/usr/bin/env node
/* eslint-disable no-console */

import child_process from 'child_process';
import fs from 'fs/promises';
import { promisify } from 'util';

import degit from 'degit';
import merge from 'lodash/merge';

const spawn = promisify(child_process.spawn);

async function run() {
  const manifest = JSON.parse(
    await fs.readFile('look-ma.json', { encoding: 'utf-8' }),
  );
  const { src, ...rest } = manifest;
  if (!src) {
    throw new Error('you must specify a src field in your look-ma.json!');
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
  const mergedPackageJson = merge(packageJson, rest);
  await fs.writeFile(
    'package.json',
    JSON.stringify(mergedPackageJson, undefined, 2),
  );

  console.log('installing');
  await spawn('yarn', [], { stdio: 'inherit' });
}

run();
