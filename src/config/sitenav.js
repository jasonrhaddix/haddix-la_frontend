import i18next from 'i18next'

const sitenav = [
	{
		label: i18next.t('common:SITE_NAV.ROUTES.PROJECTS'),
		routeName: 'projects',
		needsAuth: false,
		children: []
	},
	{
		label: i18next.t('common:SITE_NAV.ROUTES.WORKFLOWS'),
		routeName: 'workflows',
		needsAuth: false,
		children: []
	},
	{
		label: i18next.t('common:SITE_NAV.ROUTES.ROLES'),
		routeName: 'roles',
		needsAuth: true,
		children: []
	},
	{
		label: i18next.t('common:SITE_NAV.ROUTES.ABOUT'),
		routeName: 'about',
		needsAuth: false,
		children: []
	},
	{
		label: i18next.t('common:SITE_NAV.ROUTES.CONTACT'),
		routeName: 'contact',
		needsAuth: false,
		children: []
	},
	{
		label: i18next.t('common:SITE_NAV.ROUTES.LABS'),
		routeName: 'labs',
		needsAuth: false,
		children: []
	}
]

export default sitenav
