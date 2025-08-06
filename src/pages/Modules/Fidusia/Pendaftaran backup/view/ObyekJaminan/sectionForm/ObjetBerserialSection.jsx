import React from 'react';
import { Grid } from '@mui/material';
import { FormInputNested } from '@/components/Common/FormFieldNested';

const ObjekBerserialSection = ({ formik, subKategoriObyek }) => {
  return (
    <>
      {subKategoriObyek === 'KENDARAAN_LAINNYA' && (
        <Grid container>
          <Grid item xs={12} md={12}>
            <FormInputNested
              formik={formik}
              name="object_jaminan.dimensi"
              title="Dimensi *"
              placeholder="Tulis dimensi"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputNested
              formik={formik}
              name="object_jaminan.nomorRangka"
              title="Nomor Rangka *"
              placeholder="Tulis nomor rangka"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputNested
              formik={formik}
              name="object_jaminan.nomorMesin"
              title="Nomor Mesin *"
              placeholder="Tulis nomor mesin"
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

      {subKategoriObyek !== 'KENDARAAN_LAINNYA' && (
        <Grid container>
          <Grid item xs={12} md={12}>
            <FormInputNested
              formik={formik}
              name="object_jaminan.merk"
              title="Merk *"
              placeholder="Tulis merk"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputNested
              formik={formik}
              name="object_jaminan.tipe"
              title="Tipe *"
              placeholder="Tulis tipe"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputNested
              formik={formik}
              name="object_jaminan.nomorRangka"
              title="Nomor Rangka *"
              placeholder="Tulis nomor rangka"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputNested
              formik={formik}
              name="object_jaminan.nomorMesin"
              title="Nomor Mesin *"
              placeholder="Tulis nomor mesin"
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
    </>
  );
};

export default ObjekBerserialSection;
