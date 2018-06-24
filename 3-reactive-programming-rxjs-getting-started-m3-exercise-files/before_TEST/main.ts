import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { from } from 'rxjs/Observable/from';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import  'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import { Subscriber } from 'rxjs';

interface IobjectXY {
    x: number;
    y: number;
}

interface Imovie {
    title: string;
}

// let source2 = fromEvent( document.getElementById("getMoviesBtn"), 'click' )
// .map((e: MouseEvent) => {
//     console.log(e);
//     // return {
//     //     x: e.clientX,
//     //     y: e.clientY
//     // };
// })
// // .filter((value: IobjectXY) => {
// //     return value.x < 500;
// // })
// // .delay(300);

// // .map((n: any): number => {
// //     return n * 2;
// // })
// // .filter((n: number): boolean => {
// //     return n > 8;
// // });


// let load = (url: string) => {
//     let xhr: XMLHttpRequest = new XMLHttpRequest();

//     xhr.addEventListener("load",() => {
//         let movies: Array<Imovie> = JSON.parse(xhr.responseText);

//         movies.forEach((movie: Imovie) => {
//             let div: HTMLElement = document.createElement("div");
//             div.innerText = movie.title;
//             (document.getElementById("output") as HTMLElement).appendChild(div);
//         });
//     });

//     xhr.open("GET", url);
//     xhr.send();
// }
// source2.subscribe(
//     (value) => {
//         return load("movies.json");
//         // let outputDiv: HTMLElement = document.getElementById('output');

//         // circle.style.left = String(value.x);
//         // circle.style.top = String(value.y);

        
//     },
//     e => console.log(`we habe an error: ${e}`),
//     () => console.log(`action completed`)

// );


let source2 = fromEvent( document.getElementById("getMoviesBtn"), 'click' );



let load = (url: string) => {
    return Observable.create(observer => {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
    
        xhr.addEventListener("load",() => {
            let data: Array<Imovie> = JSON.parse(xhr.responseText);   
            observer.next(data);
        });
    
        xhr.open("GET", url);
        xhr.send();

    })
}

const renderMovies = (movies: Array<Imovie>) => {
    movies.forEach((movie: Imovie) => {
        let div: HTMLElement = document.createElement("div");
        div.innerText = movie.title;
        (document.getElementById("output") as HTMLElement).appendChild(div);
    });
}


source2.mergeMap(e => load("movies.json"))
.subscribe(
    (movies: Array<Imovie>) => {
        return renderMovies(movies);
        // let outputDiv: HTMLElement = document.getElementById('output');

        // circle.style.left = String(value.x);
        // circle.style.top = String(value.y);

        
    },
    e => console.log(`we habe an error: ${e}`),
    () => console.log(`action completed`)

);
