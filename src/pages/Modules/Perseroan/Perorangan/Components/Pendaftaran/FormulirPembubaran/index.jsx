import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Checked from '@/components/Common/Checked';

const FormulirPembubaran = ({ formik }) => {
  return (
    <div className="mb-3 px-4">
      <Box
        sx={{
          backgroundColor: '#EFF7FF',
          padding: 1,
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Typography sx={{ color: '#041662', fontWeight: 600 }}>
          Alasan Pembubaran
        </Typography>
      </Box>

      <Box
        className="px-3"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box className="d-flex flex-column gap-2">
          <Checked
            label={`Berdasarkan keputusan pemegang saham Perseroan perorangan yang mempunyai kekuatan hukum dama dengan rapat umum pemegang saham.`}
            value="1"
            fieldName={`rules_3`}
            formik={formik}
          />
          <Checked
            label={`Jangka waktu berdiri yang ditetapkan dalam pernyataan pendirian atau perubahannya telah berakhir.`}
            value="1"
            fieldName={`rules_4`}
            formik={formik}
          />
          <Checked
            label={`Berdasarkan penetapan pengadilan.`}
            value="1"
            fieldName={`rules_5`}
            formik={formik}
          />
          <Checked
            label={`Dengan dicabutnya kepailitan berdasarkan keputusan pengadilan niaga yang telah mempunyai kekuatan hukum tetap, harta pailit Perseroan Perorangan tidak cukup untuk membayar biaya kepailitan.`}
            value="1"
            fieldName={`rules_6`}
            formik={formik}
          />
          <Checked
            label={`Harta pailit Perseroan Perorangan yang telah dinyatakan pailit berada dalam keadaan insolvensi sebagaimana diatur dalam Undang-Undang mengenai kepailitan dan penundaan kewajiban dan penundaan kewajiban pembayaran utang.`}
            value="1"
            fieldName={`rules_7`}
            formik={formik}
          />
          <Checked
            label={`Dicabutnya perizinan berusaha Perseroan Perorangan sehingga mewajibkan Perseroan Perorangan melakukan likuidasi dengan mengisi Pernyataan Pembumbaran.`}
            value="1"
            fieldName={`rules_8`}
            formik={formik}
          />
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: '#EFF7FF',
          padding: 1,
          borderRadius: 2,
          mb: 2,
          mt: 4,
        }}
      >
        <Typography sx={{ color: '#041662', fontWeight: 600 }}>
          Syarat Pembubaran
        </Typography>
      </Box>

      <Box
        className="px-3"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box className="d-flex flex-column gap-2">
          <Checked
            label={`Bahwa saya selaku Pemohon menyatakan pembumbaran <NAMA PT> telah menyelesaikan segala kewajiban dan melakukan pemberesan dengan pihak ketiga sesuai dengan ketentuan peraturan perundang-undangan.`}
            value="1"
            fieldName={`rules_9`}
            formik={formik}
          />
        </Box>
      </Box>
    </div>
  );
};

export default FormulirPembubaran;
