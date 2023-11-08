const element = document.querySelector('.buttonLeft');

element.addEventListener('mouseover', () => {
    document.addEventListener('mouseover', increaseValue);
});

element.addEventListener('mouseout', () => {
    document.removeEventListener('mouseout', resetVariable);
    //console.log("not entered");
    document.documentElement.style.setProperty('--var1', 0);
});

function increaseValue() {
    let currentVariable = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--var1'));
    //console.log(currentVariable);
    let newVariable = Math.min(100, currentVariable+0.1);
    newVariable = newVariable.toString() + "%";
    //console.log(newVariable);
    document.documentElement.style.setProperty('--var1', newVariable);
}

function resetVariable() {document.documentElement.style.setProperty('--var1', 0);}