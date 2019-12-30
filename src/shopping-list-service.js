const ShoppingListService = {
  countAllItems(knex) {
    return knex
      /* .select('*') */
      .from('shopping_list').count('*')
      .then(result => {
      console.log(result)
      })
  },
  getAllItems(knex) {
    return knex
      .select('*')
      .from('shopping_list')
      .then(result => {
        console.log(result)
      })
  },
  getById(knex, id) {
    return knex
     .from('shopping_list')
     .select('*')
     .where('id', id)
     .first()
     .then(result => {
       console.log(result)
     })
  },
  deleteItem(knex, id) {
    return knex('shopping_list')
      .where({ id })
      .delete()
      .then(result => {
        console.log(result)
      })
  },
  updateItem(knex, id, newItemFields) {
    return knex('shopping_list')
      .where({ id })
      .update(newItemFields)
      .then(result => {
        console.log(result)
      })
  },
  insertItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(rows => rows[0])
  },
}

module.exports = ShoppingListService