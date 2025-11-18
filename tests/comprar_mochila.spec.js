// This sample code supports WebdriverIO client >=9.7.0
// (npm i --save webdriverio)
// Then paste this into a .js file and run with Node:
// node <file>.js

//const {remote} = require('@appium/client');
const {remote} = require('webdriverio') //biblioteca WebDriver.io
const assert = require ('assert')

async function main () {
  const caps = {
  "platformName": "Android",
  "appium:platformVersion": "13.0",
  "appium:deviceName": "emulator5554",
  "appium:deviceOrientation": "portrait",
  "appium:appPackage": "com.saucelabs.mydemoapp.android",
  "appium:appActivity": "com.saucelabs.mydemoapp.android.view.activities.SplashActivity",
  "appium:automationName": "UiAutomator2",
  "browserName": "",
  "appium:ensureWebviewsHavePages": true,
  "appium:nativeWebScreenshot": true,
  "appium:newCommandTimeout": 3600,
  "appium:connectHardwareKeyboard": true,
  "webSocketUrl": true,
  "unhandledPromptBehavior": "ignore"
}
  const driver = await remote({
    protocol: "http",
    hostname: "127.0.0.1",
    port: 4723,
    path: "/",
    capabilities: caps
  });

  // Products
  const lbl_titulo_secao = await driver.$("accessibility id:title")
  let resultado_atual = await lbl_titulo_secao.getText() // pega o texto do elemento
  await assert.strictEqual(resultado_atual, "Products")
  // Clicar na Mochila
  const el2 = await driver.$("-android uiautomator:new UiSelector().resourceId(\"com.saucelabs.mydemoapp.android:id/productIV\").instance(0)")
  await el2.click()
  // Nome do Produto
  const lbl_nome_produto = await driver.$("id:com.saucelabs.mydemoapp.android:id/productTV")
  resultado_atual = await lbl_nome_produto.getText() // pega o texto do elemento
  await assert.strictEqual(resultado_atual, "Sauce Labs Backpack")
  // Preço do Produto
  const el4 = await driver.$("id:com.saucelabs.mydemoapp.android:id/priceTV") //comparar preço
  await el4.click()
  // Arrasta para cima
  await driver.action('pointer')
    .move({ duration: 0, x: 533, y: 1825 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 529, y: 1160 })
    .up({ button: 0 })
    .perform();
  // Adcionar no carrinho
  const el5 = await driver.$("accessibility id:Tap to add product to cart")
  await el5.click() // clicar no carrinho
  // Quantidade no carrinho
  const el6 = await driver.$("id:com.saucelabs.mydemoapp.android:id/cartTV")
  await el6.click() //comparar carrinho

  // Ir para o carrinho
  const el7 = await driver.$("id:com.saucelabs.mydemoapp.android:id/cartIV")
  await el7.click() // clicar carrinho
  // Cart
  const el8 = await driver.$("id:com.saucelabs.mydemoapp.android:id/productTV") //nome da seção
  await el8.click()
  // Nome do produto
  const el9 = await driver.$("id:com.saucelabs.mydemoapp.android:id/titleTV") // mome produto
  await el9.click()
  // preço
  const el10 = await driver.$("id:com.saucelabs.mydemoapp.android:id/priceTV") // verificar preço
  await el10.click();
  // Quantidade
  const el11 = await driver.$("id:com.saucelabs.mydemoapp.android:id/noTV") //verificar quantidade
  await el11.click()
  // Termina - Apga a sessão
  await driver.deleteSession()
  //console.log('Sessao finalizada')
}

main().catch(console.log);