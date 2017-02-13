/// <reference path="../typings/index.d.ts" />

import { MarkerDirective,
    MapComponent,
    LatLng,
    PopupDirective,
    TooltipDirective,
    IconDirective,
    TRANSPARENT_PIXEL } from './index';
import { point, latLng } from 'leaflet';
import { expect } from 'chai';

function hasAsChild(root: HTMLElement, child: HTMLElement): boolean {
    'use strict';
    const length: number = root.children.length;
    for (let i: number = 0; i < length; i += 1) {
        /* istanbul ignore else */
        if (root.children.item(i) === child) {
            return true;
        }
    }
    return false;
}

describe('Marker Directive', () => {
    let map: MapComponent,
        layer: MarkerDirective;
    beforeEach(() => {
        map = new MapComponent({nativeElement: document.createElement('div')});
        (<any>map)._size = point(100, 100);
        (<any>map)._pixelOrigin = point(50, 50);
        layer = new MarkerDirective(map);
    });
    describe('[(display)]', () => {
        it('should remove DOM container when not displaying', () => {
            layer.display = false;

            expect(hasAsChild(layer.getPane(), layer.getElement())).to.equal(false);
        });
        it('should re-add DOM container when display is true again', () => {
            layer.display = false;
            layer.display = true;

            expect(hasAsChild(layer.getPane(), layer.getElement())).to.equal(true);
        });
        it('should remove EventListeners when not displaying', (done: MochaDone) => {
            const zoomEvents: {fn: Function}[] = (<any>map)._events.zoom,
                length: number = zoomEvents.length,
                originalEventListener: Function = layer.getEvents()['zoom'];

            layer.display = false;

            for (let i: number = 0; i < length; i += 1) {
                /* istanbul ignore if */
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done(new Error('There is still an event on listener'));
                }
            }
            done();
        });
        it('should re-add EventListeners when display is true again', (done: MochaDone) => {
            const zoomEvents: {fn: Function}[] = (<any>map)._events.zoom,
                length: number = zoomEvents.length,
                originalEventListener: Function = layer.getEvents()['zoom'];

            layer.display = false;
            layer.display = true;

            for (let i: number = 0; i < length; i += 1) {
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done();
                }
            }
        });
        it('should set to false by removing from map', (done: MochaDone) => {

            layer.displayChange.subscribe((val: boolean) => {
                expect(val).to.equal(false);
                expect(layer.display).to.equal(false);
                done();
            });

            map.removeLayer(layer);
        });
        it('should set to true when adding to map again', (done: MochaDone) => {
            map.removeLayer(layer);
            layer.displayChange.subscribe((val: boolean) => {
                expect(val).to.equal(true);
                expect(layer.display).to.equal(true);
                done();
            });

            map.addLayer(layer);
        });
    });
    describe('[(opacity)]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random();
            layer.opacity = val;
            expect(layer.options.opacity).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random();
            layer.opacity = val;
            expect(layer.opacity).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random();
            layer.setOpacity(val);
            expect(layer.opacity).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random();

            layer.opacityChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.opacity = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random();

            layer.opacityChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.setOpacity(val);
        });
    });

    describe('[(lat)]', () => {
        beforeEach(() => {
            layer.ngAfterViewInit();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lat = val;
            expect(layer.getLatLng().lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lat = val;
            expect(layer.lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            layer.setLatLng([val, 0]);
            expect(layer.lat).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.lat = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.latChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });


            layer.setLatLng([val, 0]);
        });
    });
    describe('[(lng)]', () => {
        beforeEach(() => {
            layer.ngAfterViewInit();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lng = val;
            expect(layer.getLatLng().lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.random() * 100;
            layer.lng = val;
            expect(layer.lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: number = Math.random() * 100;
            layer.setLatLng([0, val]);
            expect(layer.lng).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });

            layer.lng = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: number = Math.random() * 100;

            layer.lngChange.subscribe((eventVal: number) => {
                expect(eventVal).to.equal(val);
                return done();
            });


            layer.setLatLng([0, val]);
        });
    });
    describe('[(position)]', () => {
        beforeEach(() => {
            layer.ngAfterViewInit();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            layer.position = val;
            expect(layer.getLatLng()).to.deep.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            layer.position = val;
            expect(layer.position).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);
            layer.setLatLng(val);
            expect(layer.position).to.equal(val);
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);

            layer.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.deep.equal(val);
                return done();
            });

            layer.position = val;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            const val: LatLng = latLng(Math.random() * 100 - 50, Math.random() * 100 - 50);

            layer.positionChange.subscribe((eventVal: LatLng) => {
                expect(eventVal).to.deep.equal(val);
                return done();
            });

            layer.setLatLng(val);
        });
    });

    // TODO: icon
    describe('[title]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'http://test';
            layer.title = val;
            expect(layer.options.title).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'http://test';
            layer.title = val;
            expect(layer.title).to.equal(val);
        });
    });
    describe('[alt]', () => {
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = 'http://test';
            layer.alt = val;
            expect(layer.options.alt).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = 'http://test';
            layer.alt = val;
            expect(layer.alt).to.equal(val);
        });
    });

    describe('[draggable]', () => {
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.draggable = false;
            expect(layer.dragging.enabled()).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.dragging.disable();
            layer.draggable = true;
            expect(layer.dragging.enabled()).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.draggable = false;
            expect(layer.draggable).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.draggable = true;
            expect(layer.draggable).to.equal(true);
        });
    });

    // Events
    describe('(dragend)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.dragendEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('dragend', testEvent);
        });
    });
    describe('(dragstart)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.dragstartEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('dragstart', testEvent);
        });
    });
    describe('(movestart)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.movestartEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('movestart', testEvent);
        });
    });
    describe('(drag)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.dragEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('drag', testEvent);
        });
    });
    describe('(moveend)', () => {
        it('should fire event in Angular when firing event in Leaflet', (done: MochaDone) => {
            const testHandle: any = {},
                testEvent: any = { testHandle };
            layer.moveendEvent.subscribe((event: any) => {
                expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('moveend', testEvent);
        });
    });

    describe('Popup in Marker Directive', () => {
        let layerWithPopup: MarkerDirective,
            popup: PopupDirective,
            testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            popup = new PopupDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layerWithPopup = Object.create(new MarkerDirective(map), { popupDirective: {value: popup} });
            layerWithPopup.ngAfterViewInit();
        });
        it('should bind popup', () => {
            if (!(<any>layerWithPopup)._popup) {
                throw new Error('There is no popup binded');
            }
            if ((<any>layerWithPopup)._popup !== popup) {
                throw new Error('There is a wrong popup binded');
            }
        });
    });

    describe('Tooltip in Marker Directive', () => {
        let layerWithTooltip: MarkerDirective,
            tooltip: TooltipDirective,
            testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            tooltip = new TooltipDirective(map, { nativeElement: testDiv });

            // Hack to get write-access to readonly property
            layerWithTooltip = Object.create(new MarkerDirective(map), { tooltipDirective: {value: tooltip} });
            layerWithTooltip.ngAfterViewInit();
        });
        it('should bind tooltip', () => {
            if (!(<any>layerWithTooltip)._tooltip) {
                throw new Error('There is no tooltip binded');
            }
            if ((<any>layerWithTooltip)._tooltip !== tooltip) {
                throw new Error('There is a wrong tooltip binded');
            }
        });

    });

    describe('Icon in Marker Directive', () => {
        let layerWithIcon: MarkerDirective,
            icon: IconDirective,
            testDiv: HTMLElement;
        before(() => {
            testDiv = document.createElement('div');
            icon = new IconDirective();
            icon.iconUrl = TRANSPARENT_PIXEL;

            // Hack to get write-access to readonly property
            layerWithIcon = Object.create(new MarkerDirective(map), { iconDirective: {value: icon} });

            layerWithIcon.ngAfterViewInit();
        });
        it('should bind icon', () => {
            if (!(<any>layerWithIcon)._icon) {
                throw new Error('There is no icon binded');
            }
            if ((<HTMLElement>(<any>layerWithIcon)._icon).getAttribute('src') !== TRANSPARENT_PIXEL) {
                throw new Error('There is a wrong icon binded');
            }
        });
        it('should bind icon again on changes in icon directive', () => {
            const TEST_VALUE: string = 'path/to/icon.png';
            icon.iconUrl = TEST_VALUE;

            if (!(<any>layerWithIcon)._icon) {
                throw new Error('There is no icon binded');
            }
            if ((<HTMLElement>(<any>layerWithIcon)._icon).getAttribute('src') !== TEST_VALUE) {
                throw new Error('There is a wrong icon binded');
            }
        });

    });

    describe('Destroying a Marker Directive', () => {
        it('should remove Marker Directive from map on destroy', () => {
            expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            expect(map.hasLayer(layer)).to.equal(false);
        });
    });
});
