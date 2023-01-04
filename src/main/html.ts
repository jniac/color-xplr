import { copySvg } from '../assets/copy.svg'

export const html: string = /* html */ `
<div class="colors">
  <div class="plane">
    <canvas width="256" height="256"></canvas>
    <div class="modes"></div>
    <div class="cursor"></div>
  </div>

  <div class="sliders">
    <div class="slider">
      <canvas width="256" height="1"></canvas>
      <div class="cursor"></div>
    </div>
    <div class="slider">
      <canvas width="256" height="1"></canvas>
      <div class="cursor"></div>
    </div>
    <div class="slider">
      <canvas width="256" height="1"></canvas>
      <div class="cursor"></div>
    </div>
    <div class="slider">
      <canvas width="256" height="1"></canvas>
      <div class="cursor"></div>
    </div>
    <div class="slider">
      <canvas width="256" height="1"></canvas>
      <div class="cursor"></div>
    </div>
    <div class="slider">
      <canvas width="256" height="1"></canvas>
      <div class="cursor"></div>
    </div>
  </div>

  <div class="string">
    <input />
    <div class="copy">
      ${copySvg}
    </div>
  </div>
</div>
`
