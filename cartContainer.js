const shopList = JSON.parse(localStorage.getItem("shopList")) || [];

const cartNumsContainer = $("#cart-nums");
const addProducts = $(".add-products");
const productsImg = $(".products");
const productsName = $(".products-name");
const productsPrice = $(".products-price span");

let cartNums = localStorage.getItem("cartNums") || 0;
cartNumsContainer.html(cartNums);

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

  for (let index = 0; index < shopList.length; index++) {
    const list = shopList[index];
    const { name, price, img, count } = list;

    const card = $(
      `
<div class="shop-card">
    <label class="text-black text-sm font-bold flex items-center gap-2">
        <div>
            <input type="checkbox" class="ml-3 w-4 h-4 text-indigo-300 border-4">
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

    plusBtn.click(function () {
      list.count++;
      cartNums++;
      cartNumsContainer.html(cartNums);
      showCount.html(list.count);
      localStorage.setItem("shopList", JSON.stringify(shopList));
      localStorage.setItem("cartNums", JSON.stringify(cartNums));
    });

    minuBtn.click(function () {
      list.count--;
      cartNums--;
      console.log(shopList);
      cartNumsContainer.html(cartNums);
      showCount.html(list.count);

      if (list.count <= 0) {
        shopList.splice(index, 1);
        card.remove();
        showCart();
      }

      localStorage.setItem("shopList", JSON.stringify(shopList));
      localStorage.setItem("cartNums", JSON.stringify(cartNums));
    });
  }
}
showCart();

window.addEventListener("keypress", (e) => {
  if (e.key === "e") localStorage.clear();
  showCart();
});
