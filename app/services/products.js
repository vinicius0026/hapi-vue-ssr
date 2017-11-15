const products = [
  {
    name: 'Monitor LED 27" Full HD Acer VA270H Widescreen 6ms 60Hz',
    price: 'R$ 779,00',
    image: 'https://static.wmobjects.com.br/imgres/arquivos/ids/10084965-220-220/monitor-led-27”-full-hd-acer-va270h-widescreen-6ms-60hz.jpg'
  }
]

export function fetch () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(products)
    }, 100)
  })
}
