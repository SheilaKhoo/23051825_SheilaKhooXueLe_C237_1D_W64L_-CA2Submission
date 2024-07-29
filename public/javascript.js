// LOGO MOUSEOVER
// When logo is moused over, it changes to a filled version of the logo image
const mainLogoWrap = document.getElementById('main-logo-wrap');
const mainLogo = document.getElementById('main-logo');
mainLogoWrap.onmouseover = () => {
    mainLogo.src = "/images/dreamsaladlogo_color.png"
};
mainLogoWrap.onmouseleave = () => {
    mainLogo.src = "/images/dreamsaladlogo.png"
};

// SHEEP JUMPING MOUSEOVER
// When View Story button is moused over, it changes to a second frame of the jumping sheep
const viewStorySheep = document.querySelectorAll('.sheep-jumping');
viewStorySheep.forEach((item) => {
    item.onmouseover = () => {
        item.src = "/images/sheepjump2.png";
    };
    item.onmouseleave = () => {
        item.src = "/images/sheepjump1.png";
    };
});

// BACK BUTTON MOUSEOVER
const backButton = document.querySelectorAll('.back-button');
backButton.forEach((item) => {
    item.onmouseover = () => {
        item.src = "/images/houseopen.png";
    };
    item.onmouseleave = () => {
        item.src = "/images/houseclosed.png";
    };
});

// NEW DREAM BUTTON MOUSEOVER
const newDreamButton = document.querySelectorAll('.new-dream-button');
newDreamButton.forEach((item) => {
    item.onmouseover = () => {
        item.src = "/images/New Dream 2.png";
        item.style.backgroundColor = "rgba(255, 255, 255, 0.214)";
    };
    item.onmouseleave = () => {
        item.src = "/images/New Dream 1.png";
        item.style.backgroundColor = "rgba(255, 255, 255, 0)";
    };
});

// FAQ BUTTON MOUSEOVER
const FAQButton = document.querySelectorAll('.FAQ-button');
FAQButton.forEach((item) => {
    item.onmouseover = () => {
        item.src = "/images/FAQ Button 2.png";
        item.style.backgroundColor = "rgba(255, 255, 255, 0.214)";
    };
    item.onmouseleave = () => {
        item.src = "/images/FAQ Button 1.png";
        item.style.backgroundColor = "rgba(255, 255, 255, 0)";
    };
})

// HANDLE PAGINATION ON MY DREAMSALAD PAGE
const myDreamsPageItems = document.querySelectorAll('.my-dreams-page-item');
const myDreamsPrev = document.querySelector('.my-dreams-previous');
const myDreamsNext = document.querySelector('.my-dreams-next');
let myDreamSaladCurrentPage = 0; // Initialize current page number
const dreamList = document.getElementById('myDreamSaladList'); // For updating the displayed stories on your dreams page
const myDreamSaladListItemInitialize = document.querySelectorAll('.myDreamSaladListItem');
for (let i = 0; i < myDreamSaladListItemInitialize.length; i++) {
    if (i >= 10) {
        myDreamSaladListItemInitialize[i].style.display = 'none';
    }
}

