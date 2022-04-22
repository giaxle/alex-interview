(Fakeagram = () => {
  // global variables
  const imageInput = document.querySelector("#image-input");
  let files;
  const gallery = document.querySelector("#gallery");

  // displays intro
  const welcomeText = () => {
    const welcome = document.createElement("div");
    welcome.classList.add("welcome");
    welcome.setAttribute("id", "welcome");
    welcome.innerText =
      "Welcome to Fakeagram. Upload some pictures and try it out!";
    gallery.appendChild(welcome);
  };

  // renders image gallery
  const renderGallery = (elements) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].count !== undefined ? null : (elements[i]["count"] = 0);
      elements[i].id !== undefined ? null : (elements[i]["id"] = Date.now());
      createCard(elements[i]);
    }
  };

  // creating card container and child elements
  const createCard = (element) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", element.id);

    const img = document.createElement("img");
    img.onclick = (element) => {
      createImageModal(element, img.src);
    };

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("footer");

    const count = document.createElement("count");

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("cardBtnContainer");

    const likeBtn = document.createElement("button");
    likeBtn.classList.add("cardBtn");
    likeBtn.innerText = "Like";
    likeBtn.onclick = () => {
      element.count = element.count + 1;
      count.innerText = `Likes ${element.count}`;
    };
    count.innerText = `Likes: ${element.count}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("cardBtn", "delete");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => {
      let remove = document.getElementById(`${element.id}`);
      gallery.removeChild(remove);
    };

    card.appendChild(img);
    card.appendChild(cardFooter);
    cardFooter.appendChild(count);
    cardFooter.appendChild(btnContainer);
    btnContainer.appendChild(likeBtn);
    btnContainer.appendChild(deleteBtn);
    gallery.appendChild(card);

    readImageFile(element, img);
  };

  // displays image model
  const createImageModal = (element, src) => {
    const modal = document.createElement("div");
    let modalID = element.id * 69;
    modal.setAttribute("id", modalID);
    modal.classList.add("modal");

    const close = document.createElement("button");
    close.classList.add("close");
    close.innerText = "Close";
    close.onclick = () => {
      let remove = document.getElementById(`${modalID}`);
      gallery.removeChild(remove);
    };

    const modalImg = document.createElement("img");
    modalImg.classList.add("modalImg");
    modalImg.src = src;

    gallery.appendChild(modal);
    modal.appendChild(close);
    modal.appendChild(modalImg);
  };

  // reads image file
  const readImageFile = (element, img) => {
    let uploadedImage = "";
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploadedImage = reader.result;
      img.src = uploadedImage;
    });
    reader.readAsDataURL(element);
  };

  welcomeText();
  imageInput.addEventListener("change", function () {
    files = imageInput.files;
    renderGallery(files);
  });
})();
