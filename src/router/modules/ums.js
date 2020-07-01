/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const umsRouter = {

  path: '/ums',
  component: Layout,
  redirect: '/ums/admin',
  name: 'ums',
  meta: {
    title: '系统设置',
    icon: 'example',

  },
  children: [{
      path: 'admin',
      name: 'admin',
      component: () => import('@/views/system/users'),
      meta: {
        title: '用户列表',
        icon: 'table',
      }
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/system/role'),
      meta: {
        title: '角色列表',
        icon: 'tree'
      }
    },
    {
      path: 'menu',
      name: 'menu',
      component: () => import('@/views/system/menu'),
      meta: {
        title: '菜单列表',
        icon: 'tree'
      }
    },
    {
      path: 'addMenu',
      name: 'addMenu',
      component: () => import('@/views/system/menu/add'),
      meta: {title: '添加菜单'},
      hidden: true
    },
    {
      path: 'updateMenu',
      name: 'updateMenu',
      component: () => import('@/views/system/menu/update'),
      meta: {title: '修改菜单'},
      hidden: true
    },
    {
      path: 'resource',
      name: 'resource',
      component: () => import('@/views/system/resource'),
      meta: {
        title: '资源列表',
        icon: 'tree'
      }
    },
    {
      path: 'resourceCategory',
      name: 'resourceCategory',
      component: () => import('@/views/system/resource/categoryList'),
      meta: {title: '资源分类'},
      hidden: true
    },
    {
      path: 'allocMenu',
      name: 'allocMenu',
      component: () => import('@/views/system/role/allocMenu'),
      meta: {title: '分配菜单'},
      hidden: true
    },
    {
      path: 'allocResource',
      name: 'allocResource',
      component: () => import('@/views/system/role/allocResource'),
      meta: {title: '分配资源'},
      hidden: true
    },
    {
      path: 'help',
      component: Layout,
      children: [{
        path: 'https://www.baidu.com/',
        hidden: true,
        meta: {
          title: '帮助',
          icon: 'link'
        }
      }]
    }

  ]


}

export default umsRouter
