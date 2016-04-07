### Universal/Isomorphic Code

This directory contains any code shared between `/client` and `/server`. For example, common utilities and constants are best defined here rather than twice across both `/client` and `/server`.

* `/server` is able import the code directly.
* `/client` has the code transpiled and included in its bundle by its Webpack configuration.
* Testing code in `/universal` is done by the same process as server tests, under the npm script `test-node`.
