import { checkStatusProductionServ } from "@/helpers/services/checkProduction";

// untuk perkondisian fitur yang siap di production
const production = checkStatusProductionServ();

export const listMenuDI = [
  {
    title: 'Produksi',
    icon: 'bx bxs-cog',
    menu: [
      { href: '/datainsight/produksi-ikan-total', label: 'Produksi Perikanan Total' },
      { href: '/datainsight/produksi-ikan-tangkap', label: 'Produksi Perikanan Tangkap' },
      { href: '/datainsight/produksi-ikan-budidaya', label: 'Produksi Budi Daya Pembesaran' },
      { href: '/datainsight/produksi-ikan-pembenihan', label: 'Produksi Budi Daya Pembenihan' },
      { href: '/datainsight/produksi-ikan-hias', label: 'Produksi Budi Daya Ikan Hias' },
      { href: '/datainsight/produksi-garam', label: 'Produksi Garam' }
    ]
  },
  {
    title: 'Produk Olahan',
    icon: 'bx bx-restaurant',
    menu: [{ href: '/datainsight/produk-olahan', label: 'Produk Olahan' }]
  },
  {
    title: 'Kapal',
    icon: 'bx bxs-ship',
    menu: [
      { href: '/datainsight/data-kapal', label: 'Data Kapal' }
      // { href: '/datainsight/pelabuhan', label: 'Data Pelabuhan' },
    ]
  },
  {
    title: 'Kusuka',
    icon: 'bx bxs-user-voice',
    menu: [
      { href: '/datainsight/kusuka', label: 'Pelaku Usaha' },
      { href: '/datainsight/rekapitulasi', label: 'Rekapitulasi' },
      { href: '/datainsight/profil-kusuka/layer1', label: 'Profil Kusuka' },
      { href: '/datainsight/oss-kusuka', label: 'OSS Sektor KP' },
      { href: '/datainsight/pemadanan-kusuka/bpjs-ks', label: 'Pemadanan Kusuka' },
    ]
  },
  {
    title: 'Satu Peta',
    icon: 'bx bx-world',
    menu: [{ href: '/datainsight/ketersediaan-data', label: 'Ketersediaan Data' }]
  }
];
export const listMenuPortals = [
  {
    title: 'Tentang Satu Data',
    icon: 'bx bxs-cog',
    menu: [
      { href: '/portals/ttg-satudata/sejarah', label: 'Sejarah' },
      { href: '/portals/ttg-satudata/regulasi', label: 'Regulasi' }
    ]
  },
  {
    title: 'Standar Data',
    icon: 'bx bx-data',
    menu: [
      { href: '/portals/standar-data/sdstatistik', label: 'Standar Data Statistik' },
      { href: '/portals/standar-data/sdspasial', label: 'Standar Data Spasial' },
      { href: '/portals/standar-data/kuesioner', label: 'Kuesioner Satu Data' },
      { href: '/portals/standar-data/pedoman', label: 'Pedoman dan Prosedur' },
      { href: '/portals/standar-data/datainduk', label: 'Data Induk' }
    ]
  },
  {
    title: 'Metadata',
    icon: 'bx bx-building',
    menu: [
      { href: '/portals/metadata/meta-statis', label: 'Metadata Statistik' },
      { href: '/portals/metadata/meta-spasial', label: 'Metadata Spasial' }
    ]
  },
  {
    title: 'Publikasi',
    icon: 'bx bx-world',
    menu: [
      { href: '/portals/publikasi/daftar-publikasi', label: 'Daftar Publikasi' },
      { href: '/portals/publikasi/jadwal-publikasi', label: 'Jadwal Publikasi' },
      { href: '/portals/publikasi/data-prioritas', label: 'Data Prioritas' },
      { href: '/portals/publikasi/rilis', label: 'Rilis Data IKU Triwulanan' },
      { href: '/portals/data-statistik/layer1', label: 'Data dan Statistik' },
      { href: '/portals/publikasi/kpda', label: 'KPDA dan Analisis IKU' },
      !production && { href: '/portals/publikasi/infografis/ekspor-impor-kp', label: 'Infografis' }
    ].filter(Boolean)
  },
  {
    title: 'Satu Peta',
    icon: 'bx bx-map-alt',
    menu: [
      { href: '/login-publik', label: 'Download Data' },
      { href: '/satupeta/produksi-data', label: 'Produksi Data' }
    ]
  },
  {
    title: 'Layanan',
    icon: 'bx bxs-user-voice',
    menu: [
      { href: '/portals/layanan/help-desk', label: 'Help Desk Satu Data' },
      { href: '/portals/layanan/meka/data-statistik', label: 'Pelayanan Data Statistik dan Geospasial' },
      { href: '/portals/layanan/faq', label: 'FAQ' },
      { href: '/portals/layanan/web-api/home', label: 'Web API' }
    ]
  }
];
