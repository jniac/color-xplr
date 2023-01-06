const dev = /(localhost|127.0.0.1)/.test(window.location.hostname)
const url = dev 
  ? '../../lib/index.js'
  : 'https://unpkg.com/@jniac/color-xplr' 
const script = document.createElement('script')
script.setAttribute('type', 'importmap')
script.innerHTML = `
{
  "imports": {
    "@jniac/color-xplr": "${url}"
  }
}
`
document.head.append(script)
