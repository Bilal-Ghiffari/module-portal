import { DynamicDropdownCurrencyNested } from '@/components/DynamicDropdownCurrencyNested'; // Import DynamicDropdown
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const ModalFormKurs = ({
  open,
  loading,
  onClose,
  onSave,
  formik,
  currencyData,
}) => {
  const [kurs, setKurs] = useState('');
  const [nominal, setNominal] = useState(0);

  const handleSave = () => {
    onSave(kurs, nominal);
    onClose();
    resetField();
  };

  const resetField = () => {
    setKurs('');
    setNominal('');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '16px',
        },
      }}
      disableEscapeKeyDown
      disableBackdropClick
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 600 }}>
        Tambah Nilai
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body2"
          sx={{ marginBottom: 2, textAlign: 'center', color: '#6c757d' }}
        >
          Silakan tambah nilai jaminan
        </Typography>

        <div style={{ marginBottom: '20px' }}>
          <DynamicDropdownCurrencyNested
            isMulti={false}
            formik={formik}
            fieldName="information_jaminan.kurs"
            data={currencyData}
            value={kurs}
            label="Pilih KURS"
            required={true}
            isDisabled={false}
            onChange={(value) => {
              setKurs(value);
              formik.setFieldValue('information_jaminan.kurs', value);
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Nominal"
            type="number"
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            InputProps={{
              style: {
                borderRadius: '12px',
                padding: '10px 16px',
              },
            }}
          />
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', padding: '20px' }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{
            width: '30%',
            marginRight: '10px',
            fontSize: '14px',
            textTransform: 'none',
            color: '#041662',
            borderColor: '#041662',
          }}
        >
          Kembali
        </Button>
        <Button
          disabled={loading}
          onClick={handleSave}
          color="primary"
          variant="contained"
          sx={{
            width: '30%',
            fontSize: '14px',
            textTransform: 'none',
            backgroundColor: '#041662',
            color: '#fff',
          }}
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalFormKurs;
