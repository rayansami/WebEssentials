//Get all images
const images = document.querySelectorAll('.lazy-image');
const config = {
    //If image gets within 50px in the Y-axis
    rootMargin: '50px 0px',
    threshold: 0.5 //Observer should be fired when 50% of an observed element intersects the “capturing frame”
};

let observer = new IntersectionObserver(onIntersection , config);

if( !('IntersectionObserver' in window)){
    //If browser does not support the api
    loadImagesImmediately(images);
}
else{    
    for(let i = 0 ; i < images.length ; i++){
        let image = images[i];
        //Passing element to observe, one at a time (can't do batch)
        observer.observe(image);
    }
}

function loadImagesImmediately(images){
    for(let i = 0 ; i < images.length ; i++){
        let image = images[i];       
        preloadImage(image);
    }
}

function preloadImage(image){
    const src = image.dataset.src;
    if(!src){
        return;
    }

    image.src = src;
}

function onIntersection(entries){
    entries.forEach(entry => {
        if(entry.intersectionRatio > 0){
            console.log(entry);
            observer.unobserve(entry.target);
            preloadImage(entry.target);
        }
    });
}
