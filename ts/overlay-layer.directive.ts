import {
    Attribute,
    Directive,
    OnDestroy,
} from '@angular/core';
import { LayerProvider } from './layer.provider';
import { LayersControlProvider } from './layers-control.provider';

/**
 * Angular2 directive for adding layers to the layers-control of Leaflet as base-layer.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-layers-control>
 *         <!-- This can be any other layer... -->
 *         <yaga-tile-layer yaga-overlay-layer="Transparent OSM"></yaga-tile-layer>
 *     </yaga-attribution-control>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#control-layers-addoverlay Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Overlay-Layer%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/overlay-layer.directive.js.html
 * Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/overlaylayerdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/layers-control-directive/
 */
@Directive({
    selector: '[yaga-overlay-layer]',
})
export class OverlayLayerDirective implements OnDestroy  {
    constructor(
        protected layer: LayerProvider,
        @Attribute('yaga-overlay-layer') public readonly name: string,
        public layersControlProvider: LayersControlProvider,
    ) {
        this.layersControlProvider.ref.addOverlay(this.layer.ref, name);
    }

    /**
     * Internal method to provide the removal from the control in Leaflet, when removing it from the Angular template
     */
    public ngOnDestroy(): void {
        this.layersControlProvider.ref.removeLayer(this.layer.ref);
    }
}
