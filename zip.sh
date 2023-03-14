#!/bin/bash
mkdir venus-devtools
cp -R chrome-extension/* venus-devtools/
zip -r venus-devtools-$(date +%m%d%H%M).zip venus-devtools/
rm -rf venus-devtools/
