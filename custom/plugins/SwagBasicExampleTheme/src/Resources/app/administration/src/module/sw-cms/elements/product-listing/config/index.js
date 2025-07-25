import template from './sw-cms-el-config-product-listing.html.twig';
import './sw-cms-el-config-product-listing.scss';

const { Mixin } = Shopware;
const { Criteria, EntityCollection } = Shopware.Data;

/**
 * @private
 * @sw-package discovery
 */
export default {
    template,

    computed: {
        styleOptions() {
            return [
                {
                    id: 1,
                    value: 'standard',
                    label: this.$tc('sw-cms.elements.productBox.config.label.layoutTypeStandard'),
                },
                {
                    id: 2,
                    value: 'custom-grid',
                    label: this.$tc('sw-cms.elements.productBox.config.label.customGridType'),
                }
            ];
        },
    }
};
