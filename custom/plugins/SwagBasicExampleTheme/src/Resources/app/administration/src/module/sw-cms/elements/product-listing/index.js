/**
 * @private
 * @sw-package discovery
 */
Shopware.Component.override('sw-cms-el-config-product-listing', () => import('./config'));

let productListingConfig = Shopware.Service('cmsService').getCmsElementConfigByName('product-listing');

productListingConfig.defaultConfig.styleType = {
    source: 'static',
    value: 'standard'
}

Shopware.Service('cmsService').registerCmsElement(productListingConfig);

