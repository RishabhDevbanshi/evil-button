const evilButton = document.getElementById('evil-button');
const OFFSET = 100;

evilButton.addEventListener('click',()=>{
    alert('Fooled You 😈!');
    window.close();
})

document.addEventListener('mousemove',(e)=>{
    const x = e.pageX , y = e.pageY;
    const buttonBox = evilButton.getBoundingClientRect()
    const horizontalDist = distanceFromCentre(buttonBox.x,x,buttonBox.width);
    const verticalDist = distanceFromCentre(buttonBox.y,y,buttonBox.height);

    const horizontalOffset = buttonBox.width/2 + OFFSET;
    const verticalOffset = buttonBox.height/2 + OFFSET;

    
    if(Math.abs(horizontalDist) <= horizontalOffset && Math.abs(verticalDist) <= verticalOffset)
    {
        setButtonPosition(
            buttonBox.x + horizontalOffset/horizontalDist*10,
            buttonBox.y + verticalOffset/verticalDist*10,
        );
    }

});

const setButtonPosition = (left,top)=>{
    const winBox = document.body.getBoundingClientRect();
    const buttonBox = evilButton.getBoundingClientRect();

    if(distanceFromCentre(left,winBox.left,buttonBox.width) < 0)
    {
        left = winBox.right - buttonBox.width - OFFSET;
    }
    if(distanceFromCentre(left,winBox.right,buttonBox.width) > 0)
    {
        left = winBox.left + OFFSET;
    }
    if(distanceFromCentre(top,winBox.top,buttonBox.height) < 0)
    {
        top = winBox.bottom - buttonBox.height - OFFSET;
    }
    if(distanceFromCentre(top,winBox.bottom,buttonBox.height) > 0)
    {
        top = winBox.top + OFFSET;
    }

    evilButton.style.left = `${left}px`;
    evilButton.style.top = `${top}px`;
}

const distanceFromCentre = (boxPosition,mousePosition,boxSize)=>{
    return boxPosition - mousePosition + boxSize/2;
}