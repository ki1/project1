import { LIGHT_BOX_MODAL, ERROR_TYPES, FLAGS } from '../constants/images';
import { COMMON_COLORS, BASE_FONTS, CASE_TYPES } from '../constants/common';

const themes = {
  wowcher: {
    label: 'Wowcher',
    breakpoints: {
      xs: '450px',
      smDown: '575.98px',
      smUp: '576px',
      mdDown: '767.98px',
      mdUp: '768px',
      lgDown: '991.98px',
      lgUp: '992px',
      xlDown: '1199.98px',
      xlUp: '1200px',
    },
    bootstrap: {
      modalbackdropclassname: 'modal-backdrop-wowcher',
    },
    boxshadow: `${COMMON_COLORS.dropshadow} 0 3px 6px`,
    commoncolors: COMMON_COLORS,
    colors: {
      primary: '#eb008c',
      primaryonwhite: '#eb008c',
      textonprimary: '#ffffff',
      primarypale: '#fbcfe9',
      primarydark: '#b8006e',
      secondary: '#00EBD9',
      textonsecondary: '#ffffff',
      headingtext: '#000000',
      bodytext: COMMON_COLORS.greycharcoal,
      dropshadow: COMMON_COLORS.dropshadow,
      background: '#ffffff',
      checkoutmodulebg: COMMON_COLORS.white,
      checkoutlinkhover: COMMON_COLORS.linkhover,
      linkhover: COMMON_COLORS.linkhover,
      basketcount: COMMON_COLORS.basketcount,
      imagelink: '#eb008c',
      footerbackground: COMMON_COLORS.jet,
      footerlegaltext: COMMON_COLORS.white,
      footerlink: COMMON_COLORS.white,
      headerbackground: '#ffffff',
      headergiftfinderbackground: '#eb008c',
      headergiftfindertext: '#ffffff',
      headerlocationtext: '#666666',
      headerlocationbackgroundactive: '#eb008c',
      headerlocationtextactive: '#ffffff',
      mobilemenubg: COMMON_COLORS.white,
      navmorebackground: '#ffffff',
      navbackground: '#f0f0f0',
      navlink: '#666666',
      navlinkactive: '#eb008c',
      navborder: '#d2d2d2',
      navmoreheader: '#999999',
      searchbg: '#ffebf7',
      searchbgfocused: '#ffffff',
      searchborderfocused: '#000000',
      searchbuttonbg: 'transparent',
      searchbuttonbgfocused: '#000000',
      searchbuttonfocused: '#ffffff',
      searchplaceholder: '#aaaaaa',
      linealgradient1: '#00b8fe',
      linealgradient2: '#006ffd',
      borderbottom: '#006ffd',
      buttonprimary: COMMON_COLORS.buttonprimary,
      buttonprimaryhover: COMMON_COLORS.buttonprimaryhover,
      buttontext: COMMON_COLORS.white,
      buttonsecondary: COMMON_COLORS.buttonsecondary,
      buttonsecondaryhover: COMMON_COLORS.buttonsecondaryhover,
      buttontertiary: COMMON_COLORS.buttontertiary,
      buttontertiaryhover: COMMON_COLORS.buttontertiaryhover,
      loginmenubutoncolor: '#ffffff',
      countdownnumbers: COMMON_COLORS.countdownnumbers,
      tilebordercolor: '#eb008c',
      bgvalidcolor: COMMON_COLORS.bgvalidcolor,
      inputdefaultborder: COMMON_COLORS.inputdefaultborder,
      inputiconcolor: COMMON_COLORS.inputiconcolor,
      inputvalidcolor: COMMON_COLORS.inputvalidcolor,
      inputinvalidcolor: COMMON_COLORS.inputinvalidcolor,
      inputfocuscolor: COMMON_COLORS.inputfocuscolor,
      inputlogincolor: COMMON_COLORS.inputlogincolor,
      subscribebutton: '#eb008c',
      didomibackgroundcolor: COMMON_COLORS.jet,
      bidomicolor: COMMON_COLORS.white,
      checkoutloginlink: '#eb008c',
      checkoutloginlinkactive: '#ab004c',
      minimenu: '#b8006e',
      breadcrumb: COMMON_COLORS.greyshade,
      emptydeal: COMMON_COLORS.greylighter,
      dealbackgroundcolor: COMMON_COLORS.white,
      dealavailability: '#E21B85',
      dealviewbutton: '#0000EB',
      dealtext: COMMON_COLORS.greycharcoal,
      dealmobiletitle: COMMON_COLORS.white,
      dealboughtcounttext: '#eb008c',
      emptysearbackground: COMMON_COLORS.white,
      emptysearchmessage: '#666666',
      arrowcolor: COMMON_COLORS.white,
      arrowbackground: '#eb008c',
      dealvideoicon: COMMON_COLORS.white,
      infoboxbg: COMMON_COLORS.infoboxbg,
      infoboxborder: COMMON_COLORS.infoboxborder,
      filtermodal: COMMON_COLORS.white,
      filterslider: '#eb008c',
      infoboxtext: COMMON_COLORS.infoboxtext,
      successboxbg: COMMON_COLORS.bgvalidcolor,
      successboxborder: COMMON_COLORS.inputvalidcolor,
      successboxtext: COMMON_COLORS.validtext,
      errorboxbg: COMMON_COLORS.invalidbg,
      errorboxborder: COMMON_COLORS.inputinvalidcolor,
      errorboxtext: COMMON_COLORS.invalidtext,
      paymentbuttonbg: COMMON_COLORS.greyxlighter,
      lightboxbuttoncolor: '#eb008c',
      lightboxbuttonbackground: COMMON_COLORS.white,
      lightboxbuttonborderbottom: '1px solid eb008c',
      lightboxsubmitbuttonbackground:
        'linear-gradient(180deg, #00b8fe 0, #006ffd)',
      lightboxsubmitbuttonborder: 'none',
      lightboxcontainerborder: '1px solid rgba(0, 0, 0, 0.2)',
      lightboxcontainerboxshadow: '0 3px 9px rgba(0, 0, 0, 0.5)',
      lightboxlegaltextcolor: '#65bcdf',
      lightboxlegaltextcolor768: '#65bcdf',
      lightboxgreenborders: '#6bba70',
      lightboxredborders: '#eb008c',
      lightboxgrayborders: '#c7c7c7',
      ihealthtext: COMMON_COLORS.greyshade,
      notificationblue: '#2c90e9',
      notificationbluelight: '#eaf4fd',
      notificationbluedark: '#4a90e2',
      charcoal: 'rgba(51, 51, 51, 1)',
      white: 'rgba(255, 255, 255, 1)',

      socialcuecolor: {
        assure: COMMON_COLORS.assure,
        assurelighter: COMMON_COLORS.assurelighter,
        alert: COMMON_COLORS.alert,
        primary: '#00EBD9',
        textonprimary: '#000000',
      },
    },
    images: {
      headerlogo:
        'https://resources.wowcher.co.uk/images/logo__black--transparent.png',
      headerLogoReversed:
        'https://resources.wowcher.co.uk/images/wowcher_logo_white.png',
      headerlogomdwidth: '88px',
      headerlogolgwidth: '92px',
      flags: {
        headerflaguk: FLAGS.unitedKingdom,
        headerflagie: FLAGS.ireland,
      },
      dealsplat: 'https://resources.wowcher.co.uk/images/splat.svg',
      lightbox: {
        popeye: LIGHT_BOX_MODAL.brands.wowcher.background.popeye,
        subscribe: LIGHT_BOX_MODAL.brands.wowcher.background.subscribe,
      },
      error404: ERROR_TYPES.brands.wowcher[404],
    },
    fonts: {
      base: BASE_FONTS,
      theme: '',
    },
    text: {
      transform: CASE_TYPES.capitalize,
      cta: {
        button: CASE_TYPES.upperCase,
      },
      navigation: {
        transform: CASE_TYPES.upperCase,
        size: 13,
      },
      logintitle: {
        transform: 'none',
      },
      cardbutton: {
        fontsize: `2.5vw`,
        lineheight: `2.5vw`,
      },
      lightbox: CASE_TYPES.upperCase,
      error404: 'inherit',
      error404placeholder: 'inherit',
      search: 'inherit',
    },
    switches: {
      showFlags: false,
      showCareersImageLink: true,
      navvisibilitycount: {
        xl: 10,
        lg: 7,
        md: 5,
      },
    },
  },
  'living-social': {
    label: 'Living-social',
    breakpoints: {
      xs: '450px',
      smDown: '575.98px',
      smUp: '576px',
      mdDown: '767.98px',
      mdUp: '768px',
      lgDown: '991.98px',
      lgUp: '992px',
      xlDown: '1199.98px',
      xlUp: '1200px',
    },
    bootstrap: {
      modalbackdropclassname: 'modal-backdrop-livingsocial',
    },
    boxshadow: `${COMMON_COLORS.dropshadow} 0 3px 6px`,
    commoncolors: COMMON_COLORS,
    colors: {
      primary: '#3facd7',
      primaryonwhite: '#3facd7',
      textonprimary: '#ffffff',
      primarypale: '#b8deef',
      primarydark: '#2792bc',
      secondary: '#00EBD9',
      textonsecondary: '#ffffff',
      headingtext: '#000000',
      bodytext: COMMON_COLORS.greycharcoal,
      dropshadow: COMMON_COLORS.dropshadow,
      background: '#ffffff',
      checkoutmodulebg: COMMON_COLORS.white,
      checkoutlinkhover: COMMON_COLORS.linkhover,
      linkhover: COMMON_COLORS.linkhover,
      basketcount: COMMON_COLORS.basketcount,
      imagelink: '#3facd7',
      footerbackground: COMMON_COLORS.jet,
      footerlegaltext: COMMON_COLORS.white,
      footerlink: COMMON_COLORS.white,
      headerbackground: '#ffffff',
      headergiftfinderbackground: '#3facd7',
      headergiftfindertext: '#ffffff',
      headerlocationtext: '#666666',
      headerlocationbackgroundactive: '#3facd7',
      headerlocationtextactive: '#ffffff',
      mobilemenubg: COMMON_COLORS.white,
      navmorebackground: '#ffffff',
      navbackground: '#f0f0f0',
      navlink: '#666666',
      navlinkactive: '#3facd7',
      navborder: '#d2d2d2',
      navmoreheader: '#999999',
      searchbg: '#dff1f8',
      searchbgfocused: '#ffffff',
      searchborderfocused: '#000000',
      searchbuttonbg: 'transparent',
      searchbuttonbgfocused: '#000000',
      searchbuttonfocused: '#ffffff',
      searchplaceholder: '#aaaaaa',
      linealgradient1: '#544aa1',
      linealgradient2: '#544aa1',
      borderbottom: '#3a3370',
      buttonprimary: COMMON_COLORS.buttonprimary,
      buttonprimaryhover: COMMON_COLORS.buttonprimaryhover,
      buttontext: COMMON_COLORS.white,
      buttonsecondary: COMMON_COLORS.buttonsecondary,
      buttonsecondaryhover: COMMON_COLORS.buttonsecondaryhover,
      buttontertiary: COMMON_COLORS.buttontertiary,
      buttontertiaryhover: COMMON_COLORS.buttontertiaryhover,
      countdownnumbers: COMMON_COLORS.countdownnumbers,
      tilebordercolor: '#3facd7',
      bgvalidcolor: COMMON_COLORS.bgvalidcolor,
      inputdefaultborder: COMMON_COLORS.inputdefaultborder,
      inputiconcolor: COMMON_COLORS.inputiconcolor,
      inputvalidcolor: COMMON_COLORS.inputvalidcolor,
      inputinvalidcolor: COMMON_COLORS.inputinvalidcolor,
      inputfocuscolor: COMMON_COLORS.inputfocuscolor,
      inputlogincolor: COMMON_COLORS.inputlogincolor,
      subscribebutton: '#3facd7',
      didomibackgroundcolor: COMMON_COLORS.jet,
      bidomicolor: COMMON_COLORS.white,
      checkoutloginlink: '#3facd7',
      checkoutloginlinkactive: '#0f6c97',
      minimenu: '#2792bc',
      breadcrumb: COMMON_COLORS.greyshade,
      emptydeal: COMMON_COLORS.greylighter,
      dealbackgroundcolor: COMMON_COLORS.white,
      dealavailability: '#3facd7',
      dealviewbutton: '#3a3370',
      dealtext: COMMON_COLORS.greycharcoal,
      dealmobiletitle: COMMON_COLORS.white,
      dealboughtcounttext: '#3a3370',
      emptysearbackground: COMMON_COLORS.white,
      emptysearchmessage: '#666666',
      arrowcolor: COMMON_COLORS.white,
      arrowbackground: '#3facd7',
      dealvideoicon: COMMON_COLORS.white,
      infoboxbg: COMMON_COLORS.infoboxbg,
      infoboxborder: COMMON_COLORS.infoboxborder,
      filtermodal: COMMON_COLORS.white,
      filterslider: '#3facd7',
      infoboxtext: COMMON_COLORS.infoboxtext,
      successboxbg: COMMON_COLORS.bgvalidcolor,
      successboxborder: COMMON_COLORS.inputvalidcolor,
      successboxtext: COMMON_COLORS.validtext,
      errorboxbg: COMMON_COLORS.invalidbg,
      errorboxborder: COMMON_COLORS.inputinvalidcolor,
      errorboxtext: COMMON_COLORS.invalidtext,
      paymentbuttonbg: COMMON_COLORS.greyxlighter,
      lightboxbuttoncolor: COMMON_COLORS.white,
      lightboxbuttonbackground: '#3facd7',
      lightboxbuttonborderbottom: '3px solid #389ac1',
      lightboxsubmitbuttonbackground:
        'linear-gradient(180deg,#544aa1 0,#544aa1)',
      lightboxsubmitbuttonborder: '3px solid #3a3370',
      lightboxcontainerborder: 'none',
      lightboxcontainerboxshadow: 'none',
      lightboxlegaltextcolor: '#65bcdf',
      lightboxlegaltextcolor768: '#333333',
      lightboxgreenborders: '#6bba70',
      lightboxredborders: '#3facd7',
      lightboxgrayborders: '#c7c7c7',
      ihealthtext: COMMON_COLORS.greyshade,
      notificationblue: '#2c90e9',
      notificationbluelight: '#eaf4fd',
      notificationbluedark: '#4a90e2',
      charcoal: '#333',
      white: '#fff',

      socialcuecolor: {
        assure: COMMON_COLORS.assure,
        assurelighter: COMMON_COLORS.assurelighter,
        alert: COMMON_COLORS.alert,
        primary: '#eb008c',
        textonprimary: '#ffffff',
      },
    },
    images: {
      headerlogo:
        'https://resources.wowcher.co.uk/images/ls/livingsocial-header-logo.svg',
      headerLogoReversed:
        'https://resources.wowcher.co.uk/images/ls/livingsocial-header-logo-white.svg',
      headerlogomdwidth: '120px',
      headerlogolgwidth: '149px',
      flags: {
        headerflaguk: FLAGS.unitedKingdom,
        headerflagie: FLAGS.ireland,
      },
      dealsplat:
        'https://resources.wowcher.co.uk/images/ls/LS-Blobs-yellow.png',
      lightbox: {
        popeye: LIGHT_BOX_MODAL.brands.livingSocial.background.popeye,
        subscribe: LIGHT_BOX_MODAL.brands.livingSocial.background.subscribe,
      },
      error404: ERROR_TYPES.brands.livingSocial[404],
    },
    fonts: {
      base: BASE_FONTS,
      theme: 'Nunito',
    },
    text: {
      transform: CASE_TYPES.lowerCase,
      cta: {
        button: CASE_TYPES.lowerCase,
      },
      navigation: {
        transform: CASE_TYPES.lowerCase,
        size: 16,
      },
      logintitle: {
        transform: CASE_TYPES.lowerCase,
      },
      cardbutton: {
        fontsize: `3vw`,
        lineheight: `3vw`,
      },
      lightbox: CASE_TYPES.lowerCase,
      error404: CASE_TYPES.lowerCase,
      error404placeholder: 'inherit',
      search: CASE_TYPES.lowerCase,
    },

    switches: {
      showFlags: true,
      showCareersImageLink: false,
      navvisibilitycount: {
        xl: 10,
        lg: 7,
        md: 5,
      },
    },
  },
  vip: {
    label: 'Vip',
    breakpoints: {
      xs: '450px',
      smDown: '575.98px',
      smUp: '576px',
      mdDown: '767.98px',
      mdUp: '768px',
      lgDown: '991.98px',
      lgUp: '992px',
      xlDown: '1199.98px',
      xlUp: '1200px',
    },
    bootstrap: {
      modalbackdropclassname: 'modal-backdrop-vip',
    },
    boxshadow: `${COMMON_COLORS.dropshadow} 0 3px 6px`,
    commoncolors: COMMON_COLORS,
    colors: {
      primary: '#ffffff',
      primaryonwhite: '#111111',
      textonprimary: '#000000',
      primarypale: '#999999',
      primarydark: '#888888',
      secondary: '#00EBD9',
      textonsecondary: '#ffffff',
      headingtext: '#ffffff',
      bodytext: COMMON_COLORS.greycharcoal,
      dropshadow: COMMON_COLORS.dropshadow,
      background: '#000000',
      checkoutmodulebg: COMMON_COLORS.white,
      checkoutlinkhover: COMMON_COLORS.linkhover,
      linkhover: COMMON_COLORS.linkhover,
      basketcount: COMMON_COLORS.basketcount,
      imagelink: '#eb008c',
      footerbackground: COMMON_COLORS.jet,
      footerlegaltext: COMMON_COLORS.white,
      footerlink: COMMON_COLORS.white,
      headerbackground: '#000000',
      headergiftfinderbackground: '#ffffff',
      headergiftfindertext: '#111111',
      headerlocationtext: '#666666',
      headerlocationbackgroundactive: '#111111',
      headerlocationtextactive: '#ffffff',
      mobilemenubg: COMMON_COLORS.white,
      navmorebackground: '#222222',
      navbackground: '#111111',
      navlink: '#888888',
      navlinkactive: '#bfbfbf',
      navborder: '#111111',
      navmoreheader: '#999999',
      searchbg: '#000000',
      searchbgfocused: '#000000',
      searchbuttonbg: 'transparent',
      searchbuttonbgfocused: '#ffffff',
      searchborderfocused: '#ffffff',
      searchbuttonfocused: '#000000',
      searchplaceholder: '#aaaaaa',
      linealgradient1: '#544aa1',
      linealgradient2: '#544aa1',
      borderbottom: '#3a3370',
      buttonprimary: COMMON_COLORS.buttonprimary,
      buttonprimaryhover: COMMON_COLORS.buttonprimaryhover,
      buttontext: COMMON_COLORS.white,
      buttonsecondary: COMMON_COLORS.buttonsecondary,
      buttonsecondaryhover: COMMON_COLORS.buttonsecondaryhover,
      buttontertiary: COMMON_COLORS.buttontertiary,
      buttontertiaryhover: COMMON_COLORS.buttontertiaryhover,
      countdownnumbers: COMMON_COLORS.countdownnumbers,
      tilebordercolor: '#ffffff',
      bgvalidcolor: COMMON_COLORS.bgvalidcolor,
      inputdefaultborder: COMMON_COLORS.inputdefaultborder,
      inputiconcolor: COMMON_COLORS.inputiconcolor,
      inputvalidcolor: COMMON_COLORS.inputvalidcolor,
      inputinvalidcolor: COMMON_COLORS.inputinvalidcolor,
      inputfocuscolor: COMMON_COLORS.inputfocuscolor,
      inputlogincolor: COMMON_COLORS.inputlogincolor,
      subscribebutton: '#eb008c',
      didomibackgroundcolor: COMMON_COLORS.jet,
      bidomicolor: COMMON_COLORS.white,
      checkoutloginlink: '#eb008c',
      checkoutloginlinkactive: '#ab004c',
      minimenu: '#2792bc',
      breadcrumb: COMMON_COLORS.greyshade,
      emptydeal: COMMON_COLORS.greylighter,
      dealbackgroundcolor: COMMON_COLORS.white,
      dealavailability: '#E21B85',
      dealviewbutton: '#0000EB',
      dealtext: COMMON_COLORS.greycharcoal,
      dealmobiletitle: COMMON_COLORS.white,
      dealboughtcounttext: '#111111',
      emptysearbackground: COMMON_COLORS.white,
      emptysearchmessage: '#666666',
      arrowcolor: '#000000',
      arrowbackground: COMMON_COLORS.white,
      dealvideoicon: COMMON_COLORS.white,
      infoboxbg: COMMON_COLORS.infoboxbg,
      infoboxborder: COMMON_COLORS.infoboxborder,
      filtermodal: COMMON_COLORS.white,
      filterslider: COMMON_COLORS.greyxlighter,
      infoboxtext: COMMON_COLORS.infoboxtext,
      successboxbg: COMMON_COLORS.bgvalidcolor,
      successboxborder: COMMON_COLORS.inputvalidcolor,
      successboxtext: COMMON_COLORS.validtext,
      errorboxbg: COMMON_COLORS.invalidbg,
      errorboxborder: COMMON_COLORS.inputinvalidcolor,
      errorboxtext: COMMON_COLORS.invalidtext,
      paymentbuttonbg: COMMON_COLORS.greyxlighter,
      lightboxbuttoncolor: COMMON_COLORS.black,
      lightboxbuttonbackground: COMMON_COLORS.white,
      lightboxbuttonborderbottom: 'none',
      lightboxsubmitbuttonbackground:
        'linear-gradient(180deg,#544aa1 0,#544aa1)',
      lightboxsubmitbuttonborder: '1px solid #ffffff',
      lightboxcontainerborder: '1px solid rgba(0, 0, 0, 0.2)',
      lightboxcontainerboxshadow: '0 3px 9px rgba(0, 0, 0, 0.5)',
      lightboxlegaltextcolor: '#65bcdf',
      lightboxlegaltextcolor768: '#333333',
      lightboxgreenborders: '#6bba70',
      lightboxredborders: '#ffffff',
      lightboxgrayborders: '#c7c7c7',
      ihealthtext: COMMON_COLORS.greyshade,
      notificationblue: '#2c90e9',
      notificationbluelight: '#eaf4fd',
      notificationbluedark: '#4a90e2',
      charcoal: 'rgba(51, 51, 51, 1)',
      white: 'rgba(255, 255, 255, 1)',

      socialcuecolor: {
        assure: COMMON_COLORS.assure,
        assurelighter: COMMON_COLORS.assurelighter,
        alert: COMMON_COLORS.alert,
        primary: '#eb008c',
        textonprimary: '#ffffff',
      },
    },
    images: {
      headerlogo: 'https://resources.wowcher.co.uk/images/vip-wowcher-logo.svg',
      headerlogomdwidth: '88px',
      headerlogolgwidth: '92px',
      bgcolorwash: 'https://resources.wowcher.co.uk/images/vip-colourwash.jpg',
      flags: {
        headerflaguk: FLAGS.unitedKingdom,
        headerflagie: FLAGS.ireland,
      },
      dealsplat: 'https://resources.wowcher.co.uk/images/splat.svg',
      lightbox: {
        popeye: LIGHT_BOX_MODAL.brands.vip.background.popeye,
        subscribe: LIGHT_BOX_MODAL.brands.vip.background.subscribe,
      },
      error404: ERROR_TYPES.brands.vip[404],
    },
    fonts: {
      base: BASE_FONTS,
      theme: '',
    },
    text: {
      transform: CASE_TYPES.capitalize,
      cta: {
        button: CASE_TYPES.upperCase,
      },
      navigation: {
        transform: CASE_TYPES.upperCase,
        size: 13,
      },
      logintitle: {
        transform: 'none',
      },
      cardbutton: {
        fontsize: `2.5vw`,
        lineheight: `2.5vw`,
      },
      lightbox: CASE_TYPES.upperCase,
      error404: CASE_TYPES.upperCase,
      error404placeholder: 'inherit',
      search: 'inherit',
    },
    switches: {
      showFlags: false,
      showCareersImageLink: true,
      navvisibilitycount: {
        xl: 10,
        lg: 7,
        md: 5,
      },
    },
  },
};

export default themes;
