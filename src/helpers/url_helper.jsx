export const OAUTHSSO = '/oauth/callback';
export const GENERATE_URL_SSO = '/oauth/login_url';
export const GET_PROFILE = '/auth/profile';

//Authentication
export const AUTH_CHANGE_PWD = '/auth/chpass';
export const LOGIN = '/auth/login';
export const AUTH_REQ_RESET = '/auth/reqreset';
export const AUTH_RESET_PASS = '/auth/resetpass';

// MASTER
export const GET_KBLI = "/perseroan-perorangan/kbli";
export const GET_COUNTRY = "/master/negara";
export const GET_APOSTILLE_COUNTRY = "/master/apostille/negara";
export const GET_APOSTILLE_KANWIL = "/master/apostille/kanwil";
export const GET_APOSTILLE_JENIS_DOKUMEN = "/master/apostille/dokumen";
export const GET_APOSTILLE_SPESIMEN_PEJABAT = "/apostille/spesimen/pejabat";


//Public
export const GET_PUBLIC_PROVINSI = '/portal/provinsi';
export const GET_PUBLIC_ROPDOWN_KOTAKAB = '/portal/kotakab';
export const GET_PUBLIC_ROPDOWN_KECAMATAN = '/portal/kecamatan';
export const GET_PUBLIC_ROPDOWN_DESA = '/portal/desa';
export const GET_LEMBAGA_PEMERINTAHAN = '/dropdown/lembaga';

// PENGUMUMAN
export const GET_LIST_TEKS = '/announcement/text_list';
export const DELETE_TEKS = '/announcement/delete_text';
export const UPDATE_TEKS = '/announcement/upd_text';
export const GET_RUNNING_TEKS = '/announcement/running';
// Usman
export const GET_DROPDOWN_LIST_ROLE = '/users/role_list';
export const GET_DROPDOWN_LIST_MODULES = '/dropdown/modules_list';
export const GET_DROPDOWN_MENU_LIST = '/dropdown/menus_list';
export const POST_EDIT_PERMISSION = '/users/edit_permission';
export const POST_EDIT_ROLE = '/users/edit_role';
export const POST_NEW_ROLE = '/users/add_role';
export const POST_DELETE_ROLE = '/users/delete_role';
export const POST_DELETE_PERMISSION = '/users/delete_permission';
export const POST_NEW_PERMISSION = '/users/add_permission';
export const POST_NEW_USMAN = '/users/add_user';
export const GET_LIST_PENGGUNA = '/users/list';
export const GET_DETAIL_PENGGUNA = '/users/detail';
export const POST_UPDATE_USMAN = '/users/upd_user';
export const GET_DATA_LOG = '/users/session_log';
export const GET_ACTIVE_USER = '/users/active_status';

export const GET_INCREMENT = '/users/increement_visit';
export const GET_ROLE_DETAIL = '/users/role_detail';
export const POST_REQ_RESET_PWD = '/users/req_reset';
export const POST_SET_RESET_PWD_TOKEN = '/users/set_pass_token';
export const GET_USMAN_DETAIL_NIP = '/users/detail_nip';


// PERSEROAN PERORANGAN
export const POST_PERSEROAN_PERORANGAN = "/perseroan-perorangan/pendirian";
export const POST_PERSEROAN_PERORANGAN_PERUBAHAN = "/perseroan-perorangan/perubahan";
export const GET_PERSEROAN_PERORANGAN = "/perseroan-perorangan/pendirian";
export const GET_PERSEROAN_PERORANGAN_USER = "/perseroan-perorangan/pendirian/byuser";
export const GET_SERTIFIKAT_PERSEROAN_PERORANGAN = "/perseroan-perorangan/sertifikat";

// APOSTILLE
export const GET_APOSTILLE_PERMOHONAN_RIWAYAT = "/apostille/permohonan/riwayat";
export const APOSTILLE_PERMOHONAN_RIWAYAT = "/apostille/permohonan";
export const GET_APOSTILLE_VERIFIKASI_PERMOHONAN_RIWAYAT = "/apostille/permohonan/verifikasi-list";
export const APOSTILLE_PERMOHONAN_DOKUMEN = "/apostille/permohonan/dokumen";
export const APOSTILLE_PERMOHONAN_DOKUMEN_UPLOAD = "/apostille/permohonan/upload";
