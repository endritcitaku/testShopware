import template from './sw-cms-el-component-custom-banner-slider.html.twig';
import './sw-cms-el-component-custom-banner-slider.scss';

const {Component, Mixin} = Shopware;

Component.register('sw-cms-el-component-custom-banner-slider', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('custom-banner-slider');
            this.initElementData('custom-banner-slider');
        },
    },
});