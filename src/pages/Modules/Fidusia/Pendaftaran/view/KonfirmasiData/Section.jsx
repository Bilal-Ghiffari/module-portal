import React from 'react';
import { Link, Grid, Typography, Box } from '@mui/material';

const Section = ({
  data,
  title,
  modul,
  col = 2, // Default 2 kolom
  spacing = 2, // Spasi antar grid
  variant = 'body2', // Variant typography
}) => {
  // Render untuk kolom tunggal
  const renderSingleColumn = () => (
    <Grid item xs={12}>
      {data.map((field, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 1,
          }}
        >
          <Typography
            variant={variant}
            component="div"
            sx={{
              width: '40%',
              paddingRight: 1,
              marginRight: col === 1 ? '10px' : 0,
              display: 'flex',
              alignItems: 'center',
              mb: 1,
            }}
          >
            {field.label}
          </Typography>
          <span
            style={{
              marginLeft: 5,
              marginRight: 10,
              color: 'rgba(0,0,0,0.6)',
            }}
          >
            :
          </span>
          <Typography
            variant={variant}
            component="div"
            sx={{
              width: '60%',
            }}
          >
            {field.label === 'File Juknis' ? (
              <Link
                href={field.value?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {field.value}
              </Link>
            ) : (
              field.value || '-'
            )}
          </Typography>
        </Box>
      ))}
    </Grid>
  );

  // Bagi data menjadi dua kolom
  const splitData = (data) => {
    const middleIndex = Math.ceil(data.length / 2);
    return [data.slice(0, middleIndex), data.slice(middleIndex)];
  };

  // Render untuk dua kolom
  const renderTwoColumns = () => {
    const [leftColumn, rightColumn] = splitData(data);

    return (
      <>
        <Grid item xs={12} sm={6}>
          {leftColumn.map((field, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 1,
              }}
            >
              <Typography
                variant={variant}
                component="div"
                sx={{
                  width: col === 1 ? '40%' : '50%',
                  paddingRight: 1,
                  marginRight: col === 1 ? '10px' : 0,
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                {field.label}
              </Typography>
              <span
                style={{
                  marginLeft: 5,
                  marginRight: 10,
                  color: 'rgba(0,0,0,0.6)',
                }}
              >
                :
              </span>
              <Typography
                variant={variant}
                component="div"
                sx={{
                  width: '50%',
                }}
              >
                {field.label === 'File Juknis' ? (
                  <Link
                    href={field.value?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {field.value}
                  </Link>
                ) : (
                  field.value || '-'
                )}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          {rightColumn.map((field, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 1,
              }}
            >
              <Typography
                variant={variant}
                component="div"
                sx={{
                  width: col === 1 ? '30%' : '50%',
                  paddingRight: 1,
                  marginRight: col === 1 ? '10px' : 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {field.label}
              </Typography>
              <span
                style={{
                  marginLeft: 5,
                  marginRight: 10,
                  color: 'rgba(0,0,0,0.6)',
                }}
              >
                :
              </span>
              <Typography
                variant={variant}
                component="div"
                sx={{
                  width: '50%',
                }}
              >
                {field.label === 'File Juknis' ? (
                  <Link
                    href={field.value?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {field.value}
                  </Link>
                ) : (
                  field.value || '-'
                )}
              </Typography>
            </Box>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <Box sx={{ width: '100%', padding: 1 }}>
      {title && (
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            marginBottom: 2,
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
      )}

      <Grid
        container
        spacing={spacing}
        sx={{
          display: 'flex',
        }}
      >
        {col === 1 ? renderSingleColumn() : renderTwoColumns()}
      </Grid>
    </Box>
  );
};

export default Section;

// import React from 'react';
// import { Link, Grid, Typography, Box } from '@mui/material';

// const Section = ({
//   data,
//   title,
//   modul,
//   col = 2, // Default 2 kolom
//   spacing = 2, // Spasi antar grid
//   variant = 'body2', // Variant typography
// }) => {
//   // Bagi data menjadi dua kolom
//   const splitData = (data) => {
//     const middleIndex = Math.ceil(data.length / 2);
//     return [data.slice(0, middleIndex), data.slice(middleIndex)];
//   };

//   const renderColumn = (columnData) => (
//     <Grid item xs={12} sm={6}>
//       {columnData.map((field, index) => (
//         <Box
//           key={index}
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             marginBottom: 1,
//           }}
//         >
//           <Typography
//             variant={variant}
//             component="div"
//             sx={{
//               // fontWeight: 'bold',
//               width: col === 1 ? '40%' : '50%',
//               paddingRight: 1,
//               marginRight: col === 1 ? '10px' : 0,
//               display: 'flex',
//               alignItems: 'center',
//             }}
//           >
//             {field.label}
//           </Typography>
//           <span
//             style={{
//               marginLeft: 5,
//               marginRight: 10,
//               color: 'rgba(0,0,0,0.6)',
//             }}
//           >
//             :
//           </span>
//           <Typography
//             variant={variant}
//             component="div"
//             sx={{
//               width: '50%',
//             }}
//           >
//             {field.label === 'File Juknis' ? (
//               <Link
//                 href={field.value?.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {field.value}
//               </Link>
//             ) : (
//               field.value || '-'
//             )}
//           </Typography>
//         </Box>
//       ))}
//     </Grid>
//   );

//   const [leftColumn, rightColumn] = splitData(data);

//   return (
//     <Box sx={{ width: '100%', padding: 1 }}>
//       {title && (
//         <Typography
//           variant="h6"
//           gutterBottom
//           sx={{
//             marginBottom: 2,
//             fontWeight: 'bold',
//           }}
//         >
//           {title}
//         </Typography>
//       )}

//       <Grid
//         container
//         spacing={spacing}
//         sx={{
//           display: 'flex',
//         }}
//       >
//         {renderColumn(leftColumn)}
//         {renderColumn(rightColumn)}
//       </Grid>
//     </Box>
//   );
// };

// export default Section;
