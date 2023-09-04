exports.up = function(knex) {
    return knex.schema.alterTable('notes', function(table) {
      table.renameColumn('discription', 'description'); // Renomeia a coluna "discription" para "description"
    });
};
  
exports.down = function(knex) {
    return knex.schema.alterTable('notes', function(table) {
      table.renameColumn('description', 'discription'); // Desfaz a alteração, renomeando de volta para "discription"
    });
};
  
