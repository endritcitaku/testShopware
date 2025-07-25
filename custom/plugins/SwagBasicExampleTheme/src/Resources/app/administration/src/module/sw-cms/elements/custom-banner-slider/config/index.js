import template from './sw-cms-el-config-custom-banner-slider.html.twig';
import './sw-cms-el-config-custom-banner-slider.scss';

const {Component, Mixin} = Shopware;

Component.register('sw-cms-el-config-custom-banner-slider', {
    template,

    inject: ['repositoryFactory','mediaService'],

    mixins: [
        Mixin.getByName('cms-element')
    ],

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null,
            openedMediaModalIndex: null
        };
    },

    created() {
        this.createdComponent();
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },
    },

    methods: {
        createdComponent() {
            this.initElementConfig('custom-banner-slider');
        },

        uploadTag(index) {
            return `cms-element-media-config-${this.element.id}-${index}`;
        },

        fileAccept() {
            return "image/*";
        },

        addNewElement() {
            this.element.config.slides.value.push(this.getEmptyElement())
        },

        removeElement(index) {
            this.element.config.slides.value.splice(index, 1);
        },

        getEmptyElement() {
            return {
                image: {
                    source: 'static',
                    value: null,
                    entity: {
                        name: 'media'
                    }
                },
                title: {
                    source: 'static',
                    value: ''
                },
                text: {
                    source: 'static',
                    value: ''
                },
                activeBtn: {
                    source: 'static',
                    value: false
                },
                link: {
                    source: 'static',
                    value: null
                },
                nameBtn: {
                    source: 'static',
                    value: ''
                },
            };
        },

        onImageRemove(index) {
            this.element.config.slides.value[index].image.value = null;

            this.$emit('element-update', this.element);
        },


        onSelectionChanges(mediaEntity) {
            this.element.config.slides.value[this.openedMediaModalIndex].image.value = mediaEntity[0];

            this.$emit('element-update', this.element);
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
            this.openedMediaModalIndex = null;
        },

        async onImageUploadFinish({ targetId }, index) {
            const mediaEntity = await this.mediaRepository.get(targetId, Shopware.Context.api);

            this.element.config.slides.value[index].image.value = mediaEntity;

            this.$emit('element-update', this.element);
        },

        previewSource(index) {
            if (null !== this.element.config.slides.value[index].image
                && null !== this.element.config.slides.value[index].image.value) {
                return this.element.config.slides.value[index].image.value.id;
            }

            return null;
        },

        onOpenMediaModal(index) {
            this.mediaModalIsOpen = true;
            this.openedMediaModalIndex = index;
        }
    },
});