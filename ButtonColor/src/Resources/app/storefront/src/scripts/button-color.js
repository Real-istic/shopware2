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
    }

    _openOffCanvasCart(instance, requestUrl, formData) {
        this._client.post(requestUrl, formData, this._afterAddItemToCart.bind(this))
    }

    _afterAddItemToCart() {
        this._refreshCartValue()
        this._changeButtonAppearance()
    }

    _changeButtonAppearance() {
        const cartWidgetEl = DomAccess.querySelector(this._cartEl, '.btn-primary')
        cartWidgetEl.classList.add('confirm-color')
        cartWidgetEl.innerText = 'Wird in den Warenkorb gelegt'

        setTimeout(() => {
            cartWidgetEl.classList.remove('confirm-color')
            cartWidgetEl.innerText = 'In den Warenkorb'
        }, 1000);
    }

    _refreshCartValue() {
        const cartWidgetEl = DomAccess.querySelector(this._cartEL2, '[data-cart-widget]')
        const cartWidgetInstance = this.PluginManager.getPluginInstanceFromElement(cartWidgetEl, 'CartWidget')
        cartWidgetInstance.fetch()
    }


}
