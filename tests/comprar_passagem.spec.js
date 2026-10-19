// Frameworks, pacotes e bibliotecas
import { test, expect } from '@playwright/test'

// Funções ou métodos (testes)
test('Comprar Passagem', async ( {page} ) => {

    // abrir o navegador
    await page.goto('https://www.blazedemo.com')

    // selecionar as cidades de origem e destino, clicar em Find Flights
    await page.locator('select[name="fromPort"]').selectOption("São Paolo")
    await page.locator('select[name="toPort"]').selectOption("London")
    await page.locator('.btn-primary').click()

    // transição de página
    // verificar se o endereço da página e o texto âncora
    await expect(page).toHaveURL(/reserve\.php/)
    await expect(page.locator('h3')).toHaveText('Flights from São Paolo to London:')

    // selecionar o botão com base nas informações do voo
    await page.getByRole('row', 
        { name: 'Choose This Flight 9696 Aer Lingus	5:27 AM	8:22 PM	$200.98'})
        .getByRole('button').click()

    // transição de página
    // espera a página carregar antes de prosseguir
    await page.waitForURL(/purchase\.php/)    

    // verificar se o endereço da página e o texto âncora
    await expect(page).toHaveURL(/purchase\.php/)
    await expect(page.locator('h2')).toHaveText('Your flight from TLV to SFO has been reserved.')

    // preencher primeiro nome, bandeira do cartão, e lembre-se de mim
    await page.locator('#inputName').fill('Suenne')
    await page.locator('#cardType').selectOption('amex')
    await page.locator('#rememberMe').check()
    // clicar no botão Purchase Flights
    await page.locator('.btn.btn-primary').click()

    // transição de página
    // verificar se o endereço da página e o texto âncora
    await expect(page).toHaveURL(/confirmation\.php/)
    await expect(page.locator('h1')).toHaveText('Thank you for your purchase today!')

    // verificar o preço da passagem
    await expect(page.getByRole('row', { name: 'Amount	555 USD' })).toBeVisible()

}) // Fecha o teste 'Comprar Passagem'