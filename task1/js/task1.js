//Exercise 1

const changeCase = inputString => {
    return inputString.split('').map((item) => /[A-Z]/.test(item) ? item.toLowerCase() : item.toUpperCase()).join('');
}


console.log(changeCase('21century'));
console.log(changeCase('Hybris'));

//Exercise 2

const filterNonUnique = inputArr => {
    const nonUniqueValues = inputArr.filter((item, index, array) => array[index] === array[index + 1]);
    return inputArr.filter(obj => nonUniqueValues.indexOf(obj) == -1);
}

console.log(filterNonUnique([1, 2, 2, 3, 4, 4, 5]));
console.log(filterNonUnique([1, 2, 3, 4]));

//Exercise 3

const alphabetSort = inputString => {
    return inputString.split('').sort().join('');
}

console.log(alphabetSort('Python'));

//Exercise 4

const getSecondMinimum = inputArr => {
    return inputArr.sort((a, b) => a - b)[1];
}

console.log(getSecondMinimum([5, 0, 3, 7, 8]));

//Exercise 5

const doubleEveryEven = inputArr => {
    return inputArr.map((item) => item % 2 ? item : item * 2);
}

console.log(doubleEveryEven([2, 0, 7, 3, 8, 4]));

//Exercise 6

const getArrayElementsPairs = (arr1, arr2) => {
    let newArr = [];
    for (i = 0; i < arr1.length; i++) {
        for (j = 0; j < arr2.length; j++) {
            newArr.push([arr1[i], arr2[j]])
        }

    }
    return newArr;
}

console.log(getArrayElementsPairs([1, 2], ['a', 'b']));

//Exercise 7

const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;
    if (obj1 instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
    if (!obj1 || !obj2 || (typeof obj1 !== 'object' && typeof obj2 !== 'object')) return obj1 === obj2;
    if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) return false;
    if (obj1.prototype !== obj2.prototype) return false;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    return Object.keys(obj1).every(prop => deepEqual(obj1[prop], obj2[prop]));
}

let obj = {here: {is: 'an'}, object: 2};

console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: 'an'}, object: 2}));

//Exercise  8 

const formatDate = (date) => {
    let formattedDate, dd, mm, yy;

    if (Array.isArray(date)) {
        const [year, month, day] = date;
        formattedDate = new Date(year, month, day);
    } else if (date instanceof Date) {
        formattedDate = date;
    } else {
        formattedDate = new Date(date);
    }

    dd = ('0' + formattedDate.getDate()).slice(-2);
    mm = ('0' + (formattedDate.getMonth() + 1)).slice(-2);
    yy = formattedDate.getFullYear().toString().slice(2);

    return `${dd}.${mm}.${yy}`

}

console.log(formatDate("2011-10-02"));
console.log(formatDate(1234567890000));
console.log(formatDate([2014, 0, 1]));
console.log(formatDate(new Date(2014, 0, 1)));


