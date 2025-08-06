const getReactSlcStyles = (minWidth) => ({
  control: (provided) => ({
    ...provided,
    boxShadow: "none",
    backgroundColor: "white",
    textAlign: "left",
    width: "100%",
    minWidth: minWidth,
    // zIndex: 10,
    // borderRadius: "32.5px", //mas Farhan, kalo mau di buat aja lagi Style baru untuk borderRadius, agar tidak berefek ke style di modul yang lain
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "none",
    border: "1px solid #E7E7E7",
    textAlign: "left",
    minWidth: "150px",
    zIndex: 1000,
    // zIndex: '',
  }),
  menuList: (provided) => ({
    ...provided,
    boxShadow: "none",
    // zIndex: 10,
  }),
});

// Gunakan seperti ini
const reactSlcStyles = getReactSlcStyles('200px');
const reactSlcStylesPagination = getReactSlcStyles('40px');


export { reactSlcStyles, reactSlcStylesPagination };