const updatePagination = (i) => { // i represents the page number (starting from 0)
    if (myDreamSaladListItemInitialize.length > 0) {
        myDreamsPageItems.forEach((item) => {
            item.classList.remove("active"); // Remove active class from all other buttons
            item.innerHTML = item.innerHTML.replaceAll('<span', '<a'); // Reset all link status to make them clickable first
            item.innerHTML = item.innerHTML.replaceAll('span>', 'a>'); // Reset all link status to make them clickable first
            if (item.querySelector('a')) {
                item.querySelector('a').removeAttribute('href');
                item.querySelector('a').setAttribute('href', '#');
            }
        });
        myDreamsPageItems[i].classList.add("active"); // Add back to this new selected one
        myDreamsPageItems[i].querySelector('a').removeAttribute('href');
        myDreamsPageItems[i].innerHTML = myDreamsPageItems[i].innerHTML.replaceAll('a>', 'span>'); // Make this link unclickable
        myDreamsPageItems[i].innerHTML = myDreamsPageItems[i].innerHTML.replaceAll('<a', '<span'); // Make this link unclickable

        // Handle Previous / Next buttons
        myDreamsPrev.classList.remove('disabled'); // reset button first
        myDreamsPrev.querySelector('a').setAttribute('href', '#'); // reset href tag first
        myDreamsNext.classList.remove('disabled'); // reset button first
        myDreamsNext.querySelector('a').setAttribute('href', '#'); // reset href tag first
        if (i === 0) {
            myDreamsPrev.classList.add('disabled'); // If first button is selected, previous should be disabled
            myDreamsPrev.querySelector('a').removeAttribute('href');
        }
        if (i === myDreamsPageItems.length - 1) {
            myDreamsNext.classList.add('disabled'); // If last button is selected, next should be disabled
            myDreamsNext.querySelector('a').removeAttribute('href');
        }

        // Handle the content displayed
        // Reset display
        const myDreamSaladListItems = document.querySelectorAll('.myDreamSaladListItem');
        myDreamSaladListItems.forEach((item) => {
            item.style.display = 'none';
        })
        // Display only selected
        for (let k = 0; k < myDreamSaladListItems.length; k++) {
            if (k >= myDreamSaladCurrentPage*10 && k < (myDreamSaladCurrentPage*10 + 10)) {
                myDreamSaladListItems[k].style.display = 'block';
            }
        }
        document.documentElement.scrollTop = 0;
    } else {
        // Disable all buttons if no items
        myDreamsPrev.classList.add('disabled');
        myDreamsPrev.querySelector('a').removeAttribute('href');
        myDreamsNext.classList.add('disabled');
        myDreamsNext.querySelector('a').removeAttribute('href');
    }
};
// Refresh pagination elements
if (myDreamsNext) { // Just to check if we're on the right page
    updatePagination(0);
}


// Handle when numbers are clicked
for (let i = 0; i < myDreamsPageItems.length; i++) {
    // When this page button is clicked, do the following...
    myDreamsPageItems[i].onclick = () => {
        if (myDreamsPageItems[i].classList.contains("active")) {
            // If this is the active button, do nothing
        } else {
            myDreamSaladCurrentPage = i; // Track which page number we're currently on
            updatePagination(myDreamSaladCurrentPage); // Update UI
        }
    }
};

// Handle Previous and Next button
if (myDreamsPrev) {
    myDreamsPrev.onclick = () => {
        if (myDreamsPrev.classList.contains("disabled")) {
            // Do nothing if button is disabled
        } else {
            myDreamSaladCurrentPage -= 1; // Back by one page
            updatePagination(myDreamSaladCurrentPage); // Update UI
        }
    };
}
if (myDreamsNext) {
    myDreamsNext.onclick = () => {
        if (myDreamsNext.classList.contains("disabled")) {
            // Do nothing if button is disabled
        } else {
            myDreamSaladCurrentPage += 1; // Back by one page
            updatePagination(myDreamSaladCurrentPage); // Update UI
        }
    };
}

// SLIDER / RANGE VALUE UPDATE
// Get slider value and update values accordingly
const rangeSlider = document.getElementById('dreamsalad-length');
const sliderValues = document.querySelectorAll('.slider-value'); // The values we should change
const generateSaladLinks = document.querySelectorAll('.generate-salad-link'); // The links we want to change
if (rangeSlider) {
    rangeSlider.oninput = () => {
        // Update the displayed length on top
        sliderValues.forEach((item) => {
            item.textContent = rangeSlider.value;
        });
        // Update the links for View Story
        generateSaladLinks.forEach((item) => {
            // Split up url first
            const urlSplit = item.href.split('/');
            // Change the last value (the number of dream salads to random) to the updated value
            urlSplit[urlSplit.length - 1] = rangeSlider.value;
            // Join it back
            let urlJoin = urlSplit.join('/');
            // Update the link
            item.href = urlJoin;
        });
    }
}

const uploadBar = document.querySelectorAll('.image-upload-bar');
const uploadImg = document.querySelectorAll('.image-upload-img');
for (let i = 0; i < uploadBar.length; i++) {
    uploadBar[i].oninput = () => {
        const file = uploadBar[i].files;
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = function (event) {
                uploadImg[i].setAttribute('src', event.target.result);
            }
            fileReader.readAsDataURL(file[0]);
        }
    }
}