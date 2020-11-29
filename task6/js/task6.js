//Exercise 1

const heightParagraph = document.getElementById('height');
const widthParagraph = document.getElementById('width');

const getWindowSize = () => {
    widthParagraph.textContent = window.innerWidth;
    heightParagraph.textContent = window.innerHeight;
}

window.addEventListener('resize', () => {
   let isThrottled = false;
    
   if(!isThrottled){
       isThrottled = true;
       setTimeout(() => {
           isThrottled = false;
           getWindowSize();
       }, 300);
   }
});

getWindowSize();


//Exercise 2

const searchString = document.getElementById('input-field');
const textarea = document.getElementById('textarea-field');
const content = document.getElementById('content');

textarea.addEventListener('input', () => {
   content.textContent = textarea.value;
   
});

searchString.addEventListener('input', () => {
  content.innerHTML = textarea.value.replace(new RegExp(searchString.value.trim(), "gi"), (str) => `<b>${str}</b>`);
});


//Exercise 3

let timerId = null;
let slideIndex = 1;

const imageUrl = document.getElementById('add-image-field');
const addButton = document.getElementById('add-image-button');
const slider = document.getElementById('slider');
const timer  = document.getElementById('timer');

timer.addEventListener('input', () => {
    stopInterval();
    runInterval();
});

const createImgNode = () => {
  if (imageUrl.value.trim()) {
    const img = document.createElement('img');
    
    img.className = 'slide';
    img.setAttribute('src', imageUrl.value);
    
    img.addEventListener('dblclick', () => {
        if(confirm('Delete image?')) {
            img.remove();
            nextSlide();
        }}); 
    slider.append(img);
  }
}

addButton.addEventListener('click', () => {
  createImgNode();
  imageUrl.value = '';
});

const runInterval = () => {
    if(+timer.value) {
        timerId = setInterval(() => {
        nextSlide();
    }, timer.value*1000);
}
}

const stopInterval = () => {
    clearInterval(timerId);
}

const nextSlide = () => {
    showSlides(slideIndex += 1);
    stopInterval();
    runInterval();
}

const previousSlide = () => {
    showSlides(slideIndex -= 1);  
    stopInterval();
    runInterval();
}

const showSlides = n => {

    let slides = document.getElementsByClassName("slide");
    
    slides.length ?  slider.style.backgroundImage = 'none' : slider.style.backgroundImage = 'url(https://lh3.googleusercontent.com/proxy/YT6Bs9abGFlXqb1RgEhlToLRr1zM4VO8774vM6rtk1j-gXbrM9VMgHLnbqJnBOTHMfeniGnu7sky5wTmN2F_OqJFsB10fkJaNGrKnIsyFnKkiEIbxRIYL23U5OnMGaVCP7K62otF-o-Vp0M)';
    
    if (n > slides.length) slideIndex = 1;
    
    if (n < 1) slideIndex = slides.length;
  
    for (let slide of slides) {
        slide.style.display = "none";
    }
    
    if(slides.length) slides[slideIndex - 1].style.display = "block";   
}

showSlides(slideIndex);

//Exercise 4

let cellNumber =  1;

const tbody = document.querySelector('tbody');
const addRowButton = document.getElementById("add-row-button");

const createInputNode = (tdSurname) => {
    const text = tdSurname.textContent;
    const input = document.createElement('input');
    
    input.setAttribute('type', 'text');
    input.autofocus = true;
    input.value = tdSurname.textContent;
    input.addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {
            tdSurname.textContent = input.value;
            input.remove();
        }
    });
    
    return input;
}

const createTdNode = (text) => {
    const td = document.createElement('td');
    td.textContent = text;
    
    td.addEventListener('dblclick', () => {
       const input = createInputNode(td);
       td.textContent = '';
       td.append(input);
    });
    return td;
}

addRowButton.addEventListener('click', ()  => {
    let nodes = [];
    
    const tr = document.createElement('tr');
    
    nodes.push(createTdNode(`Cell ${cellNumber}`));
    nodes.push(createTdNode(`Cell ${cellNumber + 1}`));
    
    const tdIcon = document.createElement('td');
    tdIcon.className = 'td-icon';
    
    const img = document.createElement('img');
    img.setAttribute('id', 'delete-icon');
    img.setAttribute('src', 'https://cdn.icon-icons.com/icons2/764/PNG/512/delete_icon-icons.com_64453.png');
    
    img.addEventListener('click', () => {
        tr.remove();
        cellNumber -= 3;
    });
    tdIcon.append(img);
    nodes.push(tdIcon);
    
    tr.append(...nodes);
    tbody.append(tr);
    
    cellNumber += 3;
});

