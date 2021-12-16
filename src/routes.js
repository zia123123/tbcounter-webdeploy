import React from 'react';

const Pasien = React.lazy(() => import('./views/Pasien/Pasien'));
const StatusPasien = React.lazy(() => import('./views/StatusPasien/StatusPasien'));
const Berita = React.lazy(() => import('./views/berita/Berita'));
const Artikel = React.lazy(() => import('./views/artikel/Artikel'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/pasien', name: 'Pasien', component: Pasien },
  { path: '/status-pasien', name: 'Status Pasien', component: StatusPasien },
  { path: '/berita', name: 'Status Pasien', component: Berita },
  { path: '/artikel', name: 'Status Pasien', component: Artikel },

];

export default routes;
