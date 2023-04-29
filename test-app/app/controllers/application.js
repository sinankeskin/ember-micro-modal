import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @tracked show;

  constructor() {
    super(...arguments);

    this.show = false;
  }

  @action
  showModal() {
    this.show = true;
  }

  @action
  onShow(modal) {
    console.log('onShow', modal);
  }

  @action
  onClose(modal) {
    console.log('onClose', modal);
  }
}
