import { modifier } from 'ember-modifier';

export default modifier(function clickToOverlay(element, [check] /*, hash*/) {
  if (check) {
    element.dataset.micromodalClose = true;
  }
});
