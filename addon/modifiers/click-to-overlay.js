import { modifier } from 'ember-modifier';

export default modifier(
  (element, [check]) => {
    if (check) {
      element.dataset.micromodalClose = true;
    }
  },
  { eager: false }
);
