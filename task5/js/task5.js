//Exercise 1

const delay = timeOut =>  new Promise((resolve, reject) => {

  setTimeout(() => {
    resolve();
  }, timeOut);

});

delay(1000).then(() => console.log("Hey!"));

//Exercise 2

const runPromisesInSeries = arrFunc => arrFunc[0] && arrFunc[0]().then(() => runPromisesInSeries(arrFunc.slice(1)));

runPromisesInSeries([ 
  () => delay(1000).then(() => { 
    console.log('message in 1 second') 
  }), 
  () => delay(2000).then(() => { 
    console.log('message in 3 seconds') 
  }) 
]); 

//Exercise 3

function Promise_all(promises) { 
  return new Promise((resolve, reject) => { 
    let arrResolvedPromises = [];
    let countResolvedPromises = 0;
    promises.length ? promises.forEach((promise, idx) => { 
        promise
         .then(
            result => {
                arrResolvedPromises[idx] = result;
                countResolvedPromises++;
                promises.length === countResolvedPromises && resolve(arrResolvedPromises)},
            error => {reject(error)})
    }) : resolve(promises);
  }); 
} 

Promise_all([]).then(array => { 
  console.log("This should be []:", array); 
}); 

function soon(val) { 
  return new Promise(resolve => { 
    setTimeout(() => resolve(val), Math.random() * 500); 
  }); 
} 

Promise_all([soon(1), soon(2), soon(3)]).then(array => { 
  console.log("This should be [1, 2, 3]:", array); 
}); 

Promise_all([soon(1), Promise.reject("X"), soon(3)]) 
  .then(array => { 
    console.log("We should not get here"); 
  }) 
  .catch(error => { 
    if (error != "X") { 
      console.log("Unexpected failure:", error); 
    } 
  }); 

//Exercise 4

function *fibonacci (n, current = 0, next = 1){
  if (n === 0) return current;
  yield current;
  yield *fibonacci(n-1, next, current + next);
}

let [...first10] = fibonacci(10); 
console.log(first10);

//Exercise 5

const helper = (generator) => {
   const iterator = generator();
   const iterate = (iteration) => {
       if(iteration.done) return iteration.value;
       return iteration.value.then(x => iterate(iterator.next(x)));
   }
   return iterate(iterator.next());
       
}



const asyncTask1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('first resolved'), 1000)); 
const asyncTask2 = () => new Promise((resolve, reject) => setTimeout(() => resolve('second resolved'), 1000)); 
const asyncTask3 = () => new Promise((resolve, reject) => setTimeout(() => reject('third rejected'), 1000)); 
console.log('invoke helper') 

helper(function* main() { 
 try { 
   const a = yield asyncTask1(); 
   console.log(a); 
   const b = yield asyncTask2(); 
   console.log(b); 
   const c = yield asyncTask3(); 
 } catch(e) { 
   console.error('error happened', e); 
 } 
}); 

//Exercise 6

const fetchFakeJson = () => {
 fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json())
  .then(comments => {
   console.log('comments', comments);
   return comments[Math.floor(Math.random() * Math.floor(comments.length))];
  })
  .then(randomComment => {
     console.log('randomComment', randomComment);
     return fetch(`https://jsonplaceholder.typicode.com/posts/${randomComment.postId}`)
  })
  .then(response => response.json())
  .then(post => {
     console.log('post', post);
     fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
         method: 'DELETE',
     })
     return fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
 })
 .then(response => response.json())
 .then(user => {
     console.log('user', user);
     return fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify({
            ...user,
            username: 'VladShypko',
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
     })
 })
 .then(response => response.json())
 .then(updatedUser => {
   console.log(updatedUser);
 })
 .catch(error => {
     console.log('error', error)
 })
}

fetchFakeJson();




