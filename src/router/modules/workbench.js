import Layout from '@/layout'

const workbenchRouter = {
  path: '/workbench',
  component: Layout,
  redirect: 'workbench/phase',
  name: 'workbench',
  meta: {
    title: '工作平台',
    icon: 'component'
  },
  children: [
    {
      path: 'phase',
      component: () => import('@/views/workbench/phase'),
      name: 'phase',
      meta: { title: '三相信息' }
    },
    {
      path: 'roads',
      component: () => import('@/views/workbench/roads'),
      name: 'roads',
      meta: { title: '三路信息' }
    },
    {
      path: 'control',
      component: () => import('@/views/workbench/control'),
      name: 'control',
      meta: { title: '设备操作' }
    },
    {
      path: 'device',
      component: () => import('@/views/workbench/device'),
      name: 'device',
      meta: { title: '设备列表' }
    }
  ]
}

export default workbenchRouter
