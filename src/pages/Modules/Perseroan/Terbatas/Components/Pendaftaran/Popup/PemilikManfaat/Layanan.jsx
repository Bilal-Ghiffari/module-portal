import React, { useState, useEffect } from "react";
import { Row, Col, Label } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { FormInput } from "@/components/Common/FormField";
import Header from "@/components/Header";
import Checked from "@/components/Common/Checked";
import Region from "@/components/Region";
import ButtonCustom from "@/components/Common/ButtonCustom";
import RegionNested from "@/components/RegionNested";

const pemilikManfaat = [
  {
    label:
      "Memiliki saham lebih dari 25% (dua puluh lima persen) pada perseroan terbatas sebagaimana tercantum dalam anggaran dasar",
    value: "1",
    fieldName: "rules_pemilik_manfaat_1",
  },
  {
    label:
      "Memiliki hak suara lebih dari 25% (dua puluh lima persen) pada perseroan terbatas sebagaimana tercantum dalam anggaran dasar",
    value: "1",
    fieldName: "rules_pemilik_manfaat_2",
  },
  {
    label:
      "Menerima keuntungan atau laba lebih dari 25% (dua puluh lima persen) dari keuntungan atau laba yang diperoleh perseroan terbatas per tahun",
    value: "1",
    fieldName: "rules_pemilik_manfaat_3",
  },
  {
    label:
      "Memiliki kewenangan untuk mengangkat, menggantikan, atau memberhentikan anggota direksi dan anggota dewan komisaris",
    value: "1",
    fieldName: "rules_pemilik_manfaat_4",
  },
  {
    label:
      "Memiliki kewenangan atau kekuasaan untuk mempengaruhi atau mengendalikan perseroan terbatas tanpa harus mendapat otorisasi dari pihak manapun",
    value: "1",
    fieldName: "rules_pemilik_manfaat_5",
  },
  {
    label: "Menerima manfaat dari perseroan terbatas",
    value: "1",
    fieldName: "rules_pemilik_manfaat_6",
  },
  {
    label:
      "Merupakan pemilik sebenarnya dari dana atas kepemilikan saham perseroan terbatas",
    value: "1",
    fieldName: "rules_pemilik_manfaat_7",
  },
];

