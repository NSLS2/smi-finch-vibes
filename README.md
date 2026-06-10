# Development workspace for SMI prototype built on Finch components

## Development against a local tiled server

1. Start a tiled server with exporter configuration.

   ```sh
   pixi run serve
   ```

2. Copy example data from `tiled.nsls2.bnl.gov` into the local server.
   Provide one or more uids from SMI.

   ```sh
   pixi run fetch-examples f5f84503-f716-4b89-844d-6230f4014f9a
   ```

   This is only necessary the first time, or if the examples change.
