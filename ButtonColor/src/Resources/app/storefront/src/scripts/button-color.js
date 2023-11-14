import AddToCart from 'src/plugin/add-to-cart/add-to-cart.plugin'
import DomAccess from 'src/helper/dom-access.helper'
import HttpClient from 'src/service/http-client.service'

export default class ButtonColor extends AddToCart {
    init() {
        this.PluginManager = window.PluginManager
        this._cartEl = DomAccess.querySelector(document, '[data-add-to-cart]')
        this._cartEL2 = DomAccess.querySelector(document, '.header-cart')
        this._client = new HttpClient(window.accessKey, window.contextToken)
        super.init()

        Array.from(document.querySelectorAll('.btn-buy')).forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault();
                this._buttonClicked(event.target);
            });
        });
    }

    _refreshCartValue() {
        const cartWidgetEl = DomAccess.querySelector(this._cartEL2, '[data-cart-widget]')
        const cartWidgetInstance = this.PluginManager.getPluginInstanceFromElement(cartWidgetEl, 'CartWidget')
        cartWidgetInstance.fetch()
    }

    _buttonClicked(button) {
        this._openOffCanvasCart(button);
    }
    
    _openOffCanvasCart(button) {
        const requestUrl = button.form.action;
        const formData = new FormData(button.form);
        this._client.post(requestUrl, formData, this._afterAddItemToCart.bind(this, button))
    }
    
    _afterAddItemToCart(button) {
        this._refreshCartValue()
        this._changeButtonAppearance(button)
    }
    
    _changeButtonAppearance(button) {
        button.classList.add('confirm-color')
        button.innerText = 'Wird in den Warenkorb gelegt'
    
        setTimeout(() => {
            button.classList.remove('confirm-color')
            button.innerText = 'In den Warenkorb'
        }, 1000)
    }
}
