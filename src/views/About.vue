<template>
  <div class="about-view">
    <div class="about-view--inner">
      <div class="about-view--content">
        <div class="about--header">
          <div class="header--photo-container">
            <div class="header--photo">
              <img :src="BioPhoto" />
            </div>
          </div>
          <div class="social-media--container">
            <div class="social-media--list">
              <a
                class="social-list"
                href="http://github.com/jasonrhaddix"
                target="_blank"
              >
                <FontAwesomeIcon :icon="faGithub" size="2x" />
              </a>

              <a
                class="social-list"
                href="https://codepen.io/Jasonrhaddix/"
                target="_blank"
              >
                <FontAwesomeIcon :icon="faCodepen" size="2x" />
              </a>

              <a
                class="social-list"
                href="https://medium.com/@jasonrhaddix"
                target="_blank"
              >
                <FontAwesomeIcon :icon="faMedium" size="2x" />
              </a>

              <a
                class="social-list"
                href="https://x.com/jasonrhaddix"
                target="_blank"
              >
                <FontAwesomeIcon :icon="faTwitter" size="2x" />
              </a>

              <a
                class="social-list"
                href="https://www.linkedin.com/in/jasonrhaddix/"
                target="_blank"
              >
                <FontAwesomeIcon :icon="faLinkedin" size="2x" />
              </a>
            </div>
          </div>
        </div>

        <div class="section-divider" />

        <div class="about-bio">
          <div class="about-bio--inner">
            <h2>{{ $t('views:ABOUT.GREETING_NAME', { name: 'Jason R. Haddix' }) }}</h2>
            <p>I'm a Senior Full-Stack Engineer with over {{yearsExperience}} years of professional experience building large, data-driven applications using cutting-edge technologies. I specialize in developing scalable web applications that balance performance, usability, and maintainability.</p>
            <p>My motivation lies in solving complex problems, delivering clean, effective solutions, and staying ahead of the tech curve. I thrive in environments where I can push boundaries, learn continuously, and build products that make an impact.</p>
            <p>I’m especially passionate about exploring new technologies and mentoring junior engineers — sharing knowledge, improving team dynamics, and shaping the next wave of builders in the industry.</p>
            <p>Outside of engineering, I have a deep appreciation for analog experiences — I collect and shoot vintage film cameras, explore California’s landscapes with my family (Yosemite being a recent highlight), and unwind with classic video games. I’m also a fan of classic Japanese cars — there’s something timeless about elegant design paired with precision mechanics.</p>
          </div>
        </div>

        <div class="section-divider" />

        <div class="section about--experience">
          <div class="section--title">
            <h2>Experience</h2>
          </div>

          <div class="subsection">
            <h3>The Branding Farm</h3>
            <div class="about-experience-role">
              <h4>Lead Front-end Engineer<span> | 2018 - PRESENT</span></h4>
            </div>
            <div class="about-experience-role">
              <h4>Contract Engineer<span> | 2009 - 2018</span></h4>
            </div>
            <p class="description">
              The Branding Farm primarily builds data-driven, client facing web
              applications for corporate entities.
            </p>
            <div class="about-section-experience-roles">
              <p>Roles Included:</p>
              <ul>
                <li>Font-end systems design for maintainability</li>
                <li>Supporting engineers through development sprints</li>
                <li>Updates to legacy applications</li>
              </ul>
            </div>
          </div>

          <div class="subsection">
            <h3>Dot Squirrels</h3>
            <div class="about-experience-role">
              <h4>Contract Developer<span> | 2016 - 2017</span></h4>
            </div>
            <p class="description">
              Dot Squirrels focuses mainly on retail and corporate websites with
              CMS integrations.
            </p>
            <div class="about-section-experience-roles">
              <p>Roles Included:</p>
              <ul>
                <li>Front-end development and CMS integration</li>
                <li>Project concepting for client pitches</li>
                <li>Guiding Junior developers</li>
              </ul>
            </div>
          </div>

          <div class="subsection">
            <h3>The Gary Group</h3>
            <div class="about-experience-role">
              <h4>Senior Developer<span> | 2012 - 2016</span></h4>
            </div>
            <div class="about-experience-role">
              <h4>Creative Developer<span> | 2008 - 2012</span></h4>
            </div>
            <p class="description">
              The Gary Group provides a range of services that include website
              development and digital advertising for a multitude of
              entertainment and retail clients.
            </p>
            <div class="about-section-experience-roles">
              <p>Roles Included:</p>
              <ul>
                <li>Overseeing development of products</li>
                <li>Working directly with management and creative to understand and execute the client's needs</li>
                <li>End-to-end management of stream events to digital products</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section-divider" />

        <div class="section about--skillset">
          <div class="section--title">
            <h2>Skillset</h2>
          </div>
          <div class="subsection">
            <h3>Key Skills</h3>
            <v-row class="about-items--list">
              <v-col class="col-12 col-md-6 item-group">
                <h4>Front-end:</h4>
                <ul>
                  <li><p>Systems Architecture for scalability</p></li>
                  <li><p>Code-splitting and optimization</p></li>
                  <li>
                    <p>Building Large-scale data-intensive web applications</p>
                  </li>
                  <li>
                    <p>Diverse experience with JavaScript/CSS/UI frameworks</p>
                  </li>
                  <li><p>Consuming/Testing RESTful APIs</p></li>
                  <li><p>Cross-browser compatibility</p></li>
                  <li><p>Debugging and troubleshooting</p></li>
                  <li><p>Understanding of UI/UX</p></li>
                  <li><p>Analytics</p></li>
                </ul>
              </v-col>

              <v-col class="col-12 col-md-6 item-group">
                <h4>Back-end:</h4>
                <ul>
                  <li><p>Working with Back-end technologies like SQL/NoSQL, Web Tokens, NodeJS, Express</p></li>
                  <li><p>Creating REST API end-points</p></li>
                  <li><p>AWS (EC2, S3, RDS, CodePipline, CodeBuild, API Gateway)</p></li>
                </ul>
              </v-col>

              <v-col class="col-12 col-md-6 item-group">
                <h4>General/Misc:</h4>
                <ul>
                  <li><p>VCS with Git/GitHub and BitBucket</p></li>
                  <li><p>Agile Methodology</p></li>
                  <li><p>Atlassian Suite (JIRA, BitBucket, Confluence)</p></li>
                  <li><p>CI/CD integration</p></li>
                  <li><p>Aptitude for learning new technologies</p></li>
                </ul>
              </v-col>
            </v-row>
          </div>

          <div class="subsection">
            <h3>Technical Skills</h3>
            <v-row class="about-items--list">
              <v-col class="col-12 col-md-6 item-group">
                <h4>Technical Proficiencies</h4>
                <ul>
                  <li><p>JavaScript • HTML / CSS</p></li>
                  <li><p>Vue + Pinia (and Vuex) • Sass/SCSS</p></li>
                  <li><p>Bootstrap • Handlebars • Vuetify</p></li>
                  <li><p>Webpack / Vite • Babel • Gulp / Grunt</p></li>
                  <li><p>Yarn / NPM • Electron</p></li>
                </ul>
              </v-col>

              <v-col class="col-12 col-md-6 item-group">
                <h4>Technical Experience</h4>
                <ul>
                  <li><p>React + Redux • Angular • NUXT</p></li>
                  <li><p>Foundation • Stylus • Grunt • ThreeJS</p></li>
                  <li><p>PHP • Laravel • Composer</p></li>
                  <li><p>C++ / C#</p></li>
                </ul>
              </v-col>
            </v-row>
          </div>

          <div class="subsection">
            <h3>Exploring Interests</h3>
            <v-row class="about-items--list">
              <v-col class="col-12 col-md-2 item-group">
                <ul>
                  <li><p>GraphQL</p></li>
                  <li><p>TensorflowJS</p></li>
                </ul>
              </v-col>
              <v-col class="col-12 col-md-2 item-group">
                <ul>
                  <li><p>Svelte</p></li>
                  <li><p>RUST for WebAssembly</p></li>
                </ul>
              </v-col>
              <v-col class="col-12 col-md-2 item-group">
                <ul>
                </ul>
              </v-col>
            </v-row>
          </div>
        </div>

        <div class="section-divider" />

        <div class="section about--about-site">
          <div class="about-site--inner">
            <div class="section--title">
              <h2>About this Site</h2>
            </div>
            <div class="subsection">
              <div class="content-group">
                <!-- <p>This site was built as both a portfolio and a playground—a place to showcase my projects and a space to experiment with modern web technologies. I created it to provide potential employers and collaborators with a hands-on look at my technical skills, thought process, and personal design style.</p>
                <p>The primary audience for this site includes hiring managers, recruiters, and teams looking for a senior web engineer with a strong command of full-stack JavaScript technologies. Everything on the site is here to demonstrate that I don't just keep up—I build with purpose.</p>

                <p>I built a full-stack portfolio management platform where I can organize my projects, roles, and all the supporting media like videos and thumbnails.</p>
                <p>The frontend is Vue 3 with Pinia, and the backend is Node.js and Express with MongoDB.</p>
                <p>I integrated AWS S3 and Cognito so users can upload files directly to cloud storage without overloading the server, and I automated the cleanup of assets when projects are deleted.</p>
                <p>One of the bigger challenges was building a smart deep-merge system — allowing updates without accidentally overwriting complex nested data structures.</p>
                <p>Overall, the project shows not just modern web development skills, but real attention to cloud architecture, security, and long-term maintenance.</p>
                <p>It’s basically a personal experience management platform, but built to production standards.</p> -->

                <p>This site was built as both a portfolio and a playground — a place to showcase my professional projects and a space to experiment with modern web technologies. I created it to give potential employers and collaborators a hands-on look at my technical skills, problem-solving approach, and personal design style.</p>

                <p>The primary audience includes hiring managers, recruiters, and engineering teams seeking a senior web engineer with strong full-stack JavaScript expertise. Everything here is designed to demonstrate that I don’t just keep pace with modern development — I build with purpose, scalability, and real-world durability in mind.</p>

                <p>Under the hood, the platform is a full-stack portfolio management system where I can dynamically organize projects, roles, and supporting media like videos, thumbnails, and carousel images. The frontend is built with Vue 3 and Pinia, emphasizing performance and modularity, while the backend runs on Node.js, Express, and MongoDB.</p>

                <p>For asset management, I integrated AWS S3 and Cognito, allowing users to upload files securely and directly to cloud storage, minimizing server load and speeding up content delivery. I also automated the cleanup of orphaned assets by tying S3 file deletion to backend lifecycle events, ensuring that storage stays clean and cost-efficient.</p>

                <p>One of the more interesting challenges was building a smart deep-merge system for handling project updates — carefully replacing fields like attachments while preserving other complex, nested structures without data loss.</p>

                <p>Ultimately, this project goes beyond building a simple portfolio. It reflects a real-world application of modern web engineering principles — cloud-native architecture, security-first development, and systems designed for long-term maintainability and growth.</p>
              </div>

              <div class="content-group">
                <h3>[ Structure & Features ]</h3>
                <p>The site is divided into several key sections:</p>
                <ul>
                  <li><strong>Projects:</strong> Real-world work and code samples.</li>
                  <li><strong>Roles:</strong> Career-focused experience entries tailored to tech hiring workflows.</li>
                  <li><strong>Labs:</strong> Prototypes, side projects, and experiments.</li>
                  <li><strong>Contact:</strong> A quick and simple way to get in touch.</li>
                </ul>
              </div>

              <div class="content-group">
                <h3>[ Tech Stack ]</h3>
                <p>I used the following technologies to build this app:</p>
                <ul>
                  <li><strong>Frontend:</strong> Vue 3, Vuetify, Pinia, SCSS</li>
                  <li><strong>Backend:</strong> Node.js, Express</li>
                  <li><strong>Database:</strong> MongoDB</li>
                  <li><strong>Storage:</strong> AWS S3 for asset handling</li>
                  <li><strong>Security:</strong> JSON Web Tokens (JWT), password hashing with BCrypt</li>
                  <li><strong>Other:</strong> Axios, TipTap - for rich text editing</li>
                </ul>
              </div>
              
              <div class="content-group">
                <p>I chose these tools because they reflect both what’s currently being used in modern production environments and areas where I wanted to continue growing—like mastering Vue 3’s Composition API and working more deeply with MongoDB.</p>
              </div>
              
              <div class="content-group">
                <h3>[ Development Style ]</h3>
                <p>As a senior developer, challenges are opportunities. Whether I’m debugging something myself or collaborating with AI, I always find a way to solve the problem and keep the experience smooth and scalable.</p>
              </div>
              
              <div class="content-group">
                <h3>[ What’s Next? ]</h3>
                <p>I’m currently planning to implement localization using i18next, so the site can support multiple languages. I also have a few features on the roadmap:</p>
                <ul>
                  <li> - An AI-powered project summarizer that can generate concise blurbs from longer project descriptions</li>
                  <li> - Support for video intros or demos attached to roles and projects</li>
                  <li> - A timeline view to visualize my career journey</li>
                </ul>

                <p>This site will continue to evolve, just like my work. Thanks for stopping by—if anything here resonates, feel free to reach out.</p>
              </div>

            </div>
          </div>
        </div>

        <div class="section-divider" />

        <v-container class="section about--client-list">
          <div class="section--title">
            <h2>Notable Clients</h2>
          </div>
          <v-row class="client-list">
            <v-col
              v-for="(logo, index) in logos"
              :key="index"
              cols="6"
              md="4"
              lg="3"
              class="client-item"
              align-self="center"
            >
              <div class="item">
                <img :src="logo.src" :alt="logo.alt" />
              </div>
            </v-col>
          </v-row>
        </v-container>

        <div class="section-divider" />

        <div class="section about--footer">
          <AppButton
            variant="colorful"
            label="Contact"
            @click.native="routingStore.pushRoute({ name: 'contact' })"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faGithub,
  faMedium,
  faTwitter,
  faCodepen,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'

