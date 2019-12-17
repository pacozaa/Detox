const CircusTestEventListenerBase = require('./CircusTestEventListenerBase');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleepAndLog(name) {
  console.log(name + '-- start -- ' + new Date());
  await sleep(1000);
  console.log(name + '-- end -- ' + new Date());
}

class DebuggingCircusListener extends CircusTestEventListenerBase {
  async _onSuiteStart(event, state) {
    await sleepAndLog('_onSuiteStart', event, state);
  }
  async _onSuiteEnd(event, state) {
    await sleepAndLog('_onSuiteEnd', event, state);
  }
  async _onTestStart(event, state) {
    await sleepAndLog('_onTestStart', event, state);
  }
  async _onTestComplete(event, state) {
    await sleepAndLog('_onTestComplete', event, state);
  }
  async _onTestSkip(event, state) {
    await sleepAndLog('_onTestSkip', event, state);
  }
  async _onBeforeEach(event, state) {
    await sleepAndLog('_onBeforeEach', event, state);
  }
  async _onAfterEach(event, state) {
    await sleepAndLog('_onAfterEach', event, state);
  }
  async _onBeforeAll(event, state) {
    await sleepAndLog('_onBeforeAll', event, state);
  }
  async _onAfterAll(event, state) {
    await sleepAndLog('_onAfterAll', event, state);
  }
  async _onError(event, state) {
    await sleepAndLog('_onError', event, state);
  }
}

module.exports = DebuggingCircusListener;
