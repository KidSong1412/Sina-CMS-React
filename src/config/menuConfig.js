const menuList = [
  {
    title: '首页',
    key: '/home',
    icon: 'icon-shouye',
    isPublic: true
  },
  {
    title: '商品',
    key: '/products',
    icon: 'icon-shangpin',
    children: [
      {
        title: '品类管理',
        key: '/products/category',
        icon: 'icon-pinleiguanli_icox'
      },
      {
        title: '商品管理',
        key: '/products/product',
        icon: 'icon-shangpinguanli'
      }
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: 'icon-yonghuguanli'
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'icon-jiaoseguanli'
  },
  {
    title: '图形图表',
    key: '/charts',
    icon: 'icon-tuxingtuxiangchuli',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'icon-zhuxingtu'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'icon-tubiao-zhexiantu'
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'icon-bingtu'
      }
    ]
  },
  {
    title: '订单管理',
    key: '/order',
    icon: 'icon-dingdanguanli-'
  }
]

export default menuList