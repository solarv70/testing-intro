const products = require("../../src/data/products");
const { sortProductsByPrice } = require("../../src/catalog");

describe("sortProductsByPrice", () => {
  test("все товары с 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products, "asc").map(({ id }) => id)).toEqual([
      3, 6, 5, 4, 2, 1,
    ]);
  });

  test("все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products).map(({ id }) => id)).toEqual([
      3, 6, 5, 4, 2, 1,
    ]);
  });

  test("товары [1, 3, 4] с 'asc' сортируются как [3, 4, 1]", () => {
    const selectedProducts = products.filter(({ id }) =>
      [1, 3, 4].includes(id),
    );
    expect(
      sortProductsByPrice(selectedProducts, "asc").map(({ id }) => id),
    ).toEqual([3, 4, 1]);
  });

  test("все товары с 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(sortProductsByPrice(products, "desc").map(({ id }) => id)).toEqual([
      1, 2, 4, 5, 6, 3,
    ]);
  });

  test("товары [3, 1, 4] с 'desc' сортируются как [1, 4, 3]", () => {
    const selectedProducts = [3, 1, 4].map((id) =>
      products.find((product) => product.id === id),
    );
    expect(
      sortProductsByPrice(selectedProducts, "desc").map(({ id }) => id),
    ).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] с 'desc' сортируются как [2, 5, 6]", () => {
    const selectedProducts = [5, 2, 6].map((id) =>
      products.find((product) => product.id === id),
    );
    expect(
      sortProductsByPrice(selectedProducts, "desc").map(({ id }) => id),
    ).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const selectedProducts = products.filter(({ id }) =>
      [1, 3, 4].includes(id),
    );
    sortProductsByPrice(selectedProducts, "asc");
    expect(selectedProducts.map(({ id }) => id)).toEqual([1, 3, 4]);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const selectedProducts = products.filter(({ id }) =>
      [1, 3, 4].includes(id),
    );
    sortProductsByPrice(selectedProducts, "desc");
    expect(selectedProducts.map(({ id }) => id)).toEqual([1, 3, 4]);
  });

  test("направление по умолчанию не меняет исходный массив всех товаров", () => {
    const originalIds = products.map(({ id }) => id);
    sortProductsByPrice(products);
    expect(products.map(({ id }) => id)).toEqual(originalIds);
  });
});
