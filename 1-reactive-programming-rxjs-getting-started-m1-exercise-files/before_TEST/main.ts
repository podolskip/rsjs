// import { Observer, Subject, ReplaySubject,  of, range } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { from } from 'rxjs/Observable/from';
import  'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


// window.alert('ok!!!!');

let nrArr = [1, 4, 5];

// 1st option to implement observable
let source = from(nrArr);
let source2 = Observable.create(observer => {
    
    // for (let n of nrArr) {
    //     observer.next(n);
    // }

    // observer.complete();

    let index = 0;
    let produceValur = () => {
        observer.next(nrArr[index++]);

        if ( index < nrArr.length ) {
            setTimeout(produceValur, 2000);
        } else {
            observer.complete();
        }

    }

    produceValur();
}).map((n: any): number => {
    return n * 2;
})
.filter((n: number): boolean => {
    return n > 8;
});




class MyObserver implements Observer<number> {
    next(value: number) {
        console.log(`value ${value}`);
    }

    error(e: any) {
        console.log(`we habe an error: ${e}`);
    }

    complete() {
        console.log(`action completed`);
    }
}

// 1st option to implement observer
// source.subscribe(new MyObserver());

// // 2nd Option to implement observer
// source.subscribe(
//     value => console.log(`value ${value}`),
//     e => console.log(`we habe an error: ${e}`),
//     () => console.log(`action completed`)

// );
source2.subscribe(
    value => console.log(`value ${value}`),
    e => console.log(`we habe an error: ${e}`),
    () => console.log(`action completed`)

);