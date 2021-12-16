import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Pasien',
    to: '/pasien',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Status Obat Pasien',
    to: '/status-pasien',
    icon: <CIcon name="cil-bell" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Berita',
    to: '/berita',
    icon: <CIcon name="cil-share-all" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Artikel',
    to: '/artikel',
    icon: <CIcon name="cil-tags" customClasses="c-sidebar-nav-icon"/>,
  },
 
]

export default _nav
