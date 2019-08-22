export default [
    {
        name: 'Fuel',
        path: '/fuel',
        sort: 2,
        meta: {title: '加油'},
        component: () => import('@/views/BaseLayout.vue'),
        children: [
            {
                path: 'report',
                meta: {title: '统计报表'},
                component: () => import('@/views/SideLayout.vue'),
                children: [
                    {
                        path: '/',
                        name: 'Home',
                        component: () => import('@/views/fuel/report/index.vue'),
                        redirect: 'province',
                        meta: {title: '省级报表', requireAuth: true},
                        children: [
                        {
                            path: 'province',
                            name: 'ReportProvince',
                            component: () => import('@/views/fuel/report/province.vue'),
                            meta: {title: '省级报表', requireAuth: true}
                        },
                        {
                            path: 'company/:id',
                            name: 'ReportCompanty',
                            component: () => import('@/views/fuel/report/company.vue'),
                            meta: {title: '公司报表', requireAuth: true}
                        },
                        {
                            path: 'station/:id',
                            name: 'ReportStation',
                            component: () => import('@/views/fuel/report/station.vue'),
                            meta: {title: '站级报表', requireAuth: true}
                        },
                        ]
                    },
                ]
            },{
                path: 'payment',
                meta: {title: '支付统计'},
                component: () => import('@/views/SideLayout.vue'),
                children: [
                    {
                        path: '/',
                        name: 'Index',
                        component: () => import('@/views/fuel/report/index.vue'),
                        redirect: 'payprovince',
                        meta: {title: '支付统计', requireAuth: true},
                        children: [
                            {
                                path: 'payprovince',
                                name: 'PaymentProvince',
                                component: () => import('@/views/fuel/payment/province.vue'),
                                meta: {title: '省级报表', requireAuth: true}
                            },
                            {
                                path: 'paycompany/:id',
                                name: 'PaymentCompanty',
                                component: () => import('@/views/fuel/payment/company.vue'),
                                meta: {title: '公司报表', requireAuth: true}
                            },
                            {
                                path: 'paystation/:id',
                                name: 'PaymentStation',
                                component: () => import('@/views/fuel/payment/station.vue'),
                                meta: {title: '站级报表', requireAuth: true}
                            },
                        ]
                    }
                ]
            }]
    }

]
