class PurchasePage {

    constructor(page){
        this.page = page
        this.url = 'purchase'
        this.titulosecao = 'h2'             // seletor do tipo tag
        this.name = '#inputName'            // seletor do tipo id
        this.cardtype = '[name="cardType"]' // seletor do tipo parametro
        this.rememberme = '#rememberMe'     // seletor do tipo id
        this.btnPurchaseFlight = '.btn.btn-prymary' // seletor do tipo class
    }

    async preencher_nome(nome){
        await this.page.locator(this.name).fill(nome)
    }

    async selecionar_bandeira(bandeira){
        await this.page.locator(this.cardtype).selectOption(bandeira)
    }

    async lembrar_de_mim(){
        await this.page.locator(this.rememberme).check()
    }

    async clicar_para_concluir_compra(){
        await this.page.locator(this.btnPurchaseFlight).click()
    }


} // fecha a class PurchaseFlight




module.exports = PurchasePage