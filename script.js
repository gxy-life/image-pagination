const list_element = document.getElementById("list");
const pagination_element = document.querySelector(".pagenumbers ul");

let current_page = 1;
let rows = 9;

function DisplayList(items, wrapper, rows_per_page, page) {
  wrapper.innerHTML = "";
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end);
  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];

    let item_element = document.createElement("div");
    let img = document.createElement("img");
    let a = document.createElement("a");
    item_element.classList.add("item");
    a.setAttribute("data-lightbox", "abc");
    a.href = item;
    img.src = item;

    wrapper.appendChild(item_element);
    item_element.appendChild(a);
    a.appendChild(img);
  }
}

let totalPageNum = Math.ceil(list_items.length / rows);

function SetupPagination(wrapper, current_page) {
  wrapper.innerHTML = "";

  let liTag = "";
  let active;
  let beforePage = current_page - 1;
  let afterPage = current_page + 1;

  if (current_page > 1) {
    //show the next button if the current_page value is greater than 1
    liTag += `<li class="btn prev" onclick="isClicked(${
      current_page - 1
    })"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if (current_page > 2) {
    //if current_page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="isClicked(1)"><span>1</span></li>`;
    if (current_page > 3) {
      //if current_page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li
  if (current_page == totalPageNum) {
    beforePage = beforePage - 2;
  } else if (current_page == totalPageNum - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (current_page == 1) {
    afterPage = afterPage + 2;
  } else if (current_page == 2) {
    afterPage = afterPage + 1;
  }

  for (var pageNum = beforePage; pageNum <= afterPage; pageNum++) {
    if (pageNum > totalPageNum) {
      //if pageNum is greater than totalPage length then continue
      continue;
    }
    if (pageNum == 0) {
      //if pageNum is 0 than add +1 in pageNum value
      pageNum = pageNum + 1;
    }
    if (current_page == pageNum) {
      //if totalPageNum is equal to pageNum than assign active string in the active variable
      active = "active";
    } else {
      //else leave empty to the active variable
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="isClicked(${pageNum})"><span>${pageNum}</span></li>`;
  }

  if (current_page < totalPageNum - 1) {
    //if current_page value is less than totalPage value by -1 then show the last li or current_page
    if (current_page < totalPageNum - 2) {
      //if current_page value is less than totalPage value by -2 then add this (...) before the last li or current_page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="isClicked(${totalPageNum})"><span>${totalPageNum}</span></li>`;
  }

  if (current_page < totalPageNum) {
    //show the next button if the current_page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="isClicked(${
      current_page + 1
    })"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  wrapper.innerHTML = liTag;
}

DisplayList(list_items, list_element, rows, current_page);
SetupPagination(pagination_element, current_page);
setImgSize();

function isClicked(e) {
  DisplayList(list_items, list_element, rows, e);
  SetupPagination(pagination_element, e);
  setImgSize();
}

function setImgSize() {
  const box = document.querySelectorAll("main .list .item");
  box.forEach((e) => {
    let w = Math.floor(list_element.clientWidth / 3);
    e.style.width = `${w}px`;
    e.style.height = `${(w / 3) * 2}px`;
  });
}
