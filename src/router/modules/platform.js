export default [
    {
        name: 'Platform',
        path: '/platform',
        sort: 0,
        meta: {title: '平台'},
        component: () => import('@/views/BaseLayout.vue'),
        children: [
            {
                path: 'client',
                meta: {title: '终端设置'},
                component: () => import('@/views/SideLayout.vue'),
                children: [
                    {
                        path: 'index',
                        name: 'ClientIndex',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '首页配置', requireAuth: true}
                    },
                    {
                        path: 'special',
                        name: 'ClientSpecial',
                        redirect: '/platform/client/special/index',
                        component: () => import('@/views/BaseLayout.vue'),
                        meta: {title: '单页管理', requireAuth: true},
                        children: [
                            {
                                path: 'index',
                                name: 'SpecialIndex',
                                component: () => import('@/views/platform/client/special.vue'),
                                meta: {title: '单页列表', requireAuth: true}
                            },
                            {
                                path: 'designer',
                                name: 'SpecialDesigner',
                                component: () => import('@/views/platform/client/designer.vue'),
                                meta: {title: '单页设计器', requireAuth: true}
                            }
                        ]
                    },
                    {
                        path: 'popup',
                        name: 'ClientPopup',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '压屏广告', requireAuth: true}
                    },
                    {
                        path: 'splash',
                        name: 'ClientSplash',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '启动图片', requireAuth: true}
                    },
                    {
                        path: 'guide',
                        name: 'ClientGuide',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '引导图片', requireAuth: true}
                    },
                    {
                        path: 'news',
                        name: 'ClientNews',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '优途头条', requireAuth: true}
                    },
                    {
                        path: 'aboutus',
                        name: 'ClientAboutus',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '关于优途', requireAuth: true}
                    },
                    {
                        path: 'agreement',
                        name: 'ClientAgreement',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '注册协议', requireAuth: true}
                    },
                    {
                        path: 'feedback',
                        name: 'ClientFeedback',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '意见反馈', requireAuth: true}
                    }
                ]
            },
            {
                path: 'merchant',
                meta: {title: '平台商户'},
                component: () => import('@/views/SideLayout.vue'),
                children: [
                    {
                        path: 'online',
                        name: 'MerchantOnline',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '线上商户', requireAuth: true}
                    },
                    {
                        path: 'accessor',
                        name: 'MerchantAccessor',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '接入商户', requireAuth: true}
                    },
                    {
                        path: 'provider',
                        name: 'MerchantProvider',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '供应商户', requireAuth: true}
                    },
                    {
                        path: 'authorize',
                        name: 'MerchantAuthorize',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '商户授权', requireAuth: true}
                    },
                ]
            },
            {
                path: 'component',
                meta: {title: '系统工具'},
                component: () => import('@/views/SideLayout.vue'),
                children: [
                    {
                        path: 'message',
                        name: 'ComponentPush',
                        component: () => import('@/views/platform/client/message.vue'),
                        meta: {title: '消息推送', requireAuth: true}
                    },
                    {
                        path: 'coupon',
                        name: 'ComponentCoupon',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '卡券发放', requireAuth: true}
                    },
                    {
                        path: 'upgrade',
                        name: 'ComponentUpgrade',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '应用更新', requireAuth: true}
                    },
                ]
            },
            {
                path: 'config',
                meta: {title: '系统设置'},
                component: () => import('@/views/SideLayout.vue'),
                children: [
                    {
                        path: 'proxy',
                        name: 'ClientProxy',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '通信代理', requireAuth: true}
                    },
                    {
                        path: 'sms',
                        name: 'ClientSms',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '短信通道', requireAuth: true}
                    },
                    {
                        path: 'oss',
                        name: 'ClientOss',
                        component: () => import('@/views/platform/client/Index.vue'),
                        meta: {title: '对象存储', requireAuth: true}
                    },
                ]
            }
        ]
    }
]