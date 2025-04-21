import stores from '@/stores'

// PROJECT BASE ----------------------------------------
const roleBase = (data) => {
  const propsStore = stores.config.propsStore()

  return {
    _id: data._id,
    dateCreated: data.dateCreated,
    roleId: data.roleId,
    role: data.role,
    company: propsStore.getPropertyByKey('roleCompanies', data.company, 'value', 'title'),    
    role: data.role,
    organization: data.organization,
    year: data.year,
    published: data.published,
  }
}

// PROJECT DETAILS ------------------------------------
const roleDetails = (data) => {
  return {
    ...roleBase(data),
    description: data.description,
    recruiter: data.recruiter,
    projects: data.projects
  }
}

export default {
  roleBase,
  roleDetails
}
