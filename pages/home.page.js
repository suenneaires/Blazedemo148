class HomePage {
    // Arrange - Prepara
    // Mapear os elementos
    constructor(page) {
        // interno = externo
        this.page = page //Playwright (reservado)
        this.origem = '[name="fromPort"]'
        this.destino = '[name="toPort"]'
        this.btnFindFlights = '.btn.btn-primary' // classe nao leva []
    } // Fecha o constructor

    // Act - Executar
    // Mapear as ações
    async selecionar_viagem(origem, destino){
        await this.page.locator(this.origem).selectOption(origem)
        await this.page.locator(this.destino).selectOption(destino)
        await this.page.locator(this.btnFindFlights).click()
    } // Fecha selecionar_viagem

    // Assert - Valida
    // Faremos nos testes 

} // Fecha a classe

export default HomePage // torna a classe visível