#!/bin/bash
mkdir galacean-devtools
cp -R chrome-extension/* galacean-devtools/
zip -r galacean-devtools-$(date +%m%d%H%M).zip galacean-devtools/
rm -rf galacean-devtools/
