console.log('WARSZTAT - Infinite scroll');

let endOfPage = 0;

let preloading = false;


const showPreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log(`showPreloader()`);
    preloader.style.display = 'block';
    preloading = true;
}

const hidePreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log(`hidePreloader()`);
    preloader.style.display = 'none';
    preloading = false;
}

const getData = () => {

    if (!preloading) {

        showPreloader();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
        .then(res => res.json())
        .then(data => {

            let body = document.body;
            let hr = document.createElement('hr');
            body.appendChild(hr);

            for (let user of data) {
                let pId = document.createElement('p');
                let pName = document.createElement('p');
                let pWebsite = document.createElement('p');

                pId.innerText = `User Id: ${user.id}`;
                pName.innerText = `User Name: ${user.name}`;
                pWebsite.innerHTML = `User URL: ${user.website}<br />------`;

                body.appendChild(pId);
                body.appendChild(pName);
                body.appendChild(pWebsite);
            }

            hidePreloader();

            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    }
    preloading = true;
    
}

const scrollToEndOfPage = () => {

    let d = document.documentElement;

    let scrollHeight = d.scrollHeight;

    let scrollTop = d.scrollTop;

    let clientHeight = d.clientHeight;

    // Math.ceil - zaokrąglanie w górę
    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight); 

    console.log(`scrollHeight: ${scrollHeight}`);
    console.log(`sumScrollTopClientHeight: ${sumScrollTopClientHeight}`);
    console.log(`scrollTop: ${scrollTop}`);
    console.log(`clientHeight: ${clientHeight}`);
    console.log(`============================`);

    if (sumScrollTopClientHeight >= scrollHeight) {

        endOfPage += 1;
        console.log(`scrolled to the end of the page: ${endOfPage}`);
        
        
        getData();
    }   
}

window.addEventListener('scroll', scrollToEndOfPage);