import image1 from "../assets/icons/Layanan/1.png";
import image2 from "../assets/icons/Layanan/2.png";
import image3 from "../assets/icons/Layanan/3.png";
// import image4 from '../assets/icons/Layanan/4.png'; // Pendirian CV
// import image5 from '../assets/icons/Layanan/5.png'; // Firma
import image6 from "../assets/icons/Layanan/6.png";
// import image7 from '../assets/icons/Layanan/7.png'; //Yayasan
import image8 from "../assets/icons/Layanan/8.png";
import image9 from "../assets/icons/Layanan/9.png";
import image10 from "../assets/icons/Layanan/10.png";
import image11 from "../assets/icons/Layanan/11.png";
import image12 from "../assets/icons/Layanan/12.png";
import image13 from "../assets/icons/Layanan/13.png";
import image14 from "../assets/icons/Layanan/14.png";
import image15 from "../assets/icons/Layanan/15.png";
import image16 from "../assets/icons/Layanan/16.png";
import image17 from "../assets/icons/Layanan/17.png";
import image18 from "../assets/icons/Layanan/18.png";
// import image19 from '../assets/icons/Layanan/19.png'; //MLA
import image20 from "../assets/icons/Layanan/20.png";
import image21 from "../assets/icons/Layanan/21.png";
import image22 from "../assets/icons/Layanan/22.png";
import image23 from "../assets/icons/Layanan/23.png";
import image24 from "../assets/icons/Layanan/24.png";
import image25 from "../assets/icons/Layanan/25.png";
import image26 from "../assets/icons/Layanan/26.png";

