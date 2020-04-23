/* globals MicroModal */
import { getOwner } from '@ember/application';
import { assign } from '@ember/polyfills';
import { action, computed, get } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export default class MicroModalComponent extends Component {
  elementId = guidFor(this);

  @tracked
  show;

  constructor() {
    super(...arguments);

    this.show = false;
  }

  @computed
  get config() {
    const _config = getOwner(this).resolveRegistration('config:environment') || {};

    return _config['ember-micro-modal'] || {};
  }

  @computed('config')
  get options() {
    const _options = {};

    assign(_options, this.config, this.componentOptions());

    return _options;
  }

  componentOptions() {
    const defaults = [
      'openTrigger',
      'closeTrigger',
      'openClass',
      'disableScroll',
      'disableFocus',
      'awaitOpenAnimation',
      'awaitCloseAnimation',
      'debugMode',
    ];

    let options = {};

    defaults.forEach((option) => {
      if (isPresent(get(this.args, option))) {
        options[option] = get(this.args, option);
      }
    });

    options = assign(options, {
      onShow: (modal) => this.onShow(modal),
      onClose: (modal) => this.onClose(modal),
    });

    return options;
  }

  @action
  _initialize() {
    if (this.args.show) {
      MicroModal.show(this.elementId, this.options);

      this.show = true;
    }
  }

  @action
  _update() {
    if (this.args.show && !this.show) {
      MicroModal.show(this.elementId, this.options);

      this.show = true;
    } else if (!this.args.show && this.show) {
      MicroModal.close(this.elementId);

      this.show = false;
    }
  }

  onShow(modal) {
    const action = this.args.onShow;

    if (isPresent(action) && typeof action === 'function') {
      action(modal);
    }
  }

  onClose(modal) {
    const action = this.args.onClose;

    if (isPresent(action) && typeof action === 'function') {
      action(modal);
    }
  }
}
