import { copySvg } from '../assets/copy.svg'

export const slider: string = /* html */`
  <div class="slider">
    <canvas width="256" height="1"></canvas>
    <div class="cursor"></div>
  </div>
`

export const html: string = /* html */ `
<div class="colors">
  <div class="plane">
    <canvas width="256" height="256"></canvas>
    <div class="modes"></div>
    <div class="cursor"></div>
  </div>

  <div class="sliders">
  </div>

  <div class="string">
    <div class="background"></div>
    <input />
    <div class="copy">
      ${copySvg}
    </div>
  </div>
</div>
`

const div = document.createElement('div')
export const factory = {
  slider: () => {
    div.innerHTML = slider
    return div.firstElementChild as HTMLDivElement
  },
}