export const modules_constant = [
  // {
  //   iconImg: image1,
  //   url: "/dashboard/home",
  //   color: "#FDF3F3",
  //   r_modules_code: "12",
  //   module: "Simpadhu",
  // },
  // {
  //   iconImg: image2,
  //   url: "/dashboard/home",
  //   color: "#EFF7FF",
  //   r_modules_code: "11",
  //   module: "Notariat",
  // },

  // {
  //   iconImg: image3,
  //   url: "/perseroan/terbatas",
  //   color: "#EFFAF3",
  //   r_modules_code: "15",
  //   module: "Perseroan Terbatas",
  // },
  // {
  //   iconImg: image6,
  //   url: "/dashboard/home",
  //   color: "#E6FAFC",
  //   r_modules_code: "16",
  //   module: "Perkumpulan",
  // },
  {
    iconImg: image10,
    // url: "http://localhost:8005/ahu-koperasi/dashboard",
    url: "/ahu-koperasi/dashboard",
    color: "#FDF3F3",
    r_modules_code: "25",
    module: "Koperasi",
  },
  // {
  //   iconImg: image8,
  //   url: "/dashboard/home",
  //   color: "#EFF7FF",
  //   r_modules_code: "21",
  //   module: "Pemilik Manfaat",
  // },
  // {
  //   iconImg: image9,
  //   url: "/fidusia",
  //   color: "#EFFAF3",
  //   r_modules_code: "27",
  //   module: "Fidusia",
  // },
  // {
  //   iconImg: image11,
  //   url: "/dashboard/home",
  //   color: "#FEF7EE",
  //   r_modules_code: "46",
  //   module: "Harta Peninggalan",
  // },
  {
    icon: "bx bx-mobile-vibration",
    // url: "/pewarganegaraan/dashboard",
    url: "http://localhost:8009/pewarganegaraan/dashboard",
    color: "#FFA55D",
    r_modules_code: "19",
    module: "AHU Pewarganegaraan",
    children: [
      {
        url: "http://localhost:8009/pewarganegaraan/dashboard",
        code: "01",
        title: "Dashboard",
        level: "1",
        r_modules_code: "19",
        module: "AHU Pewarganegaraan",
        children: [],
      },
      {
        url: "http://localhost:8009/pewarganegaraan/pendaftaran",
        code: "02",
        title: "Pendaftaran",
        level: "1",
        r_modules_code: "19",
        module: "AHU Pewarganegaraan",
        children: [],
      },
    ],
  },
  // {
  //   iconImg: image13,
  //   url: "/kurator",
  //   color: "#E6FAFC",
  //   r_modules_code: "24",
  //   module: "Kurator Negara",
  // },
  // {
  //   iconImg: image14,
  //   url: "/perseroan/perorangan",
  //   color: "#FFFBEA",
  //   r_modules_code: "20",
  //   module: "Perseroan Perseorangan",
  // },
  // {
  //   iconImg: image15,
  //   url: "/dashboard/home",
  //   color: "#FDF3F3",
  //   r_modules_code: "30",
  //   module: "Advokat Asing",
  // },
  // {
  //   iconImg: image16,
  //   url: "/kewarganegaraan/dashboard",
  //   color: "#EFF7FF",
  //   r_modules_code: "26",
  //   module: "Kewarganegaraan",
  // },
  // {
  //   iconImg: image17,
  //   url: "/dashboard/home",
  //   color: "#EFFAF3",
  //   r_modules_code: "19",
  //   module: "Pewarganegaraan",
  // },
  // {
  //   iconImg: image18,
  //   url: "/parpol",
  //   color: "#FEF7EE",
  //   r_modules_code: "22",
  //   module: "Partai Politik",
  // },
  // {
  //   iconImg: image20,
  //   url: "/dashboard/home",
  //   color: "#E6FAFC",
  //   r_modules_code: "18",
  //   module: "PPNS",
  // },
  // {
  //   iconImg: image21,
  //   url: "/dashboard/home",
  //   color: "#FFFBEA",
  //   r_modules_code: "28",
  //   module: "Daktiloskopi",
  // },
  // {
  //   iconImg: image22,
  //   url: "/dashboard/home",
  //   color: "#FDF3F3",
  //   r_modules_code: "43",
  //   module: "Amnesti",
  // },
  // {
  //   iconImg: image23,
  //   url: "/dashboard/home",
  //   color: "#EFF7FF",
  //   r_modules_code: "44",
  //   module: "Abolisi",
  // },
  // {
  //   iconImg: image24,
  //   url: "/dashboard/home",
  //   color: "#EFFAF3",
  //   r_modules_code: "45",
  //   module: "Rehabilitasi",
  // },
  // {
  //   iconImg: image25,
  //   url: "/apostille",
  //   color: "#FEF7EE",
  //   r_modules_code: "23",
  //   module: "Apostille",
  // },
  // {
  //   iconImg: image26,
  //   url: "/dashboard/home",
  //   color: "#F9EFFA",
  //   r_modules_code: "31",
  //   module: "Grasi",
  // },
  // {
  //   icon: "bx bx-add-to-queue",
  //   url: "/dashboard/home",
  //   color: "#FFA55D",
  //   r_modules_code: "13",
  //   module: "Unduh Data",
  // },
  // {
  //   icon: "bx bx-border-all",
  //   url: "/dashboard/home",
  //   color: "#FFA55D",
  //   r_modules_code: "17",
  //   module: "SIMJA-OP",
  // },
  // {
  //   icon: "bx bx-mouse-alt",
  //   url: "/badan-usaha",
  //   color: "#FFA55D",
  //   r_modules_code: "29",
  //   module: "Badan Usaha",
  // },

  // {
  //   icon: "bx bx-book-content",
  //   url: "/dashboard/home",
  //   color: "#FFA55D",
  //   r_modules_code: "32",
  //   module: "Simpalnot",
  // },
  // {
  //   icon: "bx bx-message-square-dots",
  //   url: "/dashboard/home",
  //   color: "#FFA55D",
  //   r_modules_code: "33",
  //   module: "E-Pasti",
  // },
  // {
  //   icon: "bx bx-message-square",
  //   url: "/dashboard/home",
  //   color: "#FFA55D",
  //   r_modules_code: "34",
  //   module: "e-Harapan",
  // },
  // {
  //   icon: "bx bx-slideshow",
  //   url: "/dashboard/home",
  //   color: "#FFA55D",
  //   r_modules_code: "35",
  //   module: "Simpatik",
  // },
  // {
  //   icon: "bx bx-wallet-alt",
  //   url: "/dashboard/home",
  //   color: "#FFA55D",
  //   r_modules_code: "36",
  //   module: "Monitoring Kanwil",
  // },
  // {
  //   icon: "bx bx-memory-card",
  //   url: "/dashboard/home",
  //   color: "#FFA55D",
  //   r_modules_code: "37",
  //   module: "Portal Ditjen AHU",
  // },
  // {
  //   icon: "bx bx-message-rounded-dots",
  //   url: "/dashboard/home",
  //   color: "#FFA55D",
  //   r_modules_code: "38",
  //   module: "e-Office BHP",
  // },
  // {
  //   icon: "bx bx-message-dots",
  //   url: "/dashboard/home",
  //   color: "#FFA55D",
  //   r_modules_code: "39",
  //   module: "e-Smart",
  // },
  // {
  //   icon: "bx bx-bar-chart-alt-2",
  //   url: "/dashboard/home",
  //   color: "#FFA55D",
  //   r_modules_code: "40",
  //   module: "Advokasi Keperdataan",
  // },
  // {
  //   icon: "bx bx-store-alt",
  //   url: "/dashboard/home",
  //   color: "#FFA55D",
  //   r_modules_code: "41",
  //   module: "Beneficial Owner",
  // },
  // {
  //   icon: "bx bx-buildings",
  //   url: "/user-management/dashboard",
  //   color: "#FFA55D",
  //   r_modules_code: "42",
  //   module: "User Management",
  // },
];
