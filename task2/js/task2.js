//Exercise 1
const mergeWords = (a) => (b) => (c) => (d) => () => `${a} ${b} ${c} ${d}`;

console.log(mergeWords('GNU')('is')('not')('Unix')());

//Exercise 2

let goodUsers = [
    {id: 1},
    {id: 2},
    {id: 3},
];

const checkUsersValid = (goodUsers) => {
    return (testUsers) => testUsers.every((user) => [...goodUsers.map((user => user.id))].includes(user.id));
}

let testAllValid = checkUsersValid(goodUsers);

console.log(testAllValid([
    {id: 2},
    {id: 1}
]));

console.log(testAllValid([
    {id: 2},
    {id: 4},
    {id: 1}
]));

//Exercise 3

const inputWords = ['Apple', 'Banana', 'Apple', 'Durian', 'Durian', 'Durian'];

const countWords = (inputWords) =>
    inputWords.reduce((obj, item) => {
        obj.hasOwnProperty(item) ? obj[item] += 1 : obj[item] = 1;
        return obj;
    }, {});

console.log(countWords(inputWords));

//Exersice 4

const isPalindrome = (inputString) => {
    return inputString.split('').reverse().join('') === inputString ? 'The entry is a palindrome' : 'Entry is not a palindrome';
}

console.log(isPalindrome('madam'));
console.log(isPalindrome('fox'));

//Exersice 5(1)

const factorial = (n) => n != 1 ? n * factorial(n - 1) : 1;

console.log(factorial(5));

//Exersice 5(2)

const amountToCoins = (amount, coins) => {

    return amount === 0 ? [] :
        amount >= coins[0] ? [coins[0]].concat(amountToCoins(amount - coins[0], coins)) :
            amountToCoins(amount, coins.splice(1));
}

console.log(amountToCoins(46, [25, 10, 5, 2, 1]));

//Exersice 5(3)

const repeat = (func, times) => {
    if (times) {
        func();
        return repeat(func, times - 1);
    }
}

repeat(() => console.log('Wassup'), 5);

//Exersice 5(4)

const reduce = (arr, func, initial) => {

    return arr.length > 1 ? reduce(arr.splice(1), func, func(initial, arr[0], 0, arr)) : func(initial, arr[0], 0, arr);
}

console.log(reduce([1, 2, 3], function (prev, curr, index, arr) {
    return prev + curr;
}, 0));



