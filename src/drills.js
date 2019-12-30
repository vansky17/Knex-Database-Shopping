require('dotenv').config()
const ShoppingListService = require('./shopping-list-service')

const knex = require('knex')
const knexInstance = knex({
  client: 'pg',
  /* connection: process.env.DB_URL */
  connection: 'postgresql://dunder_muffin@localhost/knex-practice' 
})
//1. Get the number of entries
/* knexInstance.from('shopping_list').count('*')
  .then(result => {
    console.log(result);
  }) */

//2. Search by product name
  searchByProductName = (searchTerm) => {
    knexInstance
      .select('id', 'product_name', 'price', 'category', 'date_added')
      .from('shopping_list')
      .where('product_name', 'ILIKE', `%${searchTerm}%`)
      .then(result => {
        console.log(result);
      })
  }
 /*  searchByProductName('salami'); */
//3. Pagination
  function paginateProducts(page) {
    const productsPerPage = 6
    const offset = productsPerPage * (page - 1)
    knexInstance
      .select('id', 'product_name', 'price', 'category', 'date_added')
      .from('shopping_list')
      .limit(productsPerPage)
      .offset(offset)
      .then(result => {
        console.log(result)
      })
  }
 
 /*  paginateProducts(1); */
 //4. Products added days ago
 function productsAddedDaysAgo(daysAgo) {
  knexInstance
    .select('id', 'product_name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo)
    )
    .then(results => {
      console.log(results)
    })
}

/* productsAddedDaysAgo(3); */
//5. Total costs per category
function totalCategoryCosts() {
  knexInstance
      .select('category')
      .from('shopping_list')
      .groupBy('category')
      .sum('price AS total')
      .then(result => {
          console.log(result)
      })
}
/* totalCategoryCosts(); */

/* ShoppingListService.getAllItems(knexInstance); */
ShoppingListService.countAllItems(knexInstance);

/* ShoppingListService.updateItem(knexInstance, 1, {
  product_name: 'DIngs',
  price: 17.00
}); */
ShoppingListService.getById(knexInstance, 1); 
/* ShoppingListService.insertItem(knexInstance, {
  product_name: 'NEW',
  price: '17.10',
  date_added: new Date(),
  checked: false,
  category: 'Main',
});  */
/* ShoppingListService.deleteItem(knexInstance, 19); */
