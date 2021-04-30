'use strict';
// Refactor createPlaceCard (второй вариант от 26.04.21)
const cardContainer = document.getElementById("root");

const cardElements = data.map((place) => createPlaceCard(place));
cardContainer.append(...cardElements);

function createPlaceCard(place) {
  return createElement(
    "li",
    { classNames: ["cardWrapper"] },
    // article.cardContainer
    createElement(
      "article",
      { classNames: ["cardContainer"] },
      createImageWrapper(place),
      createContentWrapper(place)
    )
  );
}

function createCardImage(link) {
  const img = createElement("img", {
    classNames: ["cardImage"],
    handlers: {
      error: handleImageError,
      load: handleImageLoad,
    },
  });
  img.src = link;
  img.hidden = true;

  return img;
}

function createImageWrapper({ name, profilePicture }) {
  // div.cardImageWrapper
  const imageWrapper = createElement(
    "div",
    {
      classNames: ["cardImageWrapper"],
    },
    // div.initials
    createElement(
      "div",
      { classNames: ["initials"] },
      document.createTextNode(name[0] || "")
    ),
    createCardImage(profilePicture)
  );
  imageWrapper.style.backgroundColor = stringToColor(name || "");

  return imageWrapper;
}

function createContentWrapper({ name, description }) {
  return createElement(
    "div",
    {
      classNames: ["contentWrapper"],
    },
    // h3.cardName
    createElement(
      "h3",
      { classNames: ["cardName"] },
      document.createTextNode(name || "")
    ),
    // p.cardDescription
    createElement(
      "p",
      { classNames: ["cardDescription"] },
      document.createTextNode(description || "")
    )
  );
}

/**
 *
 * @param {string} tagName
 * @param {object} options
 * @param {string[]} options.classNames - css classes
 * @param {object} options.handlers - event handlers
 * @param  {...Node} children
 * @returns {HTMLElement}
 */
function createElement(
  tagName,
  { classNames = [], handlers = {} },
  ...children
) {
  const elem = document.createElement(tagName);
  elem.classList.add(...classNames);

  for (const [eventType, eventHandler] of Object.entries(handlers)) {
    elem.addEventListener(eventType, eventHandler);
  }

  elem.append(...children);
  return elem;
}

/*
  EVENT HANDLERS
*/

function handleImageError({ target }) {
  target.remove();
}

function handleImageLoad({ target }) {
  target.hidden = false;
}

/*
  UTILS
*/

function stringToColor(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
}








const form = document.getElementById("root-form");

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const {target: {elements:{email}}} = event;
    console.dir(event.target);
});

// task 1-2
const form = document.getElementById("root-form");
const list = document.getElementById('root-list');


form.addEventListener("submit", submitHandler);

const arr = [];

function submitHandler (event) {
  event.preventDefault();
  const {
    target,
    target: {
      elements: {test2: {value: test2Value} },
    },
  } = event;
  const value = test2Value.trim(); //убрали пробелы
//добавить проверку (по заданию 4)
  if (value && !arr.includes(value)) {
      arr.push(value);
      list.append(createListItem(value));
  }

  target.reset();
}

// Task 3
function createListItem(value) {
    const listItem = document.createElement('li');
    
    const btn = createDeletedListButton(deleteHandler.bind(value));
    listItem.append(document.createTextNode(value), btn);

    return listItem;
}

// task 5

function createDeleteListButton(onDelete) {
    const btn = document.createElement('button');
    btn.innerText = 'x';
    btn.addEventListener('click', onDelete);
    return btn;
}

function deleteHandler({target: {parentNode}}) {
    console.dir(parentNode);
    const textInfo = parentNode.querySelector(".textInfo");
    arr.splice(arr.indexOf(textInfo.innerText), 1);
    parentNode.remove();
}







