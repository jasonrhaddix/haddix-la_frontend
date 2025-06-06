import i18next from 'i18next'

const sitenav = [
	{
		// i8next.t('common:SITE_NAV.ROUTES.PROJECTS')
		label: 'Projects',
		routeName: 'projects',
		needsAuth: false,
		children: []
	},
	{
		// i8next.t('common:SITE_NAV.ROUTES.WORKFLOWS')
		label: 'Workflows',
		routeName: 'workflows',
		needsAuth: false,
		children: []
	},
	{
		// i8next.t('common:SITE_NAV.ROUTES.ROLES')
		label: 'Roles',
		routeName: 'roles',
		needsAuth: true,
		children: []
	},
	{
		// i8next.t('common:SITE_NAV.ROUTES.ABOUT')
		label: 'About',
		routeName: 'about',
		needsAuth: false,
		children: []
	},
	{
		// i8next.t('common:SITE_NAV.ROUTES.CONTACT')
		label: 'Contact',
		routeName: 'contact',
		needsAuth: false,
		children: []
	},
	{	
		// i8next.t('common:SITE_NAV.ROUTES.LABS')
		label: 'Labs',
		routeName: 'labs',
		needsAuth: false,
		children: []
	}
]

export default sitenav
