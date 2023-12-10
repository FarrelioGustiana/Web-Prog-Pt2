const shopList = JSON.parse(localStorage.getItem("shopList")) || [];

const cartNumsContainer = $("#cart-nums");
const addProducts = $(".add-products");
const productsImg = $(".products");
const productsName = $(".products-name");
const productsPrice = $(".products-price span");
const shopForm = $("#shoplist-container");
const totalPrice = $("#the-total");
const totalPriceMD = $("#total-price-md");
const notifShop = $("#notif-shop");
const goodsNums = $("#goods-nums");

let totalGoods = 0;
let totalPriceNum = 0;
let cartNums = localStorage.getItem("cartNums") || 0;
cartNumsContainer.html(cartNums);
let submitShould = true;

addProducts.each(function (index) {
  const addBtn = $(this);

  addBtn.click(function () {
    const name = productsName.eq(index).html();
    const price = productsPrice.eq(index).html();
    const img = productsImg.eq(index).attr("src");
    let itemFound = false;

    shopList.forEach((list) => {
      if (list.name === name) {
        itemFound = true;
        list.count++;
      }
    });

    if (!itemFound) {
      shopList.push({
        name,
        price,
        img,
        count: 1,
      });
    }

    localStorage.setItem("shopList", JSON.stringify(shopList));

    cartNums++;
    cartNumsContainer.html(cartNums);
    localStorage.setItem("cartNums", JSON.stringify(cartNums));
    console.log(shopList);
  });
});

const shopCardContainer = $("#shop-card-container");

function showCart() {
  shopCardContainer.empty();

  if (shopList.length === 0) {
    const p = $("<p>Not FOUND</p>");
    p.addClass("text-black font-bold");
    shopCardContainer.append(p);
    return;
  }

  cartList();
  const goodsCheck = document.querySelectorAll(".goods-check");
  goodsCheck.forEach((check) => {
    check.addEventListener("change", () => {
      let total = 0;
      totalGoods = 0;
      for (i = 0; i < goodsCheck.length; i++) {
        const { price, count } = shopList[i];
        if (goodsCheck[i].checked) {
          const recent = price * count;
          totalGoods += parseInt(count);
          total += recent;
        }
      }
      totalPriceNum = total;
      goodsNums.html(totalGoods);
      totalPrice.html(totalPriceNum.toFixed(2));
      totalPriceMD.html(totalPriceNum.toFixed(2));
    });
  });
}
showCart();

$("body").keypress(function (e) {
  if (e.key === "e" || e.key === "E") {
    shopList.length = 0;
    cartNums = 0;
    cartNumsContainer.html(cartNums);
    localStorage.clear();
    showCart();
  }
});

shopForm.submit(function (e) {
  if (!submitShould) {
    submitShould = true;
    e.preventDefault();
  } else if (!inputCheckk()) {
    alert("Please choose");
  } else {
    afterSubmit();
    $("body").addClass("overflow-hidden");
    notifShop.removeClass("hidden");
    e.preventDefault();
  }
});

$("#close-notif").click(function () {
  $("body").removeClass("overflow-hidden");
  notifShop.addClass("hidden");
});

