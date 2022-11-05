import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';


describe('Async testing examples', () => {


  it('async test example with jasmine done', (done:DoneFn) => {
    let test = false;
    setTimeout(() => {

      console.log(' running assertions ')
      test = true;

      expect(test).toBeTruthy();
      done();

    }, 1000)

  })

  it('asynch test example - set Timeout', fakeAsync(() => {
    let test = false;

    setTimeout(() => {});
    setTimeout(() => {
      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();
    },1000);

    // tick(1000);
    flush();
    expect(test).toBeTruthy();
  }));

  it('asynch test example - plain Promise', fakeAsync(() => {
    let test = false;

    console.log('Creating promise');

    Promise.resolve().then(() => {
      console.log('successful promise');
      test = true;

      Promise.resolve();

    }).then(() => {
      console.log('successful promise 2')

    });

    flushMicrotasks();

    console.log('running test assertions');
    expect(test).toBeTruthy();
  }));

  it('Asynch test example - Promise + setTimeout', fakeAsync(() => {

    let counter = 0;

    Promise.resolve()
      .then(() => {

        counter +=10;

        setTimeout(() => {

          counter +=1;

        }, 1000);
      });

    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);

  }));

  it('Asynch test example - Observable', fakeAsync(() => {

    let test = false;
    console.log('creating observable');

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    tick(1000);
    console.log('running assertions');

    expect(test).toBe(true);

  }));

});
