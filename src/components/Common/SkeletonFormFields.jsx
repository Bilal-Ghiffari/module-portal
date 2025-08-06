import { Skeleton, Box, Typography, Alert, Stack } from '@mui/material';

const SkeletonFormFields = ({ count = 3, cols = 3, infoMessage }) => {
  const skeletons = Array.from({ length: count });

  return (
    <Box className="form-horizontal mt-4 mb-4" sx={{ textAlign: 'center' }}>
      {/* Menggunakan Alert untuk pesan informasi */}
      <Alert severity="info" icon={false} sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1">
            Untuk menampilkan formulir , &nbsp;
            {infoMessage
              ? infoMessage
              : 'silakan pilih beberapa opsi dari atas terlebih dahulu'}
          </Typography>
        </Stack>
      </Alert>

      <div className="row">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className={`col-12 col-md-6 col-lg-${12 / cols} mb-3`}
          >
            <Skeleton variant="text" height={20} width="60%" />
            <Skeleton variant="rectangular" height={40} />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default SkeletonFormFields;
