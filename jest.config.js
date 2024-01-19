module.exports = {
  bail: true, // Se um teste falhar ele para a execução dos teste.
  coverageProvider: "v8",


  testMatch: [
    "<rootDir>/src/**/*.spec.js", // Quando o teste for executado ele ignora outros arquivos
    /// roorDir inora a pasta node_modules
  ],
}