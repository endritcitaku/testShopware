const PluginManager = window.PluginManager;
PluginManager.override('OffCanvasFilter', () => import('./plugin/offcanvas-filter/offcanvas-filter-override.plugin'), '[data-off-canvas-filter]');