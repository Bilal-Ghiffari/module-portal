import { ToastifyService } from '@/components/Toastify/toastifyService';
import { Tooltip } from '@mui/material';
const toastifyService = new ToastifyService();

export const addColumnAction = ({ handleEdit, handleDelete }) => ({
  name: 'AKSI',
  minWidth: '90px',
  notConvert: true,
  cell: (row) => (
    <div className="my-1">
      <div className="d-flex justify-content-between column-gap-2">
        <Tooltip title="Edit" placement="top" className="rounded cursor-pointer bg-warning p-1">
          <div onClick={() => handleEdit(row)}>
            <i className="bx bx-edit text-white fs-3"></i>
          </div>
        </Tooltip>
        <Tooltip title="Hapus Data" placement="top">
          <div onClick={() => handleDelete(row)} className={`rounded cursor-pointer bg-danger p-1`}>
            <i className={`bx bx-trash text-white fs-3`}></i>
          </div>
        </Tooltip>
      </div>
    </div>
  ),
  ignoreRowClick: true,
  allowOverflow: true,
  button: true
});

export const handleDownload = async ({ fetchData, query, refExport, defLimit = 1000, getResult, injectQuery }) => {
  if(!getResult){
    const confirm = await toastifyService.confirmationDownloadData();
    if (!confirm) return;
  }

  toastifyService.customShowLoading({msg:"Sedang Menyiapkan Data..."});

  const payload = { ...query, limit: defLimit };
  const initialRes = await fetchData({...payload, ...injectQuery});
  let allData = [...initialRes.data]; // Mengumpulkan semua data
  const totalCount = initialRes.total_count;
  const limit = Number(payload.limit);
  const totalPages = Math.ceil(totalCount / limit);

  // Loop untuk melakukan fetch sisa halaman jika ada lebih dari 1 halaman
  for (let page = 2; page <= totalPages; page++) {
    const nextQuery = { ...payload, page: String(page) };
    const nextRes = await fetchData({...nextQuery, ...injectQuery});
    allData = [...allData, ...nextRes.data];
  }

  if (getResult) {
    toastifyService.close();
    return allData;
  } else {
    refExport.current.downloadExcel(allData);
    toastifyService.close();
  }
};
