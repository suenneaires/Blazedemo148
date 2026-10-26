class ReservePage{

    constructor(page){
        this.page = page
        this.url = /reserve/
        this.titulosecao = 'h3'
    }// Fecha o constructor

    // Localiza uma linha na tabela com os dados correspondentes
    // Nessa linha selecionada, clica no botão
    async selecionar_voo(flight, airline, departs, arrives, price){
        await this.page.getByRole('row', 
            {name: `Choose This Flight
            ${flight} 
            ${airline}
            ${departs}
            ${arrives}
            ${price} 
            `}).getByRole('button').click()
    }

} // Fecha a classe ReservePage

module.exports = ReservePage