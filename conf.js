exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['tests/integration-test.js'],
  allScriptsTimeout: 1000000
};