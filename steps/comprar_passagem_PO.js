const { test, expect } = require ('@playwright/test')

import HomePage from '../pages/home.page'
import ReservePage from '../pages/reserve.page'
import PurchasePage from '../pages/purchase.page'
import ConfirmationPage from '../pages/confirmation.page'

const origem = 'São Paolo'
const destino = 'London'
const flight = '12'
const airline = 'Virgin America'
const departs = '11:23 AM'
const arrives = '1:45 PM'
const price = '$765.32'
const name = 'Suenne'
const cardtype = 'amex'
const amount = '555 USD'

test('Comprar Passagem PO', async( {page} ) => {
    // Instanciar os objetos do Page Object
    const homePage = new HomePage(page)
    const reservePage = new ReservePage(page)
    const purchasePage = new PurchasePage(page)
    const confirmationPage = new ConfirmationPage(page)
    
    // Página Principal - Home
    await page.goto('https://www.blazedemo.com')
    await homePage.selecionar_viagem(origem, destino)

    // Página de Reserva
    await expect(page).toHaveURL(reservePage.url)
    await expect(page.locator(reservePage.titulosecao))
        .toHaveText(`Flights from ${origem} to ${destino}:`)

    await reservePage.selecionar_voo(flight,airline,departs,arrives,price)
    
    // Página de Compra - Purchase
    await expect(page).toHaveURL(purchasePage.url)
    await expect(page.locator(purchasePage.titulosecao))
        .toHaveText('Your flight from TLV to SFO has been reserved.')

    await purchasePage.preencher_nome(name)
    await purchasePage.selecionar_bandeira(cardtype)
    await purchasePage.lembrar_de_mim()
    await purchasePage.clicar_para_concluir_compra()

    // Página de confirmação - Confirmation
    await expect(page).toHaveURL(confirmationPage.url)
    await expect(page.locator(confirmationPage.mensagem))
        .toHaveText('Thank you for your purchase today!')
    await expect(page.getByRole('row', 
                { name: `${confirmationPage.labelprice} ${amount}`, exact:true })).toBeVisible()            

})
