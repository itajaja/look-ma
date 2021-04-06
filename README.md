# look-ma

_no hands!_

When all you need is just to write some javascript code fast, but you don't
want to clutter your repo with thousand files.

## Install

```sh
yarn global add look-ma
```

## Usage

create a simple package.json, with only one entry, like this:

```
{
  "lookma": "https://github.com/itajaja/boilerplate-script-ts.git"
}
```

The src field should point to a git repo ([see valid values](https://www.npmjs.com/package/degit#basics))
which contains a boilerplate/scaffold.
You can also add extra fields (like `dependencies`) which will be merged in the package.json.

## Run

```
look-ma
```

## Updating your project

you can simply modify the `lookma` field in the package.json (if necessary), and simply rerun

```
look-ma
```

you can add additional fields to the package.json. your changes will be merged and override the fields
in the boilerplate package.json

## Eject

Simply replace the .gitignore file with a regular gitignore ((like this)[https://www.toptal.com/developers/gitignore/api/node])

## Develop a scaffold

Nothing special is required in the scaffold, beside the following:

- a valid package.json file
- a .lookmaignore file that will replace the .gitignore file when downloaded through look-ma. You want to ignore basically all the files, except package.json and (optionally) yarn.lock
