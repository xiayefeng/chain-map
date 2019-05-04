export function testFullScreen (el) {
  el.requestFullscreen()
  // test.getComputedStyle('hieght')
}

window.addEventListener('resize', function () {
  let c = window.getComputedStyle(test)
  console.log(c.width)
  console.log(c.height)
}, false)
