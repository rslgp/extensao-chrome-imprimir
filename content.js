function getRadioMarked(e){
  try{
    let rg = e.querySelectorAll('[role="radiogroup"]');
    if(rg.length != 0) {
        let radiochecked = rg[0].querySelector('div[aria-checked="true"]');
        if(radiochecked) return (radiochecked.parentElement.parentElement.innerText);
    }
  } catch(e){ return undefined;}
}

function getTextArea(e){   
  try{
    let ta = e.getElementsByTagName("textarea");
    let ti = e.getElementsByTagName("input");
    if(ta.length != 0) return ta[0].value;
    if(ti.length != 0) return ti[0].value;
  } catch(e){ return undefined;}
}

function getFormData(){
  const listElements = document.querySelectorAll('[role="list"]')[0].children;
  let r = [], c="";
  for(let e of listElements){
      let t1 = getTextArea(e);
      let t2 = getRadioMarked(e);

      c = t1=='' ? t2 : t1;

      let titulo = e.getElementsByTagName("b")[0];
      
      if(c == undefined) c = "";

      if(titulo) r.push([titulo.innerText, c]);
  }
  return r;
}

  // Inject a print button next to the submit button
const submitButton = document.getElementsByClassName("lRwqcd")[0];
const printButton = document.createElement("button");
printButton.textContent = "Imprimir";
printButton.style.cssText = `
-webkit-box-direction: normal;
word-wrap: break-word;
user-select: text !important;
-webkit-font-smoothing: antialiased;
transition: background .2s .1s;
border: 0;
border-radius: 4px;
cursor: pointer;
display: inline-block;
font-family: "Google Sans", Roboto, Arial, sans-serif;
font-size: 14px;
font-weight: 500;
letter-spacing: .25px;
line-height: 36px;
text-decoration: none;
text-transform: none;
min-width: auto;
outline: none;
overflow: hidden;
position: relative;
text-align: center;
-webkit-tap-highlight-color: transparent;
z-index: 0;
background: #1a73e8;
color: #fff;
margin-right: 14px;
background-color: rgb(24, 89, 115);
`;

printButton.addEventListener("click", () => {
  const body = document.getElementsByClassName("Uc2NEf")[0];
  let oldState = body.style.display;
  body.style.display = "none";
  window.onafterprint = function(){
    body.style.display = oldState;
  }
  let tituloRespostas = getFormData();

  console.log(tituloRespostas);
  const formCompacto = document.createElement("div");
  formCompacto.style.marginTop = "8%";

  formCompacto.classList.add("formCompacto");

  for (const item of tituloRespostas) {
    let div = document.createElement("p");
    div.innerHTML = `<b>${item[0]}</b> ${item[1]}`;
    formCompacto.appendChild(div);
  }

  
  document.body.parentElement.appendChild(formCompacto);

  window.print();
  document.body.parentElement.removeChild(formCompacto);
  //formCompacto.style.display = "none";
});

function useImage(){
  // Create a container for the images
const imageContainer = document.createElement("div");

imageContainer.style.display = "flex"; // Use flexbox for easy alignment
imageContainer.style.justifyContent = "space-between"; // Distribute images evenly
imageContainer.style.marginTop = "5%";
imageContainer.style.height = "10vw";

// Add the left image
const leftImage = document.createElement("img");
leftImage.src = chrome.runtime.getURL("images/image1.png"); // Replace with your image path

imageContainer.appendChild(leftImage);

// Add the right image
const rightImage = document.createElement("img");
rightImage.src = chrome.runtime.getURL("images/image2.jpeg");
imageContainer.appendChild(rightImage);

document.body.parentElement.appendChild(imageContainer);

}
useImage();
submitButton.parentNode.insertBefore(printButton, submitButton.nextSibling);

  