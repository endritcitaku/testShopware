import DomAccess from 'src/helper/dom-access.helper';
import FormSerializeUtil from 'src/utility/form/form-serialize.util';
import HttpClient from 'src/service/http-client.service';
import PageLoadingIndicatorUtil from 'src/utility/loading-indicator/page-loading-indicator.util';
import SwagPaypalAbstractButtons from '../swag-paypal.abstract-buttons';
import ElementLoadingIndicatorUtil from 'src/utility/loading-indicator/element-loading-indicator.util';

export default class SwagPaypalAbstractStandalone extends SwagPaypalAbstractButtons {
    static product = 'spb';

    static options = {
        ...super.options,

        /**
         * Is set, if the plugin is used on the order edit page
         *
         * @type string|null
         */
        orderId: null,

        /**
         * Selector of the order confirm form
         *
         * @type string
         */
        confirmOrderFormSelector: '#confirmOrderForm',

        /**
         * Selector of the submit button of the order confirm form
         *
         * @type string
         */
        confirmOrderButtonSelector: 'button[type="submit"]',

        /**
         * If set to true, the payment method caused an error and already reloaded the page.
         * This could for example happen if the funding type is not eligible.
         *
         * @type boolean
         */
        preventErrorReload: false,

        /**
         * The brand name of the shop
         *
         * @type string
         */
        brandName: '',
    };

    init() {
        this.confirmOrderForm = DomAccess.querySelector(document, this.options.confirmOrderFormSelector);

        if (this.options.preventErrorReload) {
            DomAccess.querySelector(this.confirmOrderForm, this.options.confirmOrderButtonSelector).disabled = 'disabled';

            return;
        } else {
            ElementLoadingIndicatorUtil.create(this.el);
        }

        DomAccess.querySelector(this.confirmOrderForm, this.options.confirmOrderButtonSelector).classList.add('d-none');

        this._client = new HttpClient();

        this.createScript(async (paypal) => {
            // catch sync and async errors - `.catch()` or similar aren't able to do so
            try {
                await this.render(paypal);
            } catch (error) {
                this.handleError(this.SCRIPT_ERROR, true, error);
            }
            ElementLoadingIndicatorUtil.remove(this.el);
        });
    }

    render(paypal) {
        const button = paypal.Buttons(this.getButtonConfig(this.getFundingSource(paypal)));

        if (!button.isEligible()) {
            return void this.handleError(this.NOT_ELIGIBLE, true, `Funding for PayPal button is not eligible (${this.getFundingSource(paypal)})`);
        }

        button.render(this.el);
    }

    /**
     * Adjust this to the specific payment method
     */
    getFundingSource(paypal) {
        return paypal.FUNDING.PAYPAL;
    }

    getButtonConfig(fundingSource) {
        return {
            fundingSource,

            style: {
                size: this.options.buttonSize,
                shape: this.options.buttonShape,
                color: this.options.buttonColor,
                label: 'pay',
            },

            /**
             * Will be called if when the payment process starts
             */
            createOrder: this.createOrder.bind(this, this.constructor.product),

            /**
             * Will be called if the payment process is approved by paypal
             */
            onApprove: this.onApprove.bind(this),

            /**
             * Remove loading spinner when user comes back
             */
            onCancel: this.onCancel.bind(this),

            /**
             * Check form validity & show loading spinner on confirm click
             */
            onClick: this.onClick.bind(this),

            /**
             * Will be called if an error occurs during the payment process.
             */
            onError: this.onError.bind(this),
        };
    }

    /**
     * @param {String} product
     *
     * @return {Promise<String>}
     */
    createOrder(product) {
        const formData = FormSerializeUtil.serialize(this.confirmOrderForm);
        formData.set('product', product);

        const orderId = this.options.orderId;
        if (orderId !== null) {
            formData.set('orderId', orderId);
        }

        return new Promise((resolve, reject) => {
            this._client.post(
                this.options.createOrderUrl,
                formData,
                (responseText, request) => {
                    if (request.status >= 400) {
                        reject(responseText);
                    }

                    try {
                        const response = JSON.parse(responseText);
                        resolve(response.token);
                    } catch (error) {
                        reject(error);
                    }
                },
            );
        });
    }

    /**
     * @param {Object} data
     * @param {String} data.orderID PayPal order id
     */
    onApprove(data) {
        const existingInput = this.confirmOrderForm.querySelector('[name="paypalOrderId"]');
        if (existingInput) {
            return;
        }

        PageLoadingIndicatorUtil.create();

        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', 'paypalOrderId');
        input.setAttribute('value', data.orderID ?? data.orderId);

        this.confirmOrderForm.appendChild(input);
        this.confirmOrderForm.submit();
    }

    /**
     * Triggers the form validation
     * @param _
     * @param {{reject: Function, resolve: Function}} actions
     * @returns {*}
     */
    onClick(_, actions) {
        if (!this.confirmOrderForm.reportValidity()) {
            return actions.reject();
        }

        return actions.resolve();
    }
}
