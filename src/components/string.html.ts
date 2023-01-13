import { aSvg } from '../assets/A.svg'
import { copySvg } from '../assets/copy.svg'
import { refreshSvg } from '../assets/refresh.svg'

export const stringHtml = /* html */`
  <div class="string">
    <div class="background">
      <div></div>
      <div class="middle"></div>
      <div></div>
    </div>
    <input />
    <div class="abs left">
      <div class="btn next">${refreshSvg}</div>
      <div class="btn alpha">${aSvg}</div>
    </div>
    <div class="abs right">
      <div class="btn copy">${copySvg}</div>
    </div>
  </div>
`