# Thesis

What is fundamentally wrong with CI today?

* Unstable plugins
* Compatibility between plugins

How to build a CI system?

* Golang/Haskell/Elixir for reliability and performance
* Workflow plugin: https://github.com/scipipe/scipipe

## Proof of Concept (POC)

* Hard-coded trigger job page with textarea that takes a shell script and gets run by backend on demand
  * frontend (done)
  * Websocket/Webserver
  * Stream shell output via Websocket to browser
  * Re-run on demand

## Minimum Viable Product (MVP)

* CRUD jobs
