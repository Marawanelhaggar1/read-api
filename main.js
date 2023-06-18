const getEgpCurrency = async () => {
  let currency = await fetch(
    "https://openexchangerates.org/api/latest.json?app_id=4fb54a06490f4d09a8bf0049e7b9d7eb"
  );
  currency = await currency.json();
  return currency.rates.EGP;
};
const getData = async function () {
  let egpCurrency = await getEgpCurrency();
  try {
    let data = await fetch("https://api.escuelajs.co/api/v1/products");
    data = await data.json();

    let catId = [];
    data.forEach((e) => {
      catId.push(e.category.id);
    });

    let UniqueId = new Set(catId);
    UniqueId = [...UniqueId];

    let finallArray = [];
    UniqueId.forEach(function (a, i) {
      let categorize = {
        category: {
          id: a,
        },
        products: [],
      };

      data.forEach((el) => {
        if (a === el.category.id) {
          categorize.category.name = el.category.name;
          let obj = {
            id: el.id,
            title: el.title,
            price: el.price * egpCurrency + `$`,
            description: el.description,
            category: {
              id: el.category.id,
              name: el.category.name,
              image: el.category.image,
            },
          };
          categorize.products.push(obj);
        }
      });
      finallArray.push(categorize);
    });
    console.log(finallArray);
  } catch (error) {
    console.log(error);
  }
};

getData();
