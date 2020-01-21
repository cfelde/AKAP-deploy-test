#!/usr/bin/env bash

ret=`python -c 'import sys; print("%i" % (sys.hexversion<0x03000000))'`
if [ $ret -eq 0 ]; then
    echo "Starting webserver on http://localhost:8000"
    cd web && python -m http.server 8000
else
    echo "Starting webserver on http://localhost:8000"
    cd web && python -m SimpleHTTPServer 8000
fi
