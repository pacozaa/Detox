const {noop} = require('lodash');

class CircusTestEventListenerBase {
  constructor() {
    this._dispatchMap = {
      'run_describe_start': this._onSuiteStart,
      'run_describe_finish': this._onSuiteEnd,
      'test_start': this._onTestStart,
      'test_done': this._onTestComplete,
      'test_skip': this._onTestSkip,
      'hook_start': this._handleHookEvents,
      'hook_failure': noop, // For clarity
      'hook_success': noop, // For clarity
      'error': this._onError,
    };

    this._hookDispatchMap = {
      'beforeAll': this._onBeforeAll,
      'beforeEach': this._onBeforeEach,
      'afterEach': this._onAfterEach,
      'afterAll': this._onAfterAll,
    };
  }

  async handleTestEvent(event, state) {
    const fn = this._dispatchMap[event.name] || noop;
    await fn.call(this, event, state);
  }

  /***
   * @private
   */
  async _handleHookEvents(event, state) {
    const fn = this._hookDispatchMap[event.hook.type] || noop;
    await fn.call(this, event, state);
  }

  /***
   * @protected
   */
  async _onSuiteStart(event, state) {}
  /***
   * @protected
   */
  async _onSuiteEnd(event, state) {}
  /***
   * @protected
   */
  async _onTestStart(event, state) {}
  /***
   * @protected
   */
  async _onTestComplete(event, state) {}
  /***
   * @protected
   */
  async _onTestSkip(event, state) {}
  /***
   * @protected
   */
  async _onBeforeEach(event, state) {}
  /***
   * @protected
   */
  async _onAfterEach(event, state) {}
  /***
   * @protected
   */
  async _onBeforeAll(event, state) {}
  /***
   * @protected
   */
  async _onAfterAll(event, state) {}
  /***
   * @protected
   */
  async _onError(event, state) {}
}

CircusTestEventListenerBase.stubEventsListener = {
  handleTestEvent: noop,
};

module.exports = CircusTestEventListenerBase;
