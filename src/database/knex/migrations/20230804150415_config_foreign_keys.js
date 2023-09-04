exports.up = function(knex) {
    return knex.schema.table("links", table => {
      // Verifique se a chave estrangeira já existe antes de recriá-la
      if (!table.foreign(["notes_id"]).references("notes.id").onDelete("CASCADE")) {
        table
          .foreign("notes_id")
          .references("id")
          .inTable("notes")
          .onDelete("CASCADE");
      }
    });
};
  
exports.down = function(knex) {
    return knex.schema.table("links", table => {
      table.dropForeign("notes_id");
    });
};
  