function cartList() {
  shopList.forEach((list, index) => {
    const { name, price, img, count } = list;
    const card = $(
      `
<div class="shop-card">
    <label class="text-black text-sm font-bold flex items-center gap-2">
        <div>
            <input type="checkbox" class="goods-check ml-3 w-4 h-4 text-indigo-300 border-4">
        </div>

        <div>
            <img src=${img} alt="" class="w-[120px] h-[70px] object-cover object-center mx-4 rounded">
        </div>

        <div class="flex flex-col gap-2">
            <div class="text flex-col text-black gap-2">
                <p class="text-black font-medium">
                    ${name}
                </p>
                <p class="text-black">$<span class="text-black">${price}</span></p>
            </div>
            <div class="w-[100%] flex items-center justify-start">
                <button class="minus-button">
                  <svg data-name="Layer 1" width="20" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16">
                      <path d="M8 1a7 7 0 1 1-7 7 7 7 0 0 1 7-7m0-1a8 8 0 1 0 8 8 8 8 0 0 0-8-8z" />
                      <path d="M4 7h8v2H4z" />
                  </svg>
                </button>
                <p class="count-nums text-black px-5">
                  ${count}
                </p>
                <button class="plus-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32">
                      <g data-name="57-Add">
                          <path
                              d="M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm0 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14z" />
                          <path d="M17 15V6h-2v9H6v2h9v9h2v-9h9v-2h-9z" />
                      </g>
                  </svg>
                </button>
            </div>
        </div>
    </label>
    <div class="h-[1px] w-full my-5 bg-[#E4EBF5]"></div>
</div>`
    );
    shopCardContainer.append(card);

    const showCount = $(".count-nums").eq(index);
    const plusBtn = $(".plus-button").eq(index);
    const minuBtn = $(".minus-button").eq(index);
    const goodsCheck = $(".goods-check").eq(index);

    plusBtn.click(function () {
      submitShould = false;
      list.count++;
      cartNums++;
      cartNumsContainer.html(cartNums);
      showCount.html(list.count);
      localStorage.setItem("shopList", JSON.stringify(shopList));
      localStorage.setItem("cartNums", JSON.stringify(cartNums));
      if (goodsCheck.prop("checked")) {
        totalGoods++;
        goodsNums.html(totalGoods);
        totalPriceNum += parseFloat(list.price);
        totalPrice.html(totalPriceNum.toFixed(2));
        totalPriceMD.html(totalPriceNum.toFixed(2));
      }
    });

    minuBtn.click(function () {
      submitShould = false;
      list.count--;
      cartNums--;
      totalGoods--;
      goodsNums.html(totalGoods);
      cartNumsContainer.html(cartNums);
      showCount.html(list.count);

      if (goodsCheck.prop("checked")) {
        totalPriceNum -= parseFloat(list.price);
        totalPrice.html(totalPriceNum.toFixed(2));
        totalPriceMD.html(totalPriceNum.toFixed(2));
      }

      if (list.count <= 0) {
        shopList.splice(index, 1);
        card.remove();
        totalPriceNum = 0;
        totalPrice.html(totalPriceNum.toFixed(2));
        totalPriceMD.html(totalPriceNum.toFixed(2));
        showCart();
      }

      localStorage.setItem("shopList", JSON.stringify(shopList));
      localStorage.setItem("cartNums", JSON.stringify(cartNums));
    });
  });
}

function inputCheckk() {
  let result = false;
  const goodsCheck = document.querySelectorAll(".goods-check");
  goodsCheck.forEach((check) => {
    if (check.checked) result = true;
  });
  return result;
}

function afterSubmit() {
  const shopCard = document.querySelectorAll(".shop-card");
  const goodsCheck = document.querySelectorAll(".goods-check");

  const goodsCheckArr = Array.from(goodsCheck);

  const choosenIndex = goodsCheckArr.reduce((acc, checkBox, index) => {
    if (checkBox.checked) {
      acc.push(index);
    }

    return acc;
  }, []);

  let i = 0;
  choosenIndex.forEach((num) => {
    shopList.splice(num - i, 1);
    shopCard[num].remove();
    cartNums -= shopList[num].count;
    i++;
  });
  cartNumsContainer.html(cartNums);

  totalGoods = 0;
  totalPriceNum = 0;

  goodsNums.html(totalGoods);
  totalPrice.html(totalPriceNum.toFixed(2));
  totalPriceMD.html(totalPriceNum.toFixed(2));
  console.log(shopList);

  localStorage.setItem("cartNums", JSON.stringify(cartNums));
  localStorage.setItem("shopList", JSON.stringify(shopList));
}
console.log(shopList);
