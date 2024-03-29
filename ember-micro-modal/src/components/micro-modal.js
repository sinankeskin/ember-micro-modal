import MicroModal from 'micromodal';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { getOwner } from '@ember/application';
import { guidFor } from '@ember/object/internals';
import { isPresent } from '@ember/utils';

export default class MicroModalComponent extends Component {
  elementId = guidFor(this);

  @cached
  get config() {
    const _config =
      getOwner(this).resolveRegistration('config:environment') || {};

    return _config['ember-micro-modal'] || {};
  }

  @cached
  get options() {
    const _options = {};

    Object.assign(_options, this.config, this.componentOptions);

    return _options;
  }

  @cached
  get componentOptions() {
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

    options = Object.assign(options, {
      onShow: (modal) => this.onShow(modal),
      onClose: (modal) => this.onClose(modal),
    });

    return options;
  }

  @action
  _initialize() {
    if (this.args.show) {
      MicroModal.show(this.elementId, this.options);
    }
  }

  @action
  _update() {
    if (this.args.show) {
      MicroModal.show(this.elementId, this.options);
    } else {
      MicroModal.close(this.elementId);
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
