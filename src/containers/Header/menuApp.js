export const adminMenu = [
    {
        //hệ thống
        name: 'menu.admin.manage-user',
        menus: [
            { name: 'menu.admin.crud', link: '/system/user-manage' },
            { name: 'menu.admin.crud-redux', link: '/system/user-redux' },
            {
                name: 'menu.admin.manager-doctor',
                link: '/system/user-doctor',
                // subMenus: [
                //     {
                //         name: 'menu.system.system-administrator.user-manage',
                //         link: '/system/user-manage',
                //     },
                //     {
                //         name: 'menu.system.system-administrator.user-redux',
                //         link: '/system/user-redux',
                //     },
                // ],
            },
            { name: 'menu.admin.manager-admin', link: '/system/user-admin' },
        ],
    },

    {
        // QL Phong Kham
        name: 'menu.admin.clinic',
        menus: [
            { name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' },
        ],
    },
    {
        // QL CHUYEN KHOA
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty',
                link: '/system/manage-specialty',
            },
        ],
    },
];
