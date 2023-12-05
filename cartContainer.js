const shopList = [];
const cartNumsContainer = $("#cart-nums");
const addProducts = $(".add-products");
const productsImg = $(".products");
const productsName = $(".products-name");
const productsPrice = $(".products-price span");
let cartNums = 0;

addProducts.each(function (index) {
  const addBtn = $(this);

  addBtn.click(function () {
    const name = productsName.eq(index).html();
    const price = productsPrice.eq(index).html();
    const img = productsImg.eq(i).attr("src");
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

    cartNums++;
    cartNumsContainer.html(cartNums);
    console.log(shopList);
  });
});
