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
        boxLayoutOptions() {
            return [
                {
                    id: 1,
                    value: 'standard',
                    label: this.$tc('sw-cms.elements.productBox.config.label.layoutTypeStandard'),
                },
                {
                    id: 2,
                    value: 'image',
                    label: this.$tc('sw-cms.elements.productBox.config.label.layoutTypeImage'),
                },
                {
                    id: 3,
                    value: 'minimal',
                    label: this.$tc('sw-cms.elements.productBox.config.label.layoutTypeMinimal'),
                },
                {
                    id: 4,
                    value: 'custom',
                    label: this.$tc('sw-cms.elements.productBox.config.label.layoutTypeCustom'),
                }
            ];
        },

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
