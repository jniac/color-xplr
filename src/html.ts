export const html: string = /* html */ `
<div class="colors">
  <div class="plane">
    <canvas width="256" height="256"></canvas>
    <div class="modes"></div>
    <div class="cursor"></div>
  </div>

  <div class="ranges">
    <div class="range hue">
      <canvas width="256" height="1"></canvas>
      <div class="cursor"></div>
    </div>
    <div class="range red">
      <canvas width="256" height="1"></canvas>
      <div class="cursor pin">
        <span>R</span>
      </div>
    </div>
    <div class="range green">
      <canvas width="256" height="1"></canvas>
      <div class="cursor pin">
        <span>G</span>
      </div>
    </div>
    <div class="range blue">
      <canvas width="256" height="1"></canvas>
      <div class="cursor pin">
        <span>B</span>
      </div>
    </div>
    <div class="range luminosity">
      <canvas width="256" height="1"></canvas>
      <div class="cursor pin">
        <span>L</span>
      </div>
    </div>
    <div class="range saturation">
      <canvas width="256" height="1"></canvas>
      <div class="cursor pin">
        <span>S</span>
      </div>
    </div>
  </div>

  <div class="string">
    <input />
  </div>
</div>
`
