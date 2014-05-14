#!/usr/bin/env node

var readline = require('readline'),
    chrome = require('..')();

process.stdin.on('data', function(chunk) {
  chrome.write(chunk);
});

var rl = readline.createInterface({
  input: chrome,
  output: process.stdout
});

chrome.on('end', function(chunk) {
  rl.prompt();
});

rl.setPrompt('chrome> ');
rl.prompt();
