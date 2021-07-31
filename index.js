'use strict';

var _defaults = {
  env: {
    PATH: process.env.PATH
  },
  shell: true,
  stdio: ['inherit', 'inherit', 'inherit'],
  cwd: process.cwd()
};

function mergeDefaults(yourOpts) {
  return Object.assign({}, _defaults, yourOpts);
}

function spawn(cmd, opts = {}) {
  return require('child_process').spawn(cmd, mergeDefaults(opts));
}

module.exports = function (arr, opts = {}) {
  if (!arr) {
    throw new Error('array of commands is required');
  }
  if (!Array.isArray(arr)) {
    throw new Error('array of commands must be an array');
  }
  arr.forEach(function (el) {
    if (typeof el === 'string') {
      spawn(el, opts);
    } else {
      spawn(el.cmd, el.opts);
    }
  });
};
