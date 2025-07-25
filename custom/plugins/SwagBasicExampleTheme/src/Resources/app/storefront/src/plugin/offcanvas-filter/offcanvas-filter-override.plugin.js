import OffCanvasFilter from 'src/plugin/offcanvas-filter/offcanvas-filter.plugin.js';
import OffCanvas from 'src/plugin/offcanvas/offcanvas.plugin';
import DomAccess from 'src/helper/dom-access.helper';
export default class OffcanvasFilterOverridePlugin extends OffCanvasFilter {
    init() {
        super.init();
    }

    _onClickOffCanvasFilter(event) {
        event.preventDefault();

        const filterContent = document.querySelector('[data-off-canvas-filter-content="true"]');

        if (!filterContent) {
            throw Error('There was no DOM element with the data attribute "data-offcanvas-filter-content".');
        }

        OffCanvas.open(
            filterContent.innerHTML,
            () => {},
            'left',
            true,
            OffCanvas.REMOVE_OFF_CANVAS_DELAY(),
            false,
            'offcanvas-filter'
        );

        const filterPanel = DomAccess.querySelector(filterContent, '.filter-panel');

        // move filter from original place to offcanvas
        filterPanel.remove();

        window.PluginManager.getPluginInstances('Listing')[0].refreshRegistry();
        document.$emitter.subscribe('onCloseOffcanvas', this._onCloseOffCanvas.bind(this));

        this.$emitter.publish('onClickOffCanvasFilter');
    }
}