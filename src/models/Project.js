import stores from '@/stores'

// PROJECT BASE ----------------------------------------
const projectBase = (data) => {
  const propsStore = stores.config.propsStore()

  return {
    _id: data._id,
    projectId: data.projectId,
    sessionId: data.sessionId,
    dateCreated: data.dateCreated,
    published: data.published,
    isGuestProject: data.isGuestProject,
    type: data.type,
    
    title: data.title,
    subtitle: data.subtitle,
    client: propsStore.getPropertyByKey('projectClients', data.client, 'value', 'title'),    
    attachments: data.attachments
  }
}

// PROJECT DETAILS ------------------------------------
const projectDetails = (data) => {
  const propsStore = stores.config.propsStore()

  return {
    ...projectBase(data),
    role: propsStore.getPropertyByKey('projectRoles', data.role, 'value', 'title'),
    projectYear: data.projectYear,
    excerpt: data.excerpt,
    description: data.description,
    link: data.link,
    resources: data.resources,
    languages: data.languages
  }
}

export default {
  projectBase,
  projectDetails
}


/* import stores from '@/stores'

export default class Project {
  constructor (data = {}) {
    const propsStore = stores.config.propsStore()

    const {
      projectId = null,
      sessionId = null,
      dateCreated = null,
      isGuestProject = true,
      type = null,
      title = null,
      subtitle = null,
      client = null,
      role = null,
      projectYear = null,
      excerpt = null,
      description = null,
      link = null,
      published = false,
      attachments = [],
      resources = []
    } = data

    this.projectId = projectId
    this.sessionId = sessionId
    this.dateCreated = dateCreated
    this.isGuestProject = isGuestProject
    this.type = type
    this.title = title
    this.subtitle = subtitle
    this.client = propsStore.getPropertyByKey('projectClients', client, 'value', 'title')
    this.role = propsStore.getPropertyByKey('projectRoles', role, 'value', 'title')
    this.projectYear = projectYear
    this.excerpt = excerpt
    this.description = description
    this.link = link
    this.published = published
    this.attachments = attachments
    this.resources = resources
  }
} */