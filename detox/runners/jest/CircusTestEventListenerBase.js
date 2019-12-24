const {noop} = require('lodash');

class CircusTestEventListenerBase {
  constructor() {
    this._dispatchMap = {
      sync: {
        'setup': this.onSetup,
        'include_test_location_in_result': noop,
        'start_describe_definition': this.onDescribeDefinitionStart,
        'add_hook': this.onAddHook,
        'add_test': this.onAddTest,
        'finish_describe_definition': this.onDescribeDefinitionFinish,
        'error': this.onUnhandledError,
      },
      async: {
        'run_start': this.onRunStart,
        'run_describe_start': this.onDescribeRunStart,
        'run_describe_finish': this.onDescribeRunFinish,

        'test_start': this.onTestStart,

        'hook_start': this.onHookStart,
        'hook_success': this.onHookSuccess,
        'hook_failure': this.onHookFailure,

        'test_fn_start': this.onTestFnStart,
        'test_fn_failure': this.onTestFnFailure,
        'test_fn_success': this.onTestFnSuccess,

        'test_done': this.onTestDone,
        'test_retry': this.onTestRetry,
        'test_skip': this.onTestSkip,
        'test_todo': this.onTestTodo,

        'run_finish': this.onRunFinish,
        'teardown': this.onTeardown,
      },
      hooks: {
        beforeAll: [this.onBeforeAllStart, this.onBeforeAllSuccess, this.onBeforeAllFailure],
        beforeEach: [this.onBeforeEachStart, this.onBeforeEachSuccess, this.onBeforeEachFailure],
        afterEach: [this.onAfterEachStart, this.onAfterEachSuccess, this.onAfterEachFailure],
        afterAll: [this.onAfterAllStart, this.onAfterAllSuccess, this.onAfterAllFailure],
      },
    };
  }

  /***
   * @public
   */
  handleTestEvent(event, state) {
    if (this._dispatchMap.sync.hasOwnProperty(event.name)) {
      return this._dispatchMap.sync[event.name].call(this, event, state);
    }

    if (this._dispatchMap.async.hasOwnProperty(event.name)) {
      return this._dispatchMap.async[event.name].call(this, event, state);
    }
  }

  /***
   * @protected
   */
  onSetup(event, state) {}
  /***
   * @protected
   */
  onDescribeDefinitionStart(event, state) {}
  /***
   * @protected
   */
  onAddHook(event, state) {}
  /***
   * @protected
   */
  onAddTest(event, state) {}
  /***
   * @protected
   */
  onDescribeDefinitionFinish(event, state) {}
  /***
   * @protected
   */
  onUnhandledError(event, state) {}

  /***
   * @protected
   */
  async onRunStart(event, state) {}
  /***
   * @protected
   */
  async onDescribeRunStart(event, state) {}
  /***
   * @protected
   */
  async onDescribeRunFinish(event, state) {}
  /***
   * @protected
   */
  async onTestStart(event, state) {}
  /***
   * @protected
   */
  async onHookStart(event, state) {
    await this._handleHookEvents(event, state, 0);
  }
  /***
   * @protected
   */
  async onHookSuccess(event, state) {
    await this._handleHookEvents(event, state, 1);
  }
  /***
   * @protected
   */
  async onHookFailure(event, state) {
    await this._handleHookEvents(event, state, 2);
  }
  /***
   * @protected
   */
  async onTestFnStart(event, state) {}
  /***
   * @protected
   */
  async onTestFnFailure(event, state) {}
  /***
   * @protected
   */
  async onTestFnSuccess(event, state) {}
  /***
   * @protected
   */
  async onTestDone(event, state) {}
  /***
   * @protected
   */
  async onTestRetry(event, state) {}
  /***
   * @protected
   */
  async onTestSkip(event, state) {}
  /***
   * @protected
   */
  async onTestTodo(event, state) {}
  /***
   * @protected
   */
  async onRunFinish(event, state) {}
  /***
   * @protected
   */
  async onTeardown(event, state) {}
  /***
   * @protected
   */
  async onBeforeAllStart(event, state) {}
  /***
   * @protected
   */
  async onBeforeAllSuccess(event, state) {}
  /***
   * @protected
   */
  async onBeforeAllFailure(event, state) {}
  /***
   * @protected
   */
  async onBeforeEachStart(event, state) {}
  /***
   * @protected
   */
  async onBeforeEachSuccess(event, state) {}
  /***
   * @protected
   */
  async onBeforeEachFailure(event, state) {}
  /***
   * @protected
   */
  async onAfterEachStart(event, state) {}
  /***
   * @protected
   */
  async onAfterEachSuccess(event, state) {}
  /***
   * @protected
   */
  async onAfterEachFailure(event, state) {}
  /***
   * @protected
   */
  async onAfterAllStart(event, state) {}
  /***
   * @protected
   */
  async onAfterAllSuccess(event, state) {}
  /***
   * @protected
   */
  async onAfterAllFailure(event, state) {}

  /***
   * @private
   */
  async _handleHookEvents(event, state, listenerIndex) {
    const listeners = this._dispatchMap.hooks[event.hook.type];

    if (Array.isArray(listeners)) {
      await listeners[listenerIndex].call(this, event, state);
    }
  }
}

CircusTestEventListenerBase.stubEventsListener = {
  handleTestEvent: noop,
};

module.exports = CircusTestEventListenerBase;
