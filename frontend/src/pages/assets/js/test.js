

let folder = document.getElementById("myfile");
let file = document.getElementById("myfile2");
let columns = document.getElementsByClassName("mdb-lightbox");
let requiredColumn=columns[0];
//let imgs=document.getElementsByTagName("img");
// create array to store image tag
let arrImg = [];

// event handler for input type file


folder.onchange = () => {
  // get files from the selected folder
  for (const key in folder.files) {
    const element = folder.files[key];
    if (element.type === "image/jpg" || element.type === "image/png") {
      // call minParent() function and obtain div which has minimun child nodes
      console.log(element.name);
      let parent_column = minParent(columns);

      // call createImg() Function and append images one by one in the column div
      let img = createImg(element.webkitRelativePath);

      // store images in the array for animation
      arrImg[key] = img;

      // append images in the parent node
      parent_column.appendChild(img);
    }
  }

  // create variable for index number
  let i = 0;
  let clearinter = setInterval(() => {
    arrImg[i].setAttribute("style", "display : flex");
    arrImg[i].classList.add("animated", "zoomIn");
    i++;
    // clear set interval when i is equal to array length
    i == arrImg.length ? clearInterval(clearinter) : undefined;
  }, 200);
};


file.onchange = () => {

  for (const key in file.files) {
    const element = file.files[key];
  

    if (element.type === "image/jpeg" || element.type === "image/png") {
      // call minParent() function and obtain div which has minimun child nodes
    
     // let parent_column = minParent(columns);

      // call createImg() Function and append images one by one in the column div
      console.log(columns);

      let imgsrc=URL.createObjectURL(element);
      const childDiv = document.createElement("figure");
        childDiv.classList.add("col-md-4");
       const a=document.createElement("a");
       a.setAttribute("href",imgsrc);
       
       a.setAttribute("data-size","1600x1067")

       const childImg=document.createElement("img");
       
       childImg.setAttribute("src",imgsrc);
       childImg.classList.add("img-fluid","z-depth-1");
       
       a.setAttribute("data-size","1000x1000");
       


      // div.appendChild(childDiv);
      // childDiv.className = "column";
      //let img = createImg(URL.createObjectURL(element));
      // childDiv.appendChild(img);
      // store images in the array for animation
      arrImg[key] = childImg;
      a.appendChild(childImg);
      childDiv.appendChild(a);
      requiredColumn.appendChild(childDiv);

      // append images in the parent node
      
    }
  }

 // create variable for index number
  let i = 0;
  let clearinter = setInterval(() => {
    arrImg[i].setAttribute("style", "display : flex");
    arrImg[i].classList.add("animated", "zoomIn");
    i++;
    // clear set interval when i is equal to array length
    i == arrImg.length ? clearInterval(clearinter) : undefined;
  }, 200);
};

// obtain parent node which has minimun child
// function minParent(parentNode) {
//   let arr = [];

//   // get the children of the parent nodes
//   parentNode.forEach((element, i) => {
//     arr[i] = element.children.length;
//     // console.log(element.children.length);
//   });

//   // get min number from array
//   let min = Math.min.apply(null, arr);

//   // get parent which has min child nodes.
//   for (let i = 0; i < parentNode.length; i++) {
//     if (parentNode[i].children.length == min) {
//       return parentNode[i];
//     }
//   }
// }

// create images with source attribute
// function createImg(imgsrc) {
//   //let img = document.createElement("img");

//   imgs[0].setAttribute("src",imgsrc);
//   //img.setAttribute("src", imgsrc);
//   imgs.className = "img";
//   return imgs;
// }