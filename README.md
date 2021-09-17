ember-micro-modal
==============================================================================

Ember addon for [MicroModal](https://micromodal.now.sh/) modal library.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-micro-modal
```

CSS is not included by default. If you want to apply [default styles](https://gist.github.com/ghosh/4f94cf497d7090359a5c9f81caf60699#file-micromodal-css) just include to your ```app.css``` like ```@import 'micro-modal.css'``` or in scss, less ```@import 'micro-modal'```.

To see [default modal html structure](https://gist.github.com/ghosh/4f94cf497d7090359a5c9f81caf60699#file-micromodal-html).

Usage
------------------------------------------------------------------------------
You can change all global configuration settings via `config/environment.js` file.

Please check [MicroModal](https://micromodal.now.sh/#configuration) site for more configuration details.

```javascript
ENV["ember-micro-modal"] = {
  onShow: modal => console.info(`${modal.id} is shown`),
  onClose: modal => console.info(`${modal.id} is hidden`),
  openTrigger: 'data-custom-open',
  closeTrigger: 'data-custom-close',
  openClass: 'is-open',
  disableScroll: true,
  disableFocus: false,
  awaitOpenAnimation: false,
  awaitCloseAnimation: false,
  debugMode: true
};
```

There are also 2 parameters. @show and @clickToOverlay.
@show parameter simply responsible to modal visibility. If value is true modal will be visible.
@clickToOverlay parameter is responsible to whether modal overlay clickable or not. If value is true overlay click will close the modal.


```handlebars
<MicroModal @show={{this.show}} @onShow={{fn this.onShow}} @onClose={{fn this.onClose}} as |modal|>
  <modal.container class="col-6" as |container|>
    <container.header class="col">
      <h2 class="modal__title">
        Micromodal
      </h2>
      <button type="button" class="modal__close" aria-label="Close modal" data-micromodal-close></button>
    </container.header>
    <container.content class="col">
      <p>
        Try hitting the
        <code>
          tab
        </code>
        key and notice how the focus stays within the modal itself. Also,
        <code>
          esc
        </code>
        to close modal.
      </p>
    </container.content>
    <container.footer class="col">
      <button type="button" class="modal__btn modal__btn-primary">
        Continue
      </button>
      <button type="button" class="modal__btn" aria-label="Close this dialog window" data-micromodal-close>
        Close
      </button>
    </container.footer>
  </modal.container>
</MicroModal>
<button type="button" {{on 'click' this.showModal}}>
  Show
</button>
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.
I'm sorry that i don't have time to write tests. Please report if you find any issue.

Thanks.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
