#!/usr/bin/env python3
"""Petit serveur statique local pour prévisualiser le site Cabinet Orthéna."""
import http.server
import functools
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(os.environ.get("PORT", 8420))

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
server = http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
print(f"Serving {ROOT} at http://localhost:{PORT}")
server.serve_forever()
