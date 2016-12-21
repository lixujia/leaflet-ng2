/// <reference path="../typings/index.d.ts" />

import { IconDirective,
    MapComponent,
    IconOptions, Point } from './index';
import { point, latLng, LatLng, Event } from 'leaflet';
import { TRANSPARENT_PIXEL } from './consts';

const EXAMPLE_CONTENT: string = 'Vel ipsum odit quia velit omnis illo voluptatem ut. Aperiam porro voluptates maiores.';

describe('Icon Directive', () => {
    // Events
    describe('(update)', () => {
        var map: MapComponent,
            icon: IconDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            icon = new IconDirective();
            return done();
        });
        it('should fire event in Angular when changing', (done: MochaDone) => {
            icon.updateEvent.subscribe((event: any) => {
                /* istanbul ignore if */
                if (event.target !== icon) {
                    return done(new Error('Wrong event returned'));
                }
                return done();
            });
            icon.iconUrl = TRANSPARENT_PIXEL;
        });
    });

    // Inputs
    describe('[iconUrl]', () => {
        var map: MapComponent,
            icon: IconDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            icon = new IconDirective();
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = TRANSPARENT_PIXEL;
            icon.iconUrl = val;
            /* istanbul ignore if */
            if ((<IconOptions>(<any>icon).options).iconUrl !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ (<IconOptions>(<any>icon).options).iconUrl }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = TRANSPARENT_PIXEL;
            icon.iconUrl = val;
            /* istanbul ignore if */
            if (icon.iconUrl !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.iconUrl }`);
            }
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: string = TRANSPARENT_PIXEL;
            icon.updateEvent.subscribe((ev: Event) => {
                /* istanbul ignore if */
                if (ev.target !== icon) {
                    return done(new Error('Wrong Event fired...'));
                }
                return done();
            });
            icon.iconUrl = val;
        });
    });
    describe('[iconSize]', () => {
        var map: MapComponent,
            icon: IconDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            icon = new IconDirective();
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.iconSize = val;
            /* istanbul ignore if */
            if ((<IconOptions>(<any>icon).options).iconSize !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ (<IconOptions>(<any>icon).options).iconSize }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.iconSize = val;
            /* istanbul ignore if */
            if (icon.iconSize !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.iconSize }`);
            }
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                /* istanbul ignore if */
                if (ev.target !== icon) {
                    return done(new Error('Wrong Event fired...'));
                }
                return done();
            });
            icon.iconSize = val;
        });
    });
    describe('[iconAnchor]', () => {
        var map: MapComponent,
            icon: IconDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            icon = new IconDirective();
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.iconAnchor = val;
            /* istanbul ignore if */
            if ((<IconOptions>(<any>icon).options).iconAnchor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ (<IconOptions>(<any>icon).options).iconAnchor }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.iconAnchor = val;
            /* istanbul ignore if */
            if (icon.iconAnchor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.iconAnchor }`);
            }
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                /* istanbul ignore if */
                if (ev.target !== icon) {
                    return done(new Error('Wrong Event fired...'));
                }
                return done();
            });
            icon.iconAnchor = val;
        });
    });
    describe('[popupAnchor]', () => {
        var map: MapComponent,
            icon: IconDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            icon = new IconDirective();
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.popupAnchor = val;
            /* istanbul ignore if */
            if ((<IconOptions>(<any>icon).options).popupAnchor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ (<IconOptions>(<any>icon).options).popupAnchor }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.popupAnchor = val;
            /* istanbul ignore if */
            if (icon.popupAnchor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.popupAnchor }`);
            }
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                /* istanbul ignore if */
                if (ev.target !== icon) {
                    return done(new Error('Wrong Event fired...'));
                }
                return done();
            });
            icon.popupAnchor = val;
        });
    });
    describe('[shadowUrl]', () => {
        var map: MapComponent,
            icon: IconDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            icon = new IconDirective();
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: string = TRANSPARENT_PIXEL;
            icon.shadowUrl = val;
            /* istanbul ignore if */
            if ((<IconOptions>(<any>icon).options).shadowUrl !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ (<IconOptions>(<any>icon).options).shadowUrl }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: string = TRANSPARENT_PIXEL;
            icon.shadowUrl = val;
            /* istanbul ignore if */
            if (icon.shadowUrl !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.shadowUrl }`);
            }
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: string = TRANSPARENT_PIXEL;
            icon.updateEvent.subscribe((ev: Event) => {
                /* istanbul ignore if */
                if (ev.target !== icon) {
                    return done(new Error('Wrong Event fired...'));
                }
                return done();
            });
            icon.shadowUrl = val;
        });
    });
    describe('[shadowSize]', () => {
        var map: MapComponent,
            icon: IconDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            icon = new IconDirective();
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.shadowSize = val;
            /* istanbul ignore if */
            if ((<IconOptions>(<any>icon).options).shadowSize !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ (<IconOptions>(<any>icon).options).shadowSize }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.shadowSize = val;
            /* istanbul ignore if */
            if (icon.shadowSize !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.shadowSize }`);
            }
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                /* istanbul ignore if */
                if (ev.target !== icon) {
                    return done(new Error('Wrong Event fired...'));
                }
                return done();
            });
            icon.shadowSize = val;
        });
    });
    describe('[shadowAnchor]', () => {
        var map: MapComponent,
            icon: IconDirective;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            icon = new IconDirective();
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.shadowAnchor = val;
            /* istanbul ignore if */
            if ((<IconOptions>(<any>icon).options).shadowAnchor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ (<IconOptions>(<any>icon).options).shadowAnchor }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.shadowAnchor = val;
            /* istanbul ignore if */
            if (icon.shadowAnchor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ icon.shadowAnchor }`);
            }
        });
        it('should fire an event in Angular when changing in Angular', (done: MochaDone) => {
            const val: Point = point(Math.random() * 100, Math.random() * 100);
            icon.updateEvent.subscribe((ev: Event) => {
                /* istanbul ignore if */
                if (ev.target !== icon) {
                    return done(new Error('Wrong Event fired...'));
                }
                return done();
            });
            icon.shadowAnchor = val;
        });
    });
});