#!/bin/sh

npm install
npm run build
npm run start:dev
npm install prisma -D
