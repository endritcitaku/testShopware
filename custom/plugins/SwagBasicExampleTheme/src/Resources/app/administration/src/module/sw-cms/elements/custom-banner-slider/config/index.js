import template from './sw-cms-el-config-custom-banner-slider.html.twig';
import './sw-cms-el-config-custom-banner-slider.scss';

const {Component, Mixin} = Shopware;

Component.register('sw-cms-el-config-custom-banner-slider', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element')
    ],

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('custom-banner-slider');
        }
    },
});