import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'custom-banner-slider',
    label: 'sw-cms.elements.custom-banner-slider.label',
    component: 'sw-cms-el-component-custom-banner-slider',
    configComponent: 'sw-cms-el-config-custom-banner-slider',
    previewComponent: 'sw-cms-el-preview-custom-banner-slider',
    defaultConfig: {
        slides: {
            source: 'static',
            value: []
        }
    },
    defaultData: {}
});