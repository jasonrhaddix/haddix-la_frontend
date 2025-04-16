import { defineStore } from 'pinia'

export default defineStore('props', {
  state: () => ({
    projectTypes: [
      { title: 'Collaberation', value: 'collaberation' },
      { title: 'Experiment', value: 'experiment' },
      { title: 'Personal', value: 'personal' },
      { title: 'New Role', value: 'new_role' },
      { title: 'Work', value: 'work' }
      // { title: '', value: '' },
    ],

    projectRoles: [
      { title: 'Creative Director', value: 'creative_director' },
      { title: 'Designer', value: 'designer' },
      { title: 'Developer', value: 'developer' },
      { title: 'Front-end Engineer', value: 'front_end_engineer' },
      { title: 'Lead Developer', value: 'lead_developer' },
      { title: 'Lead Front-end Engineer', value: 'lead_front_end_engineer' },
      { title: 'Support Engineer', value: 'support_engineer' },
      { title: 'Technical Consultant', value: 'technical_consultant' }
    ],

    projectClients: [
      { title: 'Amazon', value: 'amazon' },
      { title: 'Best Buy', value: 'best_buy' },
      { title: 'Blowfish Shoes', value: 'blowfish_shoes' },
      { title: 'Chevron', value: 'chevron' },
      { title: 'City of New York', value: 'new_york' },
      { title: 'Cirque Du Solel', value: 'cirque_du_solel' },
      { title: 'DirecTv', value: 'directv' },
      { title: 'Disney Channel', value: 'disney_channel' },
      { title: 'ESPN', value: 'espn' },
      { title: 'FX', value: 'fx' },
      { title: 'The Gary Group', value: 'gary_group' },
      { title: 'HBO', value: 'hbo' },
      { title: 'iTunes', value: 'itunes' },
      { title: 'MGM Grand', value: 'mgm_grand' },
      { title: 'Nexon', value: 'nexon' },
      { title: 'Nike', value: 'nike' },
      { title: 'Oasis', value: 'oasis' },
      { title: 'Propel', value: 'propel' },
      { title: 'Satchi & Satchi', value: 'satchi_satchi' },
      { title: 'Showtime', value: 'showtime' },
      { title: 'Skechers', value: 'skechers' },
      { title: 'Top Rank', value: 'top_rank' },
      { title: 'Universal Orlando', value: 'universal_orlando' },
      { title: 'Universal Pictures', value: 'universal_pictures' },
      { title: 'Universal Studios', value: 'universal_studios' }
    ],

    roleCompanies: [
      { title: 'Amazon', value: 'amazon' },
      { title: 'Apple', value: 'apple' },
      { title: 'Facebook', value: 'facebook' },
      { title: 'Google', value: 'google' },
      { title: 'Hulu', value: 'hulu' },
      { title: 'Microsoft', value: 'microsoft' },
      { title: 'Netflix', value: 'netflix' },
      { title: 'PlayStation', value: 'playstation' },
      { title: 'Snap', value: 'snap' },
      { title: 'Sony', value: 'sony' },
      { title: 'TikTok', value: 'tiktok' },
      { title: 'Tinder', value: 'tinder' },
      { title: 'Twitch', value: 'twitch' }
    ],

    projectLanguages: [
      { title: 'ActionScript', value: 'actionscript' },
      { title: 'C/C++', value: 'c_c_plusplus' },
      { title: 'CSS', value: 'css' },
      { title: 'HTML', value: 'html' },
      { title: 'Javascript', value: 'javascript' },
      { title: 'PHP', value: 'php' }
    ],

    projectYears: [
      '2007',
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
      '2021',
      '2022',
      '2023',
      '2024'
    ],

    projectResources: [
      { id: 1, title: 'Adobe After Effects CC', value: 'adobe_after_effects_cc' },
      { id: 2, title: 'Abode AIR', value: 'abode_air' },
      { id: 3, title: 'Adobe Animate CC', value: 'adobe_animate_cc' },
      { id: 4, title: 'Adobe Audition CC', value: 'adobe_audition_cc' },
      { id: 5, title: 'Adobe Illustrator CC', value: 'adobe_illustrator_cc' },
      { id: 6, title: 'Adobe InDesign CC', value: 'adobe_indesign_cc' },
      { id: 7, title: 'Adobe Photoshop CC', value: 'adobe_photoshop_cc' },
      { id: 8, title: 'Adobe Premiere CC', value: 'adobe_premiere_cc' },
      { id: 9, title: 'Akamai CMS', value: 'akamai_cms' },
      { id: 10, title: 'Angular', value: 'angular' },
      { id: 11, title: 'AWS - CodePipeline', value: 'aws_codepipeline' },
      { id: 12, title: 'AWS - Cognito', value: 'aws_cognito' },
      { id: 13, title: 'AWS - CloudFront', value: 'aws_cloudfront' },
      { id: 14, title: 'AWS - EC2 Instance', value: 'aws_ec2_instance' },
      { id: 15, title: 'AWS - Elastic Beanstalk', value: 'aws_elastic_beanstalk' },
      { id: 16, title: 'AWS - Lambda', value: 'aws_lambda' },
      { id: 17, title: 'AWS - SES', value: 'aws_ses' },
      { id: 18, title: 'Axios', value: 'axios' },
      { id: 19, title: 'Twitter Bootstrap', value: 'twitter_bootstrap' },
      { id: 20, title: 'Box 2D', value: 'box_2d' },
      { id: 21, title: 'CloudConvert', value: 'cloudconvert' },
      { id: 22, title: 'Compass', value: 'compass' },
      { id: 23, title: 'DoubleClick', value: 'doubleclick' },
      { id: 24, title: 'GCS - Maps API', value: 'gcs_maps_api' },
      { id: 25, title: 'Google Web Fonts', value: 'google_web_fonts' },
      { id: 26, title: 'Grunt', value: 'grunt' },
      { id: 27, title: 'Gulp', value: 'gulp' },
      { id: 28, title: 'Handlebars', value: 'handlebars' },
      { id: 29, title: 'Juicer', value: 'juicer' },
      { id: 30, title: 'JQuery', value: 'jquery' },
      { id: 31, title: 'Laravel', value: 'laravel' },
      { id: 32, title: 'Marionette-Backbone', value: 'marionette_backbone' },
      { id: 33, title: 'Mocha Motion Tracking', value: 'mocha_motion_tracking' },
      { id: 34, title: 'Modernizr', value: 'modernizr' },
      { id: 35, title: 'Mustash', value: 'mustash' },
      { id: 36, title: 'NodeJS', value: 'nodejs' },
      { id: 37, title: 'NPM', value: 'npm' },
      { id: 38, title: 'Papervision 3D', value: 'papervision_3d' },
      { id: 39, title: 'Particle Illusion', value: 'particle_illusion' },
      { id: 40, title: 'PDFjs', value: 'pdfjs' },
      { id: 41, title: 'PointRoll', value: 'pointroll' },
      { id: 42, title: 'Postman', value: 'postman' },
      { id: 43, title: 'Quill Editor', value: 'quill_editor' },
      { id: 44, title: 'ReactJS', value: 'reactjs' },
      { id: 45, title: 'REST API', value: 'rest_api' },
      { id: 46, title: 'SCSS/Sass', value: 'scss_sass' },
      { id: 47, title: 'Service Workers', value: 'service_workers' },
      { id: 48, title: 'Sizmek/MediaMind', value: 'sizmek_mediamind' },
      { id: 49, title: 'SocketJS', value: 'socketjs' },
      { id: 50, title: 'SquareSpace', value: 'squarespace' },
      { id: 51, title: 'Stripe', value: 'stripe' },
      { id: 52, title: 'ThreeJS', value: 'threejs' },
      { id: 53, title: 'Unity Engine', value: 'unity_engine' },
      { id: 54, title: 'Vue Material', value: 'vue_material' },
      { id: 55, title: 'Vuelvalueate', value: 'vuelvalueate' },
      { id: 56, title: 'VueJS', value: 'vuejs' },
      { id: 57, title: 'Vuetify', value: 'vuetify' },
      { id: 58, title: 'Vuex', value: 'vuex' },
      { id: 59, title: 'Webpack', value: 'webpack' },
      { id: 60, title: 'Wordpress', value: 'wordpress' },
      { id: 61, title: 'Yarn', value: 'yarn' }
    ],

    imageUsageTypes: [
      { title: 'Thumbnail', value: 'thumbnail' },
      { title: 'Main', value: 'main' }
    ]
  }),

  getters: {
    getPropertyItem: (state) => (whichList, val, sortKey) => {
      let idx = state[whichList].findIndex(x => x[sortKey] === val)
      return state[whichList][idx]
    },

    getPropertyByKey () {
      return (whichList, val, sortKey, returnKey) => {
        let item = this.getPropertyItem(whichList, val, sortKey, returnKey)
        return item ? item[returnKey] : null
      }
    }
  }
})
