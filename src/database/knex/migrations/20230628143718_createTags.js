exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("name").notNullable(); // Define a coluna "name" como não nula

    table.integer("notes_id").references("id").inTable("notes").onDelete("CASCADE")
    table.integer("user_id").references("id").inTable("users");

}); //criar tabela
  
exports.down = knex => knex.schema.dropTable("tags") //deletar tabela

