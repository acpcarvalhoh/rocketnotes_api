exports.up = knex => knex.schema.createTable("links", table => {
    table.increments("id");
    table.text("url").notNullable(); //não aceita nullo
    table.timestamp("created_at").default(knex.fn.now())


    table.integer("notes_id").references("id").inTable("notes").onDelete("CASCADE")
    

}); //criar tabela
  
exports.down = knex => knex.schema.dropTable("links") //deletar tabela

