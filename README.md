## people-directory

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options
```bash
nvm use 8.9.4
gulp clean
gulp test
gulp serve
gulp bundle --ship
gulp package-solution --ship
```