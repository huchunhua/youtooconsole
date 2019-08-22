export default [
    {
        name: 'Mall',
        path: '/mall',
        sort: 1,
        meta: {title: '商城'},
        component: () => import('@/views/BaseLayout.vue'),
        children: []
    }
]
