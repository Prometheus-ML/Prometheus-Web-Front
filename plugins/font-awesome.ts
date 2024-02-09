import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons'

import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { faSchool } from '@fortawesome/free-solid-svg-icons'

import { faFire } from '@fortawesome/free-solid-svg-icons'

import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faMedal } from '@fortawesome/free-solid-svg-icons'

import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import { faFlaskVial } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false
library.add(faAngleLeft, faAngleRight, faInstagram, faGithub, faDiscord, faAngleDown, faGlobe, faTwitter, faFacebook, faApple, faGooglePlay, faAngleUp, faXmark)
library.add(faUsers, faCrown, faSchool, faFire, faPen, faEye, faEyeSlash, faMedal)
library.add(faScrewdriverWrench, faFlaskVial)
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})