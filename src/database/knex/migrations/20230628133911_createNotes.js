
exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id")
    table.text("title")
    table.text("discription")
    table.integer("user_id").references("id").inTable("users")

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())

}); //criar tabela
  


exports.down = knex => knex.schema.dropTable("notes") //deletar tabela