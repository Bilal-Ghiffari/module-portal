import {
  FormInputNested,
  FormSelect,
} from '@/components/Common/FormFieldNested';
import SkeletonFormFields from '@/components/Common/SkeletonFormFields'; // Import Skeleton component
import { DynamicDropdownCurrencyNested } from '@/components/DynamicDropdownCurrencyNested';
import { Save } from '@mui/icons-material';
import { Button, Grid, Typography, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { KATEGORI_OBJEK } from '../../../Constants/master';

const JenisObjekJaminanSection = ({
  formik,
  currencyData,
  onCancel,
  onSave,
  subKategoriOptions,
  atributOptions,
  loadingAtributes,
  loadingPost,
}) => {
  const { object_jaminan } = formik.values;

  const [kurs, setKurs] = useState('');
  const kategori_obyek = object_jaminan.kategori_obyek;
  const id_jenis_kategori_obyek = object_jaminan.id_jenis_kategori_obyek;
  const nilai_nominal = object_jaminan.nilai_nominal;

  // Validasi semua field yang diperlukan sebelum simpan
  const isFormValid = () => {
    if (!kategori_obyek || !id_jenis_kategori_obyek || !kurs || !nilai_nominal)
      return false;

    const isEveryValueFilled = object_jaminan.value_jenis_kategori.every(
      (item) => item && item.value.trim() !== ''
    );
    return isEveryValueFilled;
  };

  const handleSimpan = () => {
    if (!isFormValid()) {
      toastifyService.customWarningMsg(
        'Harap isi semua field yang diperlukan.'
      );
      return;
    }

    const valueJenisKategori = object_jaminan.value_jenis_kategori.map(
      (item, index) => ({
        id_atribut_jenis: index + 1, // Menginisialisasi id_atribut_jenis berdasarkan indeks (1-based)
        value: item.value, // Mengambil value dari objek
      })
    );

    const data = {
      kategori_obyek: kategori_obyek,
      id_jenis_kategori_obyek: id_jenis_kategori_obyek,
      valueJenisKategori,
      nilai_nominal: nilai_nominal,
      kurs: kurs,
    };

    onSave(data);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormSelect
            formik={formik}
            name="object_jaminan.kategori_obyek"
            title="Kategori Objek *"
            placeholder="Pilih kategori objek"
            select
            fullWidth
            options={KATEGORI_OBJEK}
            onChange={(e) => {
              formik.setFieldValue(
                'object_jaminan.kategori_obyek',
                e.target.value
              );
              formik.setFieldValue(
                'object_jaminan.id_jenis_kategori_obyek',
                ''
              );
            }}
            required
          />
        </Grid>

        {kategori_obyek && (
          <Grid item xs={12} md={6}>
            <FormSelect
              formik={formik}
              name="object_jaminan.id_jenis_kategori_obyek"
              title="Sub Kategori Objek *"
              placeholder="Pilih sub kategori objek"
              select
              fullWidth
              options={subKategoriOptions}
              onChange={(e) => {
                formik.setFieldValue(
                  'object_jaminan.id_jenis_kategori_obyek',
                  Number(e.target.value)
                );
              }}
              required
            />
          </Grid>
        )}
      </Grid>

      {!kategori_obyek ? (
        <Typography variant="body1">
          Harap pilih kategori objek terlebih dahulu.
        </Typography>
      ) : !id_jenis_kategori_obyek ? (
        <Typography variant="body1">
          Harap pilih sub kategori objek setelah memilih kategori.
        </Typography>
      ) : (
        <>
          {id_jenis_kategori_obyek && loadingAtributes ? (
            <SkeletonFormFields count={4} />
          ) : (
            atributOptions.map((attr, index) => (
              <Grid item xs={12} md={6} key={attr.id_atribut_jenis}>
                <FormInputNested
                  formik={formik}
                  name={`object_jaminan.value_jenis_kategori.${index}.value`}
                  title={attr.label}
                  placeholder={`Masukkan ${attr.label}`}
                  fullWidth
                  required
                  value={
                    formik.values.object_jaminan.value_jenis_kategori[index]
                      ?.value || ''
                  }
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    formik.setFieldValue(
                      `object_jaminan.value_jenis_kategori.${index}`,
                      {
                        id_atribut_jenis: attr.id_atribut_jenis,
                        value: inputValue,
                      }
                    );
                  }}
                />
              </Grid>
            ))
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DynamicDropdownCurrencyNested
                isMulti={false}
                formik={formik}
                fieldName="object_jaminan.kurs"
                data={currencyData}
                value={kurs}
                label="Pilih mata uang"
                required={true}
                isDisabled={false}
                onChange={(value) => {
                  setKurs(value);
                  formik.setFieldValue('object_jaminan.kurs', value.label);
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInputNested
                formik={{
                  ...formik,
                  setFieldValue: (field, value) => {
                    formik.setFieldValue(field, Number(value));
                  },
                }}
                name="object_jaminan.nilai_nominal"
                title="Jumlah Nilai *"
                placeholder="Tulis jumlah nilai"
                fullWidth
              />
            </Grid>
          </Grid>
        </>
      )}

      <Grid
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={onCancel}
          color="primary"
          variant="outlined"
          sx={{
            width: '20%',
            marginRight: '10px',
            fontSize: '14px',
            textTransform: 'none',
            color: '#041662',
            borderColor: '#041662',
          }}
        >
          Batal
        </Button>
        <Button
          onClick={handleSimpan}
          disabled={!isFormValid() || loadingPost}
          color="primary"
          variant="contained"
          sx={{
            width: '20%',
            fontSize: '14px',
            textTransform: 'none',
            backgroundColor: '#041662',
            color: '#fff',
            '& .MuiButton-startIcon': {
              display: loadingPost ? 'none' : 'inline-flex',
            },
          }}
          startIcon={<Save fontSize="20px" />}
        >
          {loadingPost ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Simpan'
          )}
        </Button>
      </Grid>
    </>
  );
};

export default JenisObjekJaminanSection;
