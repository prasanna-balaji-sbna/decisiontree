const scanner = require('sonarqube-scanner');
scanner(
  {
  serverUrl: "http://altrans./assets/images/logo.pngtech.in:9000",
  login:"admin",
  password:"admin",
  options: {
    "sonar.sources": "./src"
  },
},
() => process.exit()
);