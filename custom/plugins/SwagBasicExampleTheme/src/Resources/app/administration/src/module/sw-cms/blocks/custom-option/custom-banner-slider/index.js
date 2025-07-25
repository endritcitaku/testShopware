import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'custom-banner-slider',
    label: 'sw-cms.blocks.custom-banner-slider.label',
    category: 'custom-option',
    component: 'sw-cms-block-custom-banner-slider',
    previewComponent: 'sw-cms-preview-custom-banner-slider',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        content: 'custom-banner-slider'
    }
});