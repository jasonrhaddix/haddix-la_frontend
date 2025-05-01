import stores from '@/stores'
import { sort } from 'store/storages/all'

// PROJECT BASE ----------------------------------------
const projectBase = (data) => {
  const propsStore = stores.config.propsStore()

  return {
    _id: data._id,
    sortOrder: data.sortOrder,
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