import stores from '@/stores/index.js'

import AppButton from '@/components/_global/App_Button.vue'
import BioPhoto from '@/assets/app/images/profile-photo.png'

import LogoUniversal from '@/assets/app/icons/client_logos/universal.svg'
import LogoAmazon from '@/assets/app/icons/client_logos/amazon.svg'
import LogoMGM from '@/assets/app/icons/client_logos/mgm-grand.svg'
import LogoSkechers from '@/assets/app/icons/client_logos/skechers.svg'
import LogoNike from '@/assets/app/icons/client_logos/nike-swoosh.svg'
import LogoITunes from '@/assets/app/icons/client_logos/itunes.svg'
import LogoFX from '@/assets/app/icons/client_logos/fx.svg'
import LogoChevron from '@/assets/app/icons/client_logos/chevron.svg'
import LogoCricDuSoleil from '@/assets/app/icons/client_logos/cirq-du-soleil.svg'
import LogoDisney from '@/assets/app/icons/client_logos/disney.svg'
import LogoPropel from '@/assets/app/icons/client_logos/propel.svg'
import LogoShowtime from '@/assets/app/icons/client_logos/showtime.svg'
import LogoBestBuy from '@/assets/app/icons/client_logos/best-buy.svg'
import LogoCVS from '@/assets/app/icons/client_logos/cvs.svg'
import LogoDirecTV from '@/assets/app/icons/client_logos/directv.svg'
import LogoHBO from '@/assets/app/icons/client_logos/hbo.svg'
import LogoESPN from '@/assets/app/icons/client_logos/espn.svg'

const routingStore = stores.routingStore()

const logos = [
  { src: LogoUniversal, alt: 'Universal Studios' },
  { src: LogoAmazon, alt: 'Amazon' },
  { src: LogoMGM, alt: 'MGM Grand' },
  { src: LogoSkechers, alt: 'Skechers' },
  { src: LogoNike, alt: 'Nike' },
  { src: LogoITunes, alt: 'iTunes' },
  { src: LogoFX, alt: 'FX' },
  { src: LogoChevron, alt: 'Chevron' },
  { src: LogoCricDuSoleil, alt: 'Cric Du Soleil' },
  { src: LogoDisney, alt: 'Disney' },
  { src: LogoPropel, alt: 'Propel Fitness' },
  { src: LogoShowtime, alt: 'Showtime' },
  { src: LogoBestBuy, alt: 'Best Buy' },
  { src: LogoCVS, alt: 'CVS' },
  { src: LogoDirecTV, alt: 'DirecTV' },
  { src: LogoHBO, alt: 'HBO' },
  { src: LogoESPN, alt: 'ESPN' }
]

const yearsExperience = computed(() => {
  const startYear = 2007
  const currentYear = new Date().getFullYear()
  return currentYear - startYear
})

</script>
