import { Box, Typography } from "@mui/material";
import { Col, Row } from "reactstrap";
import { FormInput } from "@/components/Common/FormField";
import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import Region from "@/components/Region";
import TableDynamic from "../TableDynamic";
import Header from "@/components/Header";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { Label } from "reactstrap";
import Checked from "@/components/Common/Checked";
import FileUploadComponent from "@/components/Common/UploadFile";
import HeaderAdd from "../HeaderAdd";
import { filterValidDocuments } from "@/helpers/services/convert";
import { useState } from "react";
import RegionNested from "@/components/RegionNested";

const FormIdentitasDiri = ({ formik, disabled = false, page = "" }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeEditLabel, setActiveEditLabel] = useState("");

  return (
    <div className="mt-5 mb-3 px-2">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        {/* Data Perseroan */}
        <>
          {page === "Data Perseroan" && (
            <>
              {/* Informasi Perseroan Section */}
              <Row>
                <Col xs="12" md="12" lg="12" xl="12" className="px-3 mt-2 mb-3">
                  <div
                    className="p-1 px-2 d-flex flex-column gap-2 mb-2 py-4 px-3"
                    style={{
                      backgroundColor: "#FEF7EE",
                      fontSize: "12px",
                      borderRadius: 5,
                    }}
                  >
                    <CustomTooltipMui title="" arrow>
                      <span className="d-flex align-items-center gap-1">
                        <i
                          className="mdi mdi-information fw-bold"
                          style={{ color: "#FFA500", fontSize: "16px" }}
                        />
                        <p className="m-0 p-0">PERHATIAN</p>
                      </span>
                    </CustomTooltipMui>
                    <p className="m-0 p-0 w-75">
                      Nama dianggap sudah digunakan setelah terbit Sertifikat
                      Pendaftaran. Setelah input data selesai dan permohonan
                      masuk dalam daftar transaksi (selama batas waktu
                      konfirmasi belum habis), nama untuk sementara tidak dapat
                      digunakan oleh pemohon lain.
                    </p>
                  </div>
                </Col>
                <Col xs="12" md="12">
                  <Header label={"Informasi Perseroan"} disabled={disabled} />
                </Col>
                <Col xs="12" md="12" lg="12" xl="6" className="px-3">
                  <FormInput
                    formik={formik}
                    name="nama_perseroan"
                    placeholder="Nama Perseroan"
                    readonly={disabled}
                    required
                  />
                </Col>
                <Col xs="12" md="12" lg="12" xl="6">
                  <FormInput
                    formik={formik}
                    name="singkatan_nama_perseroan"
                    placeholder="Singkatan Nama Perseroan"
                    readonly={disabled}
                    required
                  />
                </Col>
                <Col xs="12" md="12" lg="12" xl="6">
                  <DynamicDropdown
                    formik={formik}
                    fieldName={"jenis_perseroan"}
                    data={[]}
                    label="Jenis Perseroan"
                    isDisabled={disabled}
                    required
                  />
                </Col>
                <Col xs="12" md="12" lg="12" xl="6">
                  <DynamicDropdown
                    formik={formik}
                    fieldName={"jangka_waktu"}
                    data={[]}
                    label="Jangka Waktu"
                    isDisabled={disabled}
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="npwp"
                    placeholder="NPWP"
                    readonly={disabled}
                    type="number"
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="tahun_buku"
                    placeholder="Tahun Buku"
                    readonly={disabled}
                    type="number"
                    required
                  />
                </Col>

                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="email"
                    placeholder="Email"
                    readonly={disabled}
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="no_telp"
                    placeholder="No Telp"
                    readonly={disabled}
                    type="number"
                    required
                  />
                </Col>
                <Col xs="12" md="12" lg="12" xl="12">
                  <div
                    className="p-1 px-2 d-flex flex-column gap-2 mb-2 py-2 px-3"
                    style={{
                      backgroundColor: "#FEF7EE",
                      fontSize: "12px",
                      borderRadius: 5,
                    }}
                  >
                    <CustomTooltipMui title="" arrow>
                      <span className="d-flex align-items-center gap-1">
                        <i
                          className="mdi mdi-information fw-bold"
                          style={{ color: "#FFA500", fontSize: "16px" }}
                        />
                        <p className="m-0 p-0 w-75">
                          Pastikan anda sudah memahami perka No.13 tahun 2017,{" "}
                          <span
                            className="text-info"
                            style={{ cursor: "pointer" }}
                          >
                            klik disini
                          </span>{" "}
                          untuk mengunduh file.
                        </p>
                      </span>
                    </CustomTooltipMui>
                  </div>
                </Col>
                <Col xs="12" md="12" lg="12" xl="12">
                  <div
                    className="p-1 px-2 d-flex flex-column gap-2 mb-2 py-2 px-3"
                    style={{
                      backgroundColor: "#FEF7EE",
                      fontSize: "12px",
                      borderRadius: 5,
                    }}
                  >
                    <CustomTooltipMui title="" arrow>
                      <span className="d-flex align-items-center gap-1">
                        <i
                          className="mdi mdi-information fw-bold"
                          style={{ color: "#FFA500", fontSize: "16px" }}
                        />
                        <p className="m-0 p-0 w-75">
                          Jika belum ada NPWP, maka NPWP akan di buat otomatis
                          ke sistem Ditjen Pajak di akhir proses pendaftaran.
                        </p>
                      </span>
                    </CustomTooltipMui>
                  </div>
                </Col>
              </Row>

              {/* Data Alamat Section */}
              <Row className="mt-4">
                <Col xs="12">
                  <Header label={"Alamat Perseroan"} />
                </Col>
                <RegionNested
                  formik={formik}
                  disabled={disabled}
                  provinsiKey="provinsi_kantor"
                  kabupatenKey="kabupaten_kantor"
                  kecamatanKey="kecamatan_kantor"
                  kelurahanKey="kelurahan_kantor"
                  showNegara={false}
                  col="3"
                  required
                />

                <Col xs="12" md="6" lg="4" xl="3" className="px-3">
                  <FormInput
                    formik={formik}
                    name="alamat_kantor"
                    type="text"
                    placeholder="Alamat Kantor"
                    readonly={disabled}
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3" className="px-3">
                  <FormInput
                    formik={formik}
                    name="no_telp_kantor"
                    type="tel"
                    placeholder="Nomor Telepon"
                    readonly={disabled}
                    required
                  />
                </Col>

                <Col xs="12" md="6" lg="4" xl="2" className="px-3">
                  <FormInput
                    formik={formik}
                    name="rt_kantor"
                    placeholder="RT"
                    type="number"
                    readonly={disabled}
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="2" className="px-3">
                  <FormInput
                    formik={formik}
                    name="rw_kantor"
                    placeholder="RW"
                    type="number"
                    readonly={disabled}
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="2" className="px-3">
                  <FormInput
                    formik={formik}
                    name="kode_pos_kantor"
                    placeholder="Kode Pos"
                    type="number"
                    readonly={disabled}
                    required
                  />
                </Col>
              </Row>
              {/* Maksud dan Tujuan Section */}
              <Row>
                <Col xs="12">
                  <HeaderAdd
                    formik={formik}
                    disabled={disabled}
                    label={"Maksud dan Tujuan"}
                    editOpen={editOpen}
                    setEditOpen={setEditOpen}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                    activeEditLabel={activeEditLabel}
                  />
                </Col>
                <Col xs="12" className="px-3">
                  <Label className="mb-0" style={{ fontSize: "12px" }}>
                    Apakah PT ini adalah Kewirausahaan Sosial / Social
                    Enterprise?
                    <span className="text-danger">*</span>
                  </Label>
                  <div
                    className="d-flex align-items-center gap-5 mt-1"
                    style={{ padding: "0px 22px" }}
                  >
                    <Checked
                      label="Ya"
                      value="1"
                      fieldName="maksud_tujuan_type"
                      formik={formik}
                      type="radio"
                    />
                    <Checked
                      label="Tidak"
                      value="0"
                      fieldName="maksud_tujuan_type"
                      formik={formik}
                      type="radio"
                    />
                  </div>
                </Col>
                {formik.values.maksud_tujuan_type === "1" && (
                  <>
                    <Col xs="12" md="12" lg="12" xl="12" className="px-3 mt-3">
                      <TableDynamic
                        data={filterValidDocuments(formik.values.maksud_tujuan)}
                        total_count={formik.values.maksud_tujuan?.length}
                        formik={formik}
                        showSelect={false}
                        label="Maksud dan Tujuan"
                        fieldName="maksud_tujuan"
                        setEditOpen={setEditOpen}
                        setEditingIndex={setEditingIndex}
                        setActiveEditLabel={setActiveEditLabel}
                      />
                    </Col>
                    <Col
                      xs="12"
                      md="12"
                      lg="12"
                      xl="12"
                      className="px-3 mt-2 mb-3"
                    >
                      <div
                        className="p-1 px-2 d-flex flex-column gap-2 mb-2 py-4 px-3"
                        style={{
                          backgroundColor: "#FEF7EE",
                          fontSize: "12px",
                          borderRadius: 5,
                        }}
                      >
                        <CustomTooltipMui title="" arrow>
                          <span className="d-flex align-items-center gap-1">
                            <i
                              className="mdi mdi-information fw-bold"
                              style={{ color: "#FFA500", fontSize: "16px" }}
                            />
                            <p className="m-0 p-0">PERHATIAN</p>
                          </span>
                        </CustomTooltipMui>
                        <div className="m-0 p-0 w-75">
                          <p className="m-0 p-0">
                            Akta Pendirian PT harus memuat ketentuan:
                          </p>
                          <ol className="mt-1 mb-2 ps-3">
                            <li>
                              Pasal tentang maksud dan tujuan usaha harus memuat
                              setidaknya satu tujuan yang mendukung Tujuan
                              Pembangunan Berkelanjutan (SDGs) sesuai ketentuan
                              dalam Peraturan Presiden.
                            </li>
                            <li>
                              Pasal tentang laba dan dividen harus mencantumkan
                              ketentuan bahwa sekurang-kurangnya 51% dari
                              keuntungan bersih diinvestasikan kembali untuk
                              mendukung paling sedikit satu misi sosial yang
                              selaras dengan Tujuan Pembangunan Berkelanjutan
                              (SDGs).
                            </li>
                          </ol>
                          <p className="m-0 p-0">
                            Ketentuan ini sesuai dengan:
                          </p>
                          <ul className="mt-1 mb-2 ps-3">
                            <li>
                              Peraturan Presiden No. 59 Tahun 2017 tentang
                              Pelaksanaan Pencapaian Tujuan Pembangunan
                              Berkelanjutan.
                            </li>
                            <li>
                              Peraturan Presiden No. 111 Tahun 2022 sebagai
                              pembaruan terhadap pelaksanaan SDGs di Indonesia.
                            </li>
                            <li>
                              Peraturan Presiden No. 2 Tahun 2022 tentang
                              Pengembangan Kewirausahaan Nasional Tahun
                              2021–2024.
                            </li>
                            <li>
                              Surat Edaran Menteri Hukum dan HAM No.
                              M.HH-1.AH.01.01 Tahun 2024 tentang pencatatan
                              Perseroan Persekutuan Modal berbasis misi sosial
                              (Social Enterprise) pada sistem Ditjen AHU.
                            </li>
                          </ul>
                        </div>
                        <div className="px-2">
                          <Checked
                            label="Saya mengerti dan bersedia melaksanakan sebagaimana ketentuan mengenai menginvestasi kembali minimal 51% dari keuntungan bersihnya untuk setidaknya satu misi sosial sebagaimana yang tercantum dalam tujuan pembangunan berkelanjutan/Sustainable Development Goals (SDG's)"
                            value="1"
                            fieldName="rules_4"
                            formik={formik}
                          />
                        </div>
                      </div>
                    </Col>
                  </>
                )}
              </Row>

              {/* Kegiatan Usaha Section */}
              <Row className="mt-4">
                <Col xs="12" md="12">
                  <HeaderAdd
                    formik={formik}
                    disabled={disabled}
                    label={"Kegiatan Usaha"}
                    editOpen={editOpen}
                    setEditOpen={setEditOpen}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                    activeEditLabel={activeEditLabel}
                  />
                </Col>
                <Col xs="12" md="12" lg="12" xl="12" className="px-3">
                  <TableDynamic
                    data={formik.values.kegiatan_usaha}
                    total_count={formik.values.kegiatan_usaha?.length}
                    formik={formik}
                    showSelect={false}
                    label="Kegiatan Usaha"
                    fieldName="kegiatan_usaha"
                    setEditOpen={setEditOpen}
                    setEditingIndex={setEditingIndex}
                    setActiveEditLabel={setActiveEditLabel}
                  />
                </Col>
              </Row>
              {/* Akta Notaris Section */}
              <Row className="mt-4">
                <Col xs="12">
                  <Header label={"Akta Notaris"} />
                </Col>
                <Col xs="12" md="6" lg="4" xl="4" className="px-3">
                  <FormInput
                    formik={formik}
                    name="nama_lengkap_notaris"
                    type="text"
                    placeholder="Nama Lengkap Notaris"
                    readonly={disabled}
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" className="px-3">
                  <FormInput
                    formik={formik}
                    name="no_akta"
                    placeholder="Nomor Akta"
                    type="text"
                    readonly={disabled}
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" className="px-3">
                  <FormInput
                    formik={formik}
                    name="tanggal_akta"
                    placeholder="Tanggal Akta"
                    type="date"
                    readonly={disabled}
                    required
                  />
                </Col>
              </Row>
              {/* Notaris Pengganti Section */}
              <Row>
                <Col xs="12">
                  <Header label={"Notaris Pengganti"} />
                </Col>
                <Col xs="12" className="px-3">
                  <Label className="mb-0" style={{ fontSize: "12px" }}>
                    Apakah Anda merupakan Notaris Pengganti? Notaris pengganti
                    sebelumnya tercatat tidak aktif atau tidak ditemukan.
                    <span className="text-danger">*</span>
                  </Label>
                  <div
                    className="d-flex align-items-center gap-5 mt-1"
                    style={{ padding: "0px 22px" }}
                  >
                    <Checked
                      label="Ya"
                      value="1"
                      fieldName="notaris_pengganti_type"
                      formik={formik}
                      type="radio"
                    />
                    <Checked
                      label="Tidak"
                      value="0"
                      fieldName="notaris_pengganti_type"
                      formik={formik}
                      type="radio"
                    />
                  </div>
                </Col>
                <Col xs="12" md="12" lg="12" xl="12" className="px-3 mt-3">
                  <TableDynamic
                    data={formik.values.notaris_pengganti}
                    total_count={formik.values.notaris_pengganti?.length}
                    formik={formik}
                    showSelect={false}
                    label="Notaris Pengganti"
                    fieldName="notaris_pengganti"
                    setEditOpen={setEditOpen}
                    setEditingIndex={setEditingIndex}
                    setActiveEditLabel={setActiveEditLabel}
                  />
                </Col>
              </Row>
              {/* Upload Dokumen Section */}
              <Row className="mt-4">
                <Col xs="12">
                  <Header label={"Upload Dokumen"} />
                </Col>
                <Col xs="12" className="px-3">
                  <FileUploadComponent
                    label="Akta Pendirian"
                    text="Pilih file Anda"
                    name="akta_pendirian"
                    resFile={(file) =>
                      formik.setFieldValue("akta_pendirian", file)
                    }
                    maxSizeMb={10}
                    searchLatLon={false}
                    validType="pdf"
                    specified={true}
                    required
                    fieldValue={formik.values.akta_pendirian}
                  />
                </Col>
              </Row>
            </>
          )}
        </>

        {/* MODAL PT */}
        <>
          {page === "Modal PT" && (
            <>
              {/* Modal Dasar Section */}
              <Row className="mt-4">
                <Col xs="12" md="12">
                  <HeaderAdd
                    formik={formik}
                    disabled={disabled}
                    label={"Modal Dasar"}
                    editOpen={editOpen}
                    setEditOpen={setEditOpen}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                    activeEditLabel={activeEditLabel}
                  />
                </Col>
                <Col xs="12" md="12" lg="12" xl="12" className="px-3">
                  <TableDynamic
                    data={filterValidDocuments(formik.values.modal_dasar)}
                    total_count={formik.values.modal_dasar?.length}
                    formik={formik}
                    showSelect={false}
                    label="Modal Dasar"
                    fieldName="modal_dasar"
                    setEditOpen={setEditOpen}
                    setEditingIndex={setEditingIndex}
                    setActiveEditLabel={setActiveEditLabel}
                  />
                </Col>
              </Row>
              {/* Modal Ditempatkan Section */}
              <Row className="mt-4">
                <Col xs="12" md="12">
                  <HeaderAdd
                    formik={formik}
                    disabled={disabled}
                    label={"Modal Ditempatkan"}
                    editOpen={editOpen}
                    setEditOpen={setEditOpen}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                    activeEditLabel={activeEditLabel}
                  />
                </Col>
                <Col xs="12" md="12" lg="12" xl="12" className="px-3">
                  <TableDynamic
                    data={filterValidDocuments(formik.values.modal_ditempatkan)}
                    total_count={formik.values.modal_ditempatkan?.length}
                    formik={formik}
                    showSelect={false}
                    label="Modal Ditempatkan"
                    fieldName="modal_ditempatkan"
                    setEditOpen={setEditOpen}
                    setEditingIndex={setEditingIndex}
                    setActiveEditLabel={setActiveEditLabel}
                  />
                </Col>
              </Row>
              {/* Modal Disetor Section */}
              <Row className="mt-4">
                <Col xs="12">
                  <Header label={"Modal Disetor"} />
                </Col>
                <Col xs="12" className="px-3">
                  <div
                    className="d-flex align-items-center gap-5 mt-1"
                    style={{ padding: "0px 22px" }}
                  >
                    <Checked
                      label="Dalam bentuk Uang"
                      value="Dalam bentuk Uang"
                      fieldName="modal_disetor"
                      formik={formik}
                      type="radio"
                    />
                    <Checked
                      label="Dalam bentuk lainnya"
                      value="Dalam bentuk lainnya"
                      fieldName="modal_disetor"
                      formik={formik}
                      type="radio"
                    />
                  </div>
                </Col>
                <Col xs="12" md="6" lg="4" xl="12" className="px-3 mt-2">
                  {formik.values.modal_disetor == "Dalam bentuk Uang" ? (
                    <FormInput
                      formik={formik}
                      name="jumlah_modal_disetor"
                      type="text"
                      placeholder="Modal Disetor"
                      readonly={disabled}
                      required
                      isCurrency
                    />
                  ) : (
                    <DynamicDropdown
                      formik={formik}
                      fieldName={"jumlah_modal_disetor"}
                      data={[]}
                      label="Modal Disetor (Barang)"
                      isDisabled={disabled}
                      required
                    />
                  )}
                </Col>
              </Row>
            </>
          )}
        </>
        {/* Pengurus PT */}
        <>
          {page === "Pengurus PT" && (
            <>
              {/* Pengurus dan Pemegang Saham Section */}
              <Row className="mt-4">
                <Col xs="12" md="12">
                  <HeaderAdd
                    formik={formik}
                    disabled={disabled}
                    label={"Pengurus dan Pemegang Saham"}
                    editOpen={editOpen}
                    setEditOpen={setEditOpen}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                    activeEditLabel={activeEditLabel}
                  />
                </Col>
                <Col xs="12" md="12" lg="12" xl="12">
                  <div
                    className="p-1 px-2 d-flex flex-column gap-2 mb-2 py-2 px-3"
                    style={{
                      backgroundColor: "#FEF7EE",
                      fontSize: "12px",
                      borderRadius: 5,
                    }}
                  >
                    <CustomTooltipMui title="" arrow>
                      <span className="d-flex align-items-center gap-1">
                        <i
                          className="mdi mdi-information fw-bold"
                          style={{ color: "#FFA500", fontSize: "16px" }}
                        />
                        <p className="m-0 p-0 w-75">
                          Selain Perseroan BUMN dan BUMD pemegang saham wajib
                          lebih dari satu.
                        </p>
                      </span>
                    </CustomTooltipMui>
                  </div>
                </Col>
                <Col xs="12" md="12" lg="12" xl="12" className="px-3">
                  <TableDynamic
                    data={filterValidDocuments(formik.values.pemegang_saham)}
                    total_count={formik.values.pemegang_saham?.length}
                    formik={formik}
                    showSelect={false}
                    label="Pengurus dan Pemegang Saham"
                    fieldName="pemegang_saham"
                    setEditOpen={setEditOpen}
                    setEditingIndex={setEditingIndex}
                    setActiveEditLabel={setActiveEditLabel}
                  />
                </Col>
              </Row>
              {/* Pemilik Manfaat Section */}
              <Row className="mt-4">
                <Col xs="12" md="12">
                  <HeaderAdd
                    formik={formik}
                    disabled={disabled}
                    label={"Pemilik Manfaat"}
                    editOpen={editOpen}
                    setEditOpen={setEditOpen}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                    activeEditLabel={activeEditLabel}
                  />
                </Col>
                <Col xs="12" md="12" lg="12" xl="12" className="px-3 mt-2 mb-3">
                  <div
                    className="p-1 px-2 d-flex flex-column gap-2 mb-2 py-4 px-3"
                    style={{
                      backgroundColor: "#FEF7EE",
                      fontSize: "12px",
                      borderRadius: 5,
                    }}
                  >
                    <CustomTooltipMui title="" arrow>
                      <span className="d-flex align-items-center gap-1">
                        <i
                          className="mdi mdi-information fw-bold"
                          style={{ color: "#FFA500", fontSize: "16px" }}
                        />
                        <p className="m-0 p-0">PERHATIAN</p>
                      </span>
                    </CustomTooltipMui>
                    <div className="m-0 p-0 w-75">
                      <p className="m-0 p-0">
                        Kementerian Hukum dan HAM dalam mendukung pemberantasan
                        tindak pidana pencucian uang dan Tindak Pidana Pendanaan
                        Terorisme melalui korporasi, menerapkan kewajiban
                        pelaporan pemilik manfaat, sesuai ketentuan:
                      </p>
                      <ul className="mt-1 mb-2 ps-3">
                        <li>
                          Peraturan Presiden Nomor 13 Tahun 2018{" "}
                          <span
                            className="text-info"
                            style={{ cursor: "pointer" }}
                          >
                            ( Unduh )
                          </span>
                        </li>
                        <li>
                          Peraturan Menteri Hukum dan HAM Nomor 15 Tahun 2019{" "}
                          <span
                            className="text-info"
                            style={{ cursor: "pointer" }}
                          >
                            ( Unduh )
                          </span>
                        </li>
                        <li>
                          Peraturan Menteri Hukum dan HAM Nomor 21 Tahun 2019{" "}
                          <span
                            className="text-info"
                            style={{ cursor: "pointer" }}
                          >
                            ( Unduh )
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="px-3">
                      <Checked
                        label="Saya mengerti, memahami dan bersedia melaksanakan sebagaimana ketentuan mengenai pelaporan pemilik manfaat pada korporasi."
                        value="1"
                        fieldName="rules_4"
                        formik={formik}
                      />
                    </div>
                  </div>
                </Col>
                <Col xs="12" md="12" lg="12" xl="12" className="px-3">
                  <TableDynamic
                    data={filterValidDocuments(formik.values.pemilik_manfaat)}
                    total_count={formik.values.pemilik_manfaat?.length}
                    formik={formik}
                    showSelect={false}
                    label="Pemilik Manfaat"
                    fieldName="pemilik_manfaat"
                    setEditOpen={setEditOpen}
                    setEditingIndex={setEditingIndex}
                    setActiveEditLabel={setActiveEditLabel}
                  />
                </Col>
              </Row>
            </>
          )}
        </>
      </Box>
    </div>
  );
};

export default FormIdentitasDiri;
