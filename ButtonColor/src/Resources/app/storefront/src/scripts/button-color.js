import AddToCart from 'src/plugin/add-to-cart/add-to-cart.plugin'
import DomAccess from 'src/helper/dom-access.helper'
import HttpClient from 'src/service/http-client.service'

export default class ButtonColor extends AddToCart {
    init() {
        this._cartEl = DomAccess.querySelector(document, '[data-add-to-cart]')
        this._client = new HttpClient(window.accessKey, window.contextToken)
        super.init()
    }

    _openOffCanvasCart(instance, requestUrl, formData) {
        this._client.post(requestUrl, formData, this._afterAddItemToCart.bind(this))
    }

    _afterAddItemToCart() {
        this._changeButtonText()

        this._changeColor()
    }

    _changeButtonText() {
        const cartWidgetEl = DomAccess.querySelector(this._cartEl, '.btn-buy')
        // console.info(cartWidgetEl)
    }

    _changeColor() {
        const cartWidgetEl = DomAccess.querySelector(this._cartEl, '.btn-buy')
        // this._cartEl.classList.add('confim-color')
        cartWidgetEl.classList.add('confim-color')
        setTimeout(() => {
            cartWidgetEl.classList.remove('confim-color')
        }, 1000);
    }
}
