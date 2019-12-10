const navList = [
    {
        label: '页面1',
        id: '1',
        url: '/page1',
        render: () => import('../containers/page1/page'),
        iconType: 'user',
        children: []
    },
    {
        label: '页面2',
        id: '2',
        url: '/page2',
        render: () => import('../containers/page2/page'),
        iconType: 'user',
        children: []
    },
    {
        label: '页面3',
        id: '3',
        render: '',
        iconType: 'user',
        children: [
                {
                    label: '页面3-1',
                    id: '3-1',
                    url: '/page3',
                    render: () => import('../containers/page3/page'),
                    iconType: 'user',
                    children: []
                },
                {
                    label: '页面3-2',
                    id: '3-2',
                    url: '/page4',
                    render: () => import('../containers/page4/page'),
                    iconType: 'user',
                    children: []
                },
                {
                    label: '页面3-3',
                    id: '3-3',
                    render: '',
                    children: [
                        {
                            label: '页面3-3-1',
                            id: '3-3-1',
                            url: '/page5',
                            render: () => import('../containers/page5/page'),
                            iconType: 'user',
                            children: []
                        },
                    ]
                },
        ]
    },
]
export default navList