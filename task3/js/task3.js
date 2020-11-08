//Exercise 1

const arrayToList = (arr) => arr.length ? { value: arr[0], rest: arrayToList(arr.splice(1)) } : null;

const listToArray = (obj) => obj?.value ? [obj.value, ...listToArray(obj.rest)] : [];

console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30]))); 

//Exercise 2

const getKeyValuePairs = (obj) => Object.entries(obj);

console.log(getKeyValuePairs({red: "#FF0000", green: "#00FF00", white: "#FFFFFF"})); 

//Exercise 3

const invertKeyValue = (obj) => Object.fromEntries(Object.entries(obj).filter(arr => arr.reverse()));

console.log(invertKeyValue({red: "#FF0000", green: "#00FF00", white: "#FFFFFF"}));

//Exercise 4

const getAllMethods = (obj) => Object.getOwnPropertyNames(obj).filter(prop =>  obj[prop] instanceof Function);

console.log(getAllMethods(Math));

//Exercise 5

function Clock() {
    
    var timer;
    
    function getDate() {
       var date = new Date;
        
        hh = ('0' + date.getHours()).slice(-2);
        mm = ('0' + date.getMinutes()).slice(-2);
        ss = ('0' + date.getSeconds()).slice(-2);
        
        console.log( hh + ":" + mm + ":" + ss);
    }
    
    
    Clock.prototype.run = function() {
        timer = setInterval(function(){getDate()}, 1000);
    }
    
    Clock.prototype.stop = function() {
        clearInterval(timer);
    }
}

const clock = new Clock(); 

clock.run(); 
clock.stop(); 

//Exercise 6 

class Group { 
    
  constructor() {
      this.group = [];
  }
    
  static from (arr) {
     const group = new Group();
     arr.forEach(item => group.add(item));
     return group;
  }
    
   has(value) {
     return this.group.indexOf(value) !== -1;
  }
    
  add(value) {
      if(!this.has(value)) this.group.push(value);
  }
    
  delete(value) {
      this.group.splice(this.group.indexOf(value), 1);
  }
} 


let group = Group.from([10, 20]); 
console.log(group.has(10)); // → true 
console.log(group.has(30)); // → false 
group.add(10); 
group.delete(10); 
console.log(group.has(10)); // → false 
