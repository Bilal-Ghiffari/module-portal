import React from 'react';
import { Grid } from '@mui/material';
import { FormInputNested } from '@/components/Common/FormFieldNested';

const ObjekTidakBerserialSection = ({ formik, subKategoriObyek }) => {
  return (
    <>
      {subKategoriObyek === 'HEWAN_TERNACK' && (
        <Grid container>
          <Grid item xs={12} md={12}>
            <FormInputNested
              formik={formik}
              name="object_jaminan.keteranganHewan"
              title="Keterangan *"
              placeholder="Tulis keterangan"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputNested
              formik={formik}
              name="object_jaminan.buktiObyek"
              title="Bukti Objek *"
              placeholder="Tulis bukti objek"
              fullWidth
            />
          </Grid>
        </Grid>
      )}

      {subKategoriObyek === 'ASET_PERUSAHAAN' && (
        <Grid container>
          <Grid item xs={12} md={12}>
            <FormInputNested
              formik={formik}
              name="object_jaminan.keterangan"
              title="Keterangan *"
              placeholder="Tulis keterangan"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputNested
              formik={formik}
              name="object_jaminan.nomorBuktiAsli"
              title="Nomor Bukti Asli *"
              placeholder="Tulis nomor bukti"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputNested
              formik={formik}
              name="object_jaminan.buktiObyek"
              title="Bukti Objek *"
              placeholder="Tulis bukti objek"
              fullWidth
            />
          </Grid>
        </Grid>
      )}

      {/* Tambahkan sub kategori lainnya sesuai kebutuhan */}
    </>
  );
};

export default ObjekTidakBerserialSection;
