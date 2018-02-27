#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

# merge ngsw-manifest and copy to dist
./node_modules/.bin/ngu-sw-manifest --module src/app/app.module.ts \
--out dist/ngsw-manifest.json

# Production build
ng build --prod

# Serve
cd dist
http-server