# glory-ci

* Pluggable
* Async
* Scalable
* Secure

## Why another CI system?

Open Source CIs are lacking basic features. I want to build a system that is easy to develop in and encourages code that is easy to read and write.

Jenkins is the leader in this area but only supports Groovy dialects in its DSL.

I want to allow developers to use Golang or JS to write their plugins.

# Thesis

What is fundamentally wrong with CI today?

* Unstable plugins
* Compatibility between plugins

How to build a CI system?

* Golang for reliability and performance
* Workflow plugin: https://github.com/scipipe/scipipe

## Proof of Concept (POC)

* Hard-coded trigger job page with textarea that takes a shell script and gets run by backend on demand
  * frontend (done)
  * Websocket/Webserver (done)
  * Run script remotely on demand
  * Stream shell output via Websocket to browser

## Minimum Viable Product (MVP)

* CRUD jobs
* Job chaining
* Job parallelization
