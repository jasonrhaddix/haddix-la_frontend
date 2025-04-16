import stores from '@/stores'

// PROJECT BASE ----------------------------------------
const roleBase = (data) => {
  const propsStore = stores.config.propsStore()

  return {
    _id: data._id,
    dateCreated: data.dateCreated,
    roleId: data.roleId,
    jobTitle: data.jobTitle,
    company: propsStore.getPropertyByKey('roleCompanies', data.company, 'value', 'title'),    
    role: data.role,
    recruiter: data.recruiter,
    published: data.published
  }
}

// PROJECT DETAILS ------------------------------------
const roleDetails = (data) => {
  return {
    ...roleBase(data),
    description: data.description,
    organization: data.organization,
    projects: data.projects
  }
}

export default {
  roleBase,
  roleDetails
}
