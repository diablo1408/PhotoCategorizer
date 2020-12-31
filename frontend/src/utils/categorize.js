export default function (allImages, genre) {
    
    // console.log(allImages[0]);

    if (genre === "All") return allImages;
    else return allImages.filter((image) => image.labels.find(ele => ele === genre));
}