const Layanan = ({ formik, label, description, data }) => {
  return (
    <div className="bg-white">
      <div className="d-flex flex-column w-100 py-4">
        <Row className="w-100 ps-2">
          <Col xs="12" className="mb-2">
            <Header label={label} />
            <p className="m-0 p-0 px-2" style={{ fontSize: "0.8rem" }}>
              {description}
            </p>
          </Col>

          <div className="px-3">
            {label == "Pemilik Manfaat" && (
              <div className="ps-4">
                {pemilikManfaat.map((d, index) => {
                  return (
                    <Col xs="12" className="mb-2">
                      <Checked
                        label={d.label}
                        value={d.value}
                        fieldName={d.fieldName}
                        formik={formik}
                      />
                    </Col>
                  );
                })}
              </div>
            )}
          </div>
          <>
            {label == "Informasi Pemilik Manfaat" && (
              <>
                {data.map((d) => (
                  <Row key={d}>
                    <Col xs="6" className="px-3 mb-2">
                      <Label className="mb-0" style={{ fontSize: "12px" }}>
                        Kewarganegaraan <span className="text-danger">*</span>
                      </Label>
                      <div
                        className="d-flex align-items-center gap-5 mt-1"
                        style={{ padding: "0px 22px" }}
                      >
                        <Checked
                          label="WNI"
                          value="WNI"
                          fieldName={`pemilik_manfaat[${d}].kewarganegaraan`}
                          formik={formik}
                        />
                        <Checked
                          label="WNA"
                          value="WNA"
                          fieldName={`pemilik_manfaat[${d}].kewarganegaraan`}
                          formik={formik}
                        />
                      </div>
                    </Col>

                    <Col xs="6" className="px-3 mb-2">
                      <Label className="mb-0" style={{ fontSize: "12px" }}>
                        Jenis Identitas <span className="text-danger">*</span>
                      </Label>
                      <div
                        className="d-flex align-items-center gap-5 mt-1"
                        style={{ padding: "0px 22px" }}
                      >
                        <Checked
                          label="NIK"
                          value="NIK"
                          fieldName={`pemilik_manfaat[${d}].jenis_identitas`}
                          formik={formik}
                        />
                        <Checked
                          label="SIM"
                          value="SIM"
                          fieldName={`pemilik_manfaat[${d}].jenis_identitas`}
                          formik={formik}
                        />
                        <Checked
                          label="Paspor"
                          value="Paspor"
                          fieldName={`pemilik_manfaat[${d}].jenis_identitas`}
                          formik={formik}
                        />
                      </div>
                    </Col>

                    <Col xs="4" className="mb-2">
                      <FormInput
                        formik={formik}
                        name={`pemilik_manfaat[${d}].nama_lengkap`}
                        type="text"
                        placeholder="Nama Lengkap"
                        required
                      />
                    </Col>
                    <Col xs="4" className="mb-2">
                      <FormInput
                        formik={formik}
                        name={`pemilik_manfaat[${d}].email`}
                        type="text"
                        placeholder="Email"
                        required
                      />
                    </Col>
                    <Col xs="4" className="mb-2">
                      <FormInput
                        formik={formik}
                        name={`pemilik_manfaat[${d}].no_hp`}
                        type="number"
                        placeholder="Nomor HP"
                        required
                      />
                    </Col>
                    <Col xs="6" className="mb-2">
                      <FormInput
                        formik={formik}
                        name={`pemilik_manfaat[${d}].tanggal_lahir`}
                        type="date"
                        placeholder="Tanggal Lahir"
                        required
                      />
                    </Col>
                    <Col xs="6" className="mb-2">
                      <DynamicDropdown
                        formik={formik}
                        fieldName={`pemilik_manfaat[${d}].tempat_lahir`}
                        data={[]}
                        label="Tempat Lahir"
                        required
                      />
                    </Col>
                    <Col xs="6" className="mb-2">
                      <FormInput
                        formik={formik}
                        name={`pemilik_manfaat[${d}].no_identitas`}
                        type="number"
                        placeholder="Nomor Identitas"
                        required
                      />
                    </Col>
                    <Col xs="6" className="mb-2">
                      <FormInput
                        formik={formik}
                        name={`pemilik_manfaat[${d}].npwp`}
                        type="number"
                        placeholder="NPWP"
                        required
                      />
                    </Col>
                    <Col xs="12" className="mb-2">
                      <DynamicDropdown
                        formik={formik}
                        fieldName={`pemilik_manfaat[${d}].hubungan_antara_korporasi_dengan_pemilik_manfaat`}
                        data={[]}
                        label="Hubungan Antara Korporasi dengan Pemilik Manfaat"
                        required
                      />
                    </Col>

                    {/* Data Alamat Section */}
                    <Col xs="12">
                      <Header label="Alamat" />
                    </Col>

                    {formik.values.pemilik_manfaat[d].kewarganegaraan ===
                      "WNI" && (
                      <>
                        <Col xs="12">
                          <RegionNested
                            formik={formik}
                            provinsiKey={`pemilik_manfaat[${d}].provinsi`}
                            kabupatenKey={`pemilik_manfaat[${d}].kabupaten`}
                            kecamatanKey={`pemilik_manfaat[${d}].kecamatan`}
                            kelurahanKey={`pemilik_manfaat[${d}].kelurahan`}
                            showNegara={false}
                            col="3"
                            required
                          />
                        </Col>
                        <Col xs="12" md="6" lg="4" xl="3">
                          <FormInput
                            formik={formik}
                            name={`pemilik_manfaat[${d}].alamat`}
                            type="text"
                            placeholder="Alamat"
                            required
                          />
                        </Col>
                        <Col xs="12" md="6" lg="4" xl="3">
                          <FormInput
                            formik={formik}
                            name={`pemilik_manfaat[${d}].no_telp`}
                            type="tel"
                            placeholder="Nomor Telepon"
                            required
                          />
                        </Col>
                        <Col xs="12" md="6" lg="4" xl="2" className="m-0 p-0">
                          <FormInput
                            formik={formik}
                            name={`pemilik_manfaat[${d}].rt`}
                            type="number"
                            placeholder="RT"
                            required
                          />
                        </Col>
                        <Col xs="12" md="6" lg="4" xl="2" className="m-0 p-0">
                          <FormInput
                            formik={formik}
                            name={`pemilik_manfaat[${d}].rw`}
                            type="number"
                            placeholder="RW"
                            required
                          />
                        </Col>
                        <Col xs="12" md="6" lg="4" xl="2" className="m-0 p-0">
                          <FormInput
                            formik={formik}
                            name={`pemilik_manfaat[${d}].kode_pos`}
                            type="number"
                            placeholder="Kode Pos"
                            required
                          />
                        </Col>
                      </>
                    )}

                    {formik.values.pemilik_manfaat[d].kewarganegaraan ===
                      "WNA" && (
                      <>
                        <Col xs="12" md="6">
                          <DynamicDropdown
                            formik={formik}
                            fieldName={`pemilik_manfaat[${d}].negara_asal`}
                            data={[]}
                            label="Negara Asal"
                            required
                          />
                        </Col>
                        <Col xs="12" md="6">
                          <FormInput
                            formik={formik}
                            name={`pemilik_manfaat[${d}].alamat`}
                            type="text"
                            placeholder="Alamat"
                            required
                          />
                        </Col>
                      </>
                    )}

                    <div className="px-4">
                      <Checked
                        label="Notaris Wajib memiliki berkas dokumen data dari pemilik manfaat tersebut"
                        value="1"
                        fieldName={`pemilik_manfaat[${d}].rules_pemilik_manfaat_8`}
                        formik={formik}
                      />
                    </div>
                  </Row>
                ))}
              </>
            )}
          </>
        </Row>
      </div>
    </div>
  );
};

export default Layanan;
