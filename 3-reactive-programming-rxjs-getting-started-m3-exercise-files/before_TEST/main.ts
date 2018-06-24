import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { from } from 'rxjs/Observable/from';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import  'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

interface IobjectXY {
    x: number;
    y: number;
}

let circle: HTMLElement = document.getElementById('circle');
let source2 = fromEvent( document, 'mousemove' )
.map((e: MouseEvent) => {
    return {
        x: e.clientX,
        y: e.clientY
    };
})
.filter((value: IobjectXY) => {
    return value.x < 500;
})
.delay(300);

// .map((n: any): number => {
//     return n * 2;
// })
// .filter((n: number): boolean => {
//     return n > 8;
// });

source2.subscribe(
    (value: IobjectXY) => {
        let circle: HTMLElement = document.getElementById('circle');

        circle.style.left = String(value.x);
        circle.style.top = String(value.y);

        
    },
    e => console.log(`we habe an error: ${e}`),
    () => console.log(`action completed`)

